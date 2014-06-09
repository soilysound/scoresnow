module.exports = function(createGhostPages){

  request('http://m.tennis.com/pulse/' + global.currentDate + '_livescores_new.json', function(err, resp, body) {

    if(err){
      return;
    }

    var json = {
      "title": "Tennis",
      "children": []
    };

    var data = JSON.parse(body);
    SCORESNOW.ghostPages.tennis.fixtures = data.tournaments.length;

    data.tournaments.forEach(function(item){
      var row = {};
      row = item;
      row.children = row.events;

      var name = global.sanitizeName(row.name);

      // default sets played to 3
      var setsPlayed  = 3;
      if(compNamesTennis[row.id]){
        var name = compNamesTennis[row.id].split('|')[0];
        // if comp is in our lookup, check setsplayer from there
        setsPlayed = compNamesTennis[row.id].split('|')[1];
      }

      row.title = name;

      json.children.push(row);
       // loop from children and set gender and live status
      row.children.forEach(function(match){
        match.setsPlayed = setsPlayed;
      });

      SCORESNOW.ghostPages.tennis.competition[row.id] = row.children.length;
    });


    // write file
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
        Key: 'tennis-fixtures-full.js', // required
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
          console.log(data, 'tennis');
        }
      });


    fs.writeFile("../data/tennis-fixtures-full.js", "callback(" + JSON.stringify(json) + ")");

    
    if(createGhostPages || global.date.getDate() !== global.currentDate){

      global.currentDate =  global.date.getDate();

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

  gzip.write(file);
  gzip.end();

});


}