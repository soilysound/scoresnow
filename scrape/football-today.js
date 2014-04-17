var request = require('request');
var cheerio = require('cheerio');
var SCORESNOW = require('../js/modules/SCORESNOW-config.js')();
var fs = require('fs');
var schedule = require('node-schedule');
var date = require('../js/modules/offset-time.js');


function scrapeFootballFixtures(){

  request('http://www.goal.com/en-gb/live-scores?ICID=SP_TN_50', function(err, resp, body) {

    var $ = cheerio.load(body);

    var today = $('.matchday[data-today]');
    var competitions = today.find('.subheader');

    var json = {
      events:[]
    };

    $(competitions).each(function(item, node){

      var data = {};
      var complink = $(node).find('a').first();
      var comphref = $(complink).attr('href');

      if(comphref){

        var compid = comphref.split('/');
        compid.pop();
        compid = compid.pop();
        
        var comptitle = complink.find('.comp-title').text();
        var children = $(node).parents('table').find('.status').length;

        if(comptitle.length > 0 && SCORESNOW.competitionLookup['football'][compid]){
          data.competitionId = compid;
          data.competitionName = comptitle;
          data.competitionChildren = children;
          json.events.push(data);
        }

      }

    });

    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/football-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(json) + ")");

  });

}

function scrapeTennisFixtures(){

  request('http://m.tennis.com/pulse/2014-04-17_livescores_new.json', function(err, resp, body) {

    var json = {};
    var data = JSON.parse(body);
    json = data.tournaments;
    
    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/tennis-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(JSON.stringify(json)) + ")");

  });

}

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

scrapeFootballFixtures();
scrapeTennisFixtures();
scrapeDartsFixtures();

var rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 1;
schedule.scheduleJob(rule, function(){
  scrapeFootballFixtures();
  scrapeTennisFixtures();
});
