// RENDER A FOOTBALL FIXTURES LIST

module.exports = function(data){
  
  var updateText = require('../update-text.js');
console.log(data);
  var competitionName = SCORESNOW.competitionLookup[SCORESNOW.currentSport][data.competitionId][1];
  var competitionURL = '/#/' + [
    'football',
    'competition',
    SCORESNOW.competitionLookup[SCORESNOW.currentSport][data.competitionId][0]
  ].join('/');
 
  updateText(this.querySelector('.data-bar__cell-competition-name'), competitionName);
  this.href = competitionURL;
  this.setAttribute('data-title', competitionName);


};