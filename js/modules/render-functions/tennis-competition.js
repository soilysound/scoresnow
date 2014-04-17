// TENNIS COMPETITION


module.exports = function(data, firstRun){
  
  var updateText = require('../update-text.js');

  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-tennis-side1'), data.players[0].name);
    updateText(this.querySelector('.data-bar__cell-tennis-side2'), data.players[1].name);
  }

};