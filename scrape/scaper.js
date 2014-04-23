var request = require('request');
var cheerio = require('cheerio');
var date = require('../js/modules/offset-time.js');

var SCORESNOW = require('../config/SCORESNOW-config.js')();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('aws.json');

// set up empty ghost pages template
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

function scrapeFootballFixtures(){

  request('http://www.goal.com/en-gb/live-scores?ICID=SP_TN_50', function(err, resp, body) {

    var $ = cheerio.load(body);

    var today = $('.matchday[data-today]');
    var competitions = today.find('.subheader');

    var json = [];

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

    // write file to amazon s3
    var s3 = new AWS.S3();
    var params = {
      ACL: 'public-read',
      Bucket: 'scoresnow2/data', // required
      Key: 'football-fixtures.js', // required
      Body: 'callback(' + JSON.stringify(json) + ');',
      CacheControl: 'max-age=189341556',
      ContentType: 'application/javascript'

    };

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else  {
        console.log(data);
      }
    });

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

    // write file to amazon s3
    var s3 = new AWS.S3();
    var params = {
      ACL: 'public-read',
      Bucket: 'scoresnow2/data', // required
      Key: 'tennis-fixtures.js', // required
      Body: 'callback(' + JSON.stringify(json) + ');',
      CacheControl: 'max-age=189341556',
      ContentType: 'application/javascript'
    };

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else  {
        console.log(data);
      }
    });
    
   
  });

}

function scrapeCricketFixtures(){

  request('http://www.espncricinfo.com/ci/engine/match/scores/liveframe.html', function(err, resp, body) {

    var json = [];

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

    // write file to amazon s3
    var s3 = new AWS.S3();
    var params = {
      ACL: 'public-read',
      Bucket: 'scoresnow2/data', // required
      Key: 'cricket-fixtures.js', // required
      Body: 'callback(' + JSON.stringify(json) + ');',
      CacheControl: 'max-age=189341556',
      ContentType: 'application/javascript'
    };

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else  {
        console.log(data);
      }
    });

    // createGhostPages();

  });

}

// scrapeFootballFixtures();
scrapeCricketFixtures();
// scrapeTennisFixtures();
