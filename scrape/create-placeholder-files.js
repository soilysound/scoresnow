var fs = require('fs');
var today = require('../js/modules/offset-time.js');

var blankFile = 'callback([])';
  
var date = new Date();
for(var i = -1;++i<360;){
  var nextDay = date.setHours(+24);
  var nextDayString = new Date(nextDay).toISOString().split('T').shift();

  fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/football-fixtures-" + nextDayString + ".js", blankFile);
  fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/tennis-fixtures-" + nextDayString + ".js", blankFile);
  fs.writeFile("../../../../Users/mark/Google Drive/scoresnow/darts-fixtures-" + nextDayString + ".js", blankFile);

  
}