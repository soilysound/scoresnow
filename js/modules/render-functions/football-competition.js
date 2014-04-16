// RENDER A FOOTBALL COMPETITION FIXTURE

module.exports = function(data, firstRun){
  console.log(data);

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');
  var status = SCORESNOW.statusLookup[data.status.toLowerCase()];

  this.setAttribute('data-status', status);

  updateText(this.querySelector('.data-bar__cell-homescore'), data.scoreHome);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.scoreAway);

  updateText(this.querySelector('.data-bar__cell-status'), status);


  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-time'), offsetTime.getTime(data.kickoffDate, data.kickoffTime));
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.teamHomeClubName);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.teamAwayClubName);

    this.href = "/#/football/match/" + data.matchId;
    this.id = 'i' + data.matchId;
  }

};