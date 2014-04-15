var request = require('request');
var cheerio = require('cheerio');
var SCORESNOW = require('../js/modules/SCORESNOW-config.js')();
console.log(SCORESNOW);
var fs = require('fs');

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

  var fs = require("fs");
  fs.writeFile("../data/football/today.js", "callback(" + JSON.stringify(json) + ")");

  request.post({
    'url': 'https://www.googleapis.com/upload/drive/v2/files',
    'qs': {
      'uploadType': 'multipart'
    },
    'headers' : {
      'Authorization': 'Bearer ' + 'ya29.1.AADtN_WYgm8cqN_ca5npdAi0XyZmr61RHdJeM5vdVDT14QBYvSM6-NDtcIblKA'
    },
    'multipart':  [
      {
        'Content-Type': 'application/json; charset=UTF-8',
        'body': JSON.stringify({
           'title': 'football-fixtures-' + new Date().toISOString().split('T').shift() + '.js',
           'parents': [
             {
               'id': '0B5Em7PKD4NLoR2dYMktjTmxOckU'
             }
           ]
         })
      },
      {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'public, max-age=36000',
        'body': new Buffer("callback(" + JSON.stringify(json) + ")", "utf-8")
      }
    ]
  });

});