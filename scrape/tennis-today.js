var request = require('request');
var cheerio = require('cheerio');
var SCORESNOW = require('../js/modules/SCORESNOW-config.js')();
var fs = require('fs');
var schedule = require('node-schedule');
var date = require('../js/modules/offset-time.js');


function scrapeTennisFixtures(){

  request('http://m.tennis.com/pulse/2014-04-17_livescores_new.json', function(err, resp, body) {

    var json = {};
    var data = JSON.parse(body);
    json = data.tournaments;

    console.log(json);
    
    fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/tennis-fixtures-" + date.getDate() + ".js", "callback(" + JSON.stringify(JSON.stringify(json)) + ")");

  });

}

// scrapeTennisFixtures();

var rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 1;
schedule.scheduleJob(rule, function(){
  scrapeTennisFixtures();
});