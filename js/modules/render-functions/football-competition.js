// RENDER A FOOTBALL COMPETITION FIXTURE

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');
  //var status = SCORESNOW.statusLookup[data.status.toLowerCase()];

  this.setAttribute('data-status', data.status);

  updateText(this.querySelector('.data-bar__cell-homescore'), data.score[0]);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score[1]);

  updateText(this.querySelector('.data-bar__cell-status'), data.status);

  // set time/ht status
  this.querySelector('.data-bar__cell-homescore').setAttribute('data-status', (isNaN(data.time) ? data.time : data.time + '\''));


  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-time'), data.time);
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.homepart);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.awaypart);

    this.href = "#/football/match/" + data.id;
    this.id = 'i' + data.id;
  }

};