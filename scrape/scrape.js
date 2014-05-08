global.request = require('request');
global.cheerio = require('cheerio');
global.date = require('../js/modules/offset-time.js');
global.schedule = require('node-schedule');
global.fs = require('fs');
global.zlib = require('zlib');
global.SCORESNOW = require('../config/SCORESNOW-config.js')();
global.footballFixtures = require('../scrape/football-fixtures.js');
global.hashCode = require('../scrape/hash-code.js');
global.AWS = require('aws-sdk');
AWS.config.loadFromPath('aws.json');
global.countryNames = require('../scrape/country-names.js');
global.compNames = require('../scrape/competition-names.js');

global.newDay = false;
global.uniquePage = true;

// footballFixtures(true);

// run every 5 minutes
var rulemin = new schedule.RecurrenceRule();
rulemin.minute = new schedule.Range(0, 59, 5);
schedule.scheduleJob(rulemin, function(){
  footballFixtures();
});