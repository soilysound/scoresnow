// RENDER A FOOTBALL FIXTURES LIST

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  if(firstRun){

    var competitionName = data.title;
    var competitionURL = '#/' + [
      'football',
      data.id
    ].join('/');
   
    updateText(this.querySelector('.data-bar__cell-competition-name'), competitionName);
    this.href = competitionURL;
  }

  // add live games indicator
  if(data.liveGames){
    this.querySelector('.data-bar__cell-competition-name').setAttribute('data-live-games', data.liveGames);
  }


};