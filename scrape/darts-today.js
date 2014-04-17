var request = require('request');
var cheerio = require('cheerio');
var SCORESNOW = require('../js/modules/SCORESNOW-config.js')();
var fs = require('fs');
var schedule = require('node-schedule');
var date = require('../js/modules/offset-time.js');


function scrapeDartsFixtures(){

  request('http://live.dartsdata.com/MatchesList.aspx', function(err, resp, body) {

    var $ = cheerio.load(body);

    var competitions = $('div[style*="black 2px 2px 2px"]');

    var events = [];

    $(competitions).each(function(item, node){

      var data = {
        id: 1,
        events: [],
        name: "Premier League"
      };

      var rows = $(node).find('tr');
      data.competitionChildren = rows.length - 1;

      $(rows).each(function(item, node){
        var row = {
          status: 'KO'
        };
        if(item > 0){
          var tds = $(node).find('td');
          row.homepart = tds.eq(1).text().trim();
          row.homescore = tds.eq(2).text().trim();
          row.awaypart = tds.eq(5).text().trim();
          row.awayscore = tds.eq(4).text().trim();

          if(!isNaN(parseInt(row.homescore, 10))){
            row.status = 'FT';
          }

          row.id = (row.homepart + '-' + row.awaypart).replace(/ /g, '').toLowerCase();
          data.events.push(row);
        }
      });


      events.push(data);

    });


    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/darts-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(events) + ")");

  });

}

// scrapeDartsFixtures();

var rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 1;
rule.day = 5;
schedule.scheduleJob(rule, function(){
  scrapeDartsFixtures();
});
