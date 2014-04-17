// DARTS COMPETITION

module.exports = function(data, firstRun){
  
  var updateText = require('../update-text.js');

  this.setAttribute('data-status', data.status);

  updateText(this.querySelector('.data-bar__cell-homescore'), data.homescore);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.awayscore);

  updateText(this.querySelector('.data-bar__cell-status'), status);
  

  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-time'),  'vs');
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.homepart);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.awaypart);
    this.id = 'i' + data.id;
  }

};