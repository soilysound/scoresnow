// RENDER A CRICKET COMPETITION LIST

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  if(firstRun){

    updateText(this, JSON.stringify(data));

  }

};