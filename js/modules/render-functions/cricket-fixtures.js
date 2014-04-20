// RENDER A CRICKET FIXTURES LIST

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  if(firstRun){

    var competitionURL = '/#/' + [
      'cricket',
      data.id,
    ].join('/');
   
    updateText(this.querySelector('.data-bar__cell-competition-name'), data.name);
    this.href = competitionURL;
  }

};