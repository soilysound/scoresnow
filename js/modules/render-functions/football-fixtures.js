// RENDER A FOOTBALL FIXTURES LIST

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  if(firstRun){
    var isDefinedLeague = SCORESNOW.competitionLookup[SCORESNOW.currentSport][data.competitionId];

    if(!isDefinedLeague){
      return;
    }

    var competitionName = isDefinedLeague[1];
    var competitionURL = '/#/' + [
      'football',
      'competition',
      isDefinedLeague[0]
    ].join('/');
   
    updateText(this.querySelector('.data-bar__cell-competition-name'), competitionName);
    this.href = competitionURL;
    this.setAttribute('data-title', competitionName);
    this.setAttribute('data-children', data.competitionChildren);
    this.id = 'i' + data.competitionId;
  }


};