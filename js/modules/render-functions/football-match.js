// RENDER A FOOTBALL MATCH

module.exports = function(data, firstRun){
  
  var updateText = require('../update-text.js');

  updateText(this.querySelector('.data-bar__cell-homescore'), data.score.home);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score.away);

  var status = SCORESNOW.statusLookup[data.generalInfo.matchStatus.toLowerCase()];
  this.querySelectorAll('.data-bar').forEach(function(item){
    item.setAttribute('data-status', status);
  });

  this.querySelector('.match-view__events').textContent = JSON.stringify(data);

  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.teams.home.name);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.teams.away.name);
    this.id = 'i' + data.matchId;
  }

};