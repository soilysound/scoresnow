global.request = require('request');
global.cheerio = require('cheerio');
global.date = require('../js/modules/offset-time.js');
global.schedule = require('node-schedule');
global.fs = require('fs');
global.zlib = require('zlib');
global.SCORESNOW = require('../config/SCORESNOW-config.js')();
global.hashCode = require('../scrape/hash-code.js');
global.AWS = require('aws-sdk');
AWS.config.loadFromPath('aws.json');
global.countryNames = require('../scrape/country-names.js');
global.compNamesFootball = require('../scrape/competition-names-football.js');
global.compNamesTennis = require('../scrape/competition-names-tennis.js');
global.sanitizeName = require('../js/modules/sanitize-name.js');

// get scrapers
global.footballFixtures = require('../scrape/football-fixtures.js');
global.tennisFixtures = require('../scrape/tennis-fixtures.js');

// work out if this is a new day by comparing the size of each league
global.newDay = false;
global.previousGhost = false;
global.currentDate = global.date.getDate();

footballFixtures(true);
tennisFixtures(true);

// run every 2 minutes
var rulemin = new schedule.RecurrenceRule();
rulemin.minute = new schedule.Range(0, 59, 5);
schedule.scheduleJob(rulemin, function(){
  footballFixtures();
  tennisFixtures();
});
