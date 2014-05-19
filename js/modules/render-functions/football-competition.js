// RENDER A FOOTBALL COMPETITION FIXTURE

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');

  // add data that doesnt change just on first run
  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-time'), data.time);
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.homepart);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.awaypart);

    this.href = "#/football/match/" + data.id;
    this.id = 'i' + data.id;
  }

  // add status
  this.setAttribute('data-status', data.status);

  // if its postponed or abandonded
  if(data.status.match(/can|ar/i)){
    this.style.pointerEvents = "none";
  }

  // update score
  updateText(this.querySelector('.data-bar__cell-homescore'), data.score[0]);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score[1]);

  // update status
  updateText(this.querySelector('.data-bar__cell-status'), data.status);

  // set time/ht indicator
  this.querySelector('.data-bar__cell-homescore').setAttribute('data-status', (isNaN(data.time) ? data.status : data.time + '\''));

};