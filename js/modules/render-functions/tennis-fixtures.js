// TENNIS FIXTURES


module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  if(firstRun){
    var tournamentName = data.name.trim();
    // remove year
    tournamentName = tournamentName.replace(/20[0-9][0-9] /, '');
    // remove brackets
    tournamentName = tournamentName.replace(/ *\([^)]*\) */, '');

    updateText(this.querySelector('.data-bar__cell-competition-name'), tournamentName);

    this.href = "/#/tennis/competition/" + data.id;

  }


};