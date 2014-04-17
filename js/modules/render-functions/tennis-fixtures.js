// TENNIS FIXTURES


module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var sanitizeName = require('../sanitize-name.js');

  if(firstRun){
    var tournamentName = data.name.trim();
    updateText(this.querySelector('.data-bar__cell-competition-name'), sanitizeName(tournamentName));
    this.href = "/#/tennis/competition/" + data.id;

  }


};