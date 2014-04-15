// RENDER A FOOTBALL COMPETITION FIXTURE

module.exports = function(data){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');

  this.setAttribute('data-status', SCORESNOW.statusLookup[data.status.toLowerCase()]);

  updateText(this.querySelector('.data-bar__cell-hometeam'), data.teamHomeClubName);
  updateText(this.querySelector('.data-bar__cell-awayteam'), data.teamAwayClubName);

  updateText(this.querySelector('.data-bar__cell-homescore'), data.scoreHome);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.scoreAway);

  updateText(this.querySelector('.data-bar__cell-time'), offsetTime(data.kickoffDate, data.kickoffTime));
  updateText(this.querySelector('.data-bar__cell-status'), SCORESNOW.statusLookup[data.status.toLowerCase()]);

  this.href = "/#/football/match/" + data.matchId;

};