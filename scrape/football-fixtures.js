module.exports = function(createGhostPages){

  function getCompName(array){

    if(array.length === 1){
      return array[0];
    }

    else {
      return countryNames[array[0].trim()] + ' ' + array[1].trim();
    }
  }

  function getStatus(text){

    if(text.match(/:|br/i)){
      return 'ko';
    }

    if(text.match(/ot|aw|fap/i)){
      return "ft";
    }

    if(isNaN(parseInt(text, 10))){
      return text.toLowerCase();
    }
  
    return 'ip';
  
  }

  function getScore(text){

    var score = text.replace(/ /g,'').split('-');
    if(score[0].length){
      return score;
    }

    else {
      return [];
    }
  }

  function getEvents(text, status, time){

    var events = [];

    if(text){
      text = text.split("popup('")[1];
      text = text.split("','')")[0];

      var $ = cheerio.load(text);

      $('tr').each(function(i, node){

        if(i > 0){

          var event = {};
          var tds = $(node).find('td');

          var side;
          if(tds.eq(0).text().length){
            event.side = 'home';
            side = 0;
          }
          else {
            side = 2;
            event.side = 'away';
          }

          var textString = tds.eq(side).text();
          event.time = /\d+/.exec(textString)[0];
          event.sortTime = event.time;
          var desc = textString.replace(event.time, '').trim();
          event.description = desc ?  desc : "  ";
          event.type = tds.eq(1).find('img').eq(0).attr('src').match(/\/(.*)\./)[1];
          
          events.push(event);
        }

      });

    }

    if(typeof time === "string" && time.match(':')){
      // if its a time, add an informatione vent showing when the kick off is
      events.push({
        time: 0,
        sortTime: -1,
        description: 'Match Kicks off at ' + time,
        type: 'info'
      });
    }
    else{

      if(typeof time === 'number'){
        // add current match time
        events.push({
          time: time,
          sortTime: 9999,
          description: ' ',
          type: 'current-time',
          replace: true
        });
      }
      // if not, add kick off event
      events.push({
        time: 1,
        sortTime: 0,
        description: 'Match Kicks Off',
        type: 'ko'
      });
    }

    //if half time or full time or in the second half, add half time event
    if(status === 'ht' || status === 'ft' || time > 45){
      events.push({
        time: '45+',
        sortTime: 45.9,
        description: 'Half Time',
        type: 'ht'
      });

      // add current match time
      events.push({
        time: time,
        sortTime: 9999,
        description: ' ',
        type: 'current-time',
        replace: true,
        visibility: 'hidden'
      });
    }

    // add 2nd half kicks off event
    if(status === 'ft' || time > 45){
      events.push({
        time: 46,
        sortTime: 45.99,
        description: '2nd Half Kicks Off',
        type: 'second-half'
      });
    }

    // add full time event
    if(status === 'ft'){
      events.push({
        time: '90+',
        sortTime: 999,
        description: 'Full Time',
        type: 'ft'
      });
    }
  

    // sort events by actual time
    events.sort(function(a, b){
      return a.sortTime - b.sortTime;
    });

    return events;

  }

  request("http://football-data.enetpulse.com/getContent.php?d=0&showLeagues=all", function(err, resp, body){

    var $ = cheerio.load(body);
    var rows = $('tr');

    var json = {
      title: 'Football',
      children: []
    };

    var row = {
      children: []
    };

    var nullComp;

    rows.each(function(i, node){
     
      // get tds 
      var tds = $(node).find('td');

      // is this a league heading or a match row?
      var isHeader = true;

      if(tds.length > 3){
        isHeader = false;
      }

      // if its  league header, start a new league object
      if(isHeader){

        if(i && !nullComp){
          json.children.push(row);
        }

        row = {};
        
        var id = tds.eq(0).find('a');

        if(!id){
          id = i * 9999;
        }

        else {
          id = id.attr('href').match(/ttfk=([0-9]+)/i)[1];
        }

        var title = compNames[id];

        if(title){
          row.id = id;
          row.title = title.split("|")[1] + ' - ' + title.split("|")[0];
          nullComp = false;
          row.children = [];
        }
        else {
          nullComp = true;
        }
        
      }

      else{

        if(!nullComp){

          var match = {
            time: date.convertCestTime(tds.eq(0).text()),
            homepart: tds.eq(1).text(),
            awaypart: tds.eq(3).text(),
            status: getStatus(tds.eq(0).text()),
            score: getScore(tds.eq(2).text())
          };

          match.events = getEvents(tds.eq(2).find('a').eq(0).attr('onmouseover'), match.status, match.time);
          match.id = hashCode(match.homepart + match.awaypart);
          
          row.children.push(match);

        }
      }


    });
    
    // merge duplicate leagues
    function removeDupes(){
      for(i = 0, len = json.children.length; i < len; i++){
        if(json.children[i-1] && json.children[i] && json.children[i-1] && json.children[i-1].id == json.children[i].id){
          json.children[i].children = json.children[i].children.concat(json.children[i-1].children);
          json.children.splice(i-1, 1);
          removeDupes();
          break;
        }
      }
    }

    function getGhostPages(){
      // set competitons
      json.children.forEach(function(item){
        SCORESNOW.ghostPages.football.competition[item.id] = item.children.length;
      });
      // set fixtures 
      SCORESNOW.ghostPages.football.fixtures  = json.children.length;

      var currentGhost = JSON.stringify(SCORESNOW.ghostPages.football);
      
      // work out if this is a new day by comparing the current ghostpages with the previous ones
      if(previousGhost == currentGhost){
        newDay = false;
      }

      else {
        newDay = true;
      }

      previousGhost = currentGhost;

    }

    removeDupes();
    getGhostPages();


    var file = "callback(" + JSON.stringify(json) + ")";

    // create a new gzip object
    var gzip = zlib.createGzip({
      level: 9 // maximum compression
    });

    var buffers=[];
    var nread=0;

    // attach event handlers...
    gzip.on('error', function(err) {
        gzip.removeAllListeners();
        gzip=null;
    });

    gzip.on('data', function(chunk) {
        buffers.push(chunk);
        nread += chunk.length;
    });

    // gzip the buffer
    gzip.on('end', function() {
      var buffer;
      switch (buffers.length) {
        case 0: // no data.  return empty buffer
        buffer = new Buffer(0);
        break;
        case 1: // only one chunk of data.  return it.
        buffer = buffers[0];
        break;
        default: // concatenate the chunks of data into a single buffer.
        buffer = new Buffer(nread);
        var n = 0;

        buffers.forEach(function(b) {
          var l = b.length;
          b.copy(buffer, n, 0, l);
          n += l;
        });

        break;
      }

      gzip.removeAllListeners();
      gzip=null;

      //write file to amazon s3
      var s3 = new AWS.S3();
      var params = {
        ACL: 'public-read',
        Bucket: 'www.scores-now.com/data', // required
        Key: 'football-fixtures-full.js', // required
        Body: buffer,
        CacheControl: 'max-age=30',
        ContentType: 'application/javascript',
        ContentEncoding: 'gzip',
        StorageClass: 'REDUCED_REDUNDANCY'
      };

      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(data);
        }
      });

      // write file locally for testing
      fs.writeFile('../data/football-fixtures-full.js', file);
      
      console.log(newDay);

      if(createGhostPages || newDay){

        var paramsGhostPages = {
          ACL: 'public-read',
          Bucket: 'www.scores-now.com/config', // required
          Key: 'SCORESNOW-config.deploy.js', // required
          Body: "window.SCORESNOW = " + JSON.stringify(SCORESNOW),
          CacheControl: 'no-store, no-cache, must-revalidate, max-age=0, private',
          ContentType: 'application/javascript',
          StorageClass: 'REDUCED_REDUNDANCY'
        };

        s3.putObject(paramsGhostPages, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          }
          else {
            console.log(data);
          }
        });

        // write file locally for testing
        fs.writeFile('../config/SCORESNOW-config.deploy.js', "window.SCORESNOW = " + JSON.stringify(SCORESNOW));


      }

    });

    // and finally, give it data to compress
    gzip.write(file);
    gzip.end();
    

  });
};