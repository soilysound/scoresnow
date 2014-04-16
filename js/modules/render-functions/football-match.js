// RENDER A FOOTBALL MATCH

module.exports = function(data){
  
  var updateText = require('../update-text.js');

  updateText(this.querySelector('.data-bar__cell-hometeam'), data.teams.home.name);
  updateText(this.querySelector('.data-bar__cell-awayteam'), data.teams.away.name);

  updateText(this.querySelector('.data-bar__cell-homescore'), data.score.home);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score.away);

  var status = SCORESNOW.statusLookup[data.generalInfo.matchStatus.toLowerCase()];
  this.querySelectorAll('.data-bar').forEach(function(item){
    item.setAttribute('data-status', status);
  });

  this.id = 'i' + data.matchId;




};