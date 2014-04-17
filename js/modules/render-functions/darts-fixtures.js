// DARTS FIXTURES

module.exports = function(data, firstRun){

  console.log(data);
  var updateText = require('../update-text.js');
  var sanitizeName = require('../sanitize-name.js');

  if(firstRun){
    var tournamentName = data.name.trim();
    updateText(this.querySelector('.data-bar__cell-competition-name'), sanitizeName(tournamentName));
    this.href = "/#/darts/competition/" + data.id;
    this.setAttribute('data-children', data.competitionChildren);

  }


};