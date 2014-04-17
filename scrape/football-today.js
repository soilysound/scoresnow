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

//scrapeFootballFixtures();

var rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 1;
schedule.scheduleJob(rule, function(){
  scrapeFootballFixtures();
});
