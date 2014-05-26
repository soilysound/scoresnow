var request = require('request');
var cheerio = require('cheerio');
var SCORESNOW = require('../config/SCORESNOW-config.js')();
var fs = require('fs');
var schedule = require('node-schedule');
var date = require('../js/modules/offset-time.js');

var ghostPages = {
  football: {
    fixtures: 0
  },
  tennis: {
    fixtures: 0
  },
  darts: {
    fixtures: 0
  },
  cricket: {
    fixtures: 0
  }
};

function scrapeCricketFixtures(){

  request('http://www.espncricinfo.com/ci/engine/match/scores/liveframe.html', function(err, resp, body) {

    var json = [
    
    ];

    var $ = cheerio.load(body);
    var parent =  $("div").eq(0);
    var fixtures = parent.children('*');
    var row = false;

    fixtures.each(function(item, node){

      if($(node).attr('class').match('potMatchSeriesHeading')){

        if(row === false){

          row = {events: []};
          row.name = $(node).text();
          row.id = json.length;

        }

        else {
          json.push(row);
          ghostPages.cricket.fixtures ++;
          row = {events: []};
          row.name = $(node).text();
          row.id = json.length;
        }

      }

      else {

        var teams = $(node).find('a.potMatchLink').eq(0).text().split(' at')[0];
        teams = teams.split(' v ');
        row.events.push({teamone:teams[0], teamtwo: teams[1]});
      }

      if(item === fixtures.length - 1){

        json.push(row);
        ghostPages.cricket.fixtures ++;

      }


    });

   console.log(JSON.stringify(json));

    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/cricket-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(json) + ")");
    createGhostPages();

  });

}

function scrapeFootballFixtures(){

  request('http://www.goal.com/en-gb/live-scores?ICID=SP_TN_50', function(err, resp, body) {

    var $ = cheerio.load(body);

    var today = $('.matchday[data-today]');
    var competitions = today.find('.subheader');

    var json = [
    
    ];


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
          data.id = compid;
          data.name = comptitle;
          data.children = children;
          json.push(data);
          ghostPages.football.fixtures++;

        }
      }

    });

    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/football-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(json) + ")");
    createGhostPages();
  });

}

function scrapeTennisFixtures(){

  request('http://m.tennis.com/pulse/' + date.getDate() + '_livescores_new.json', function(err, resp, body) {

    var json = [];
    var data = JSON.parse(body);

    data.tournaments.forEach(function(item){
      ghostPages.tennis.fixtures ++;
      var row = {};
      row = item;
      row.children = row.events.length;
      json.push(row);
    });
    
    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/tennis-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(json) + ")");
    createGhostPages();
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
      data.children = rows.length - 1;

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

function createGhostPages(){
  fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/ghost-pages.js", 'ghostPageCallBack(' + JSON.stringify(ghostPages) + ');');
}

scrapeFootballFixtures();
scrapeTennisFixtures();
scrapeDartsFixtures();
scrapeCricketFixtures();

// var rule = new schedule.RecurrenceRule();
// rule.hour = 0;
// rule.minute = 10;
// schedule.scheduleJob(rule, function(){
//   scrapeFootballFixtures();
//   scrapeTennisFixtures();
//   scrapeDartsFixtures();
//   scrapeCricketFixtures();
// });
