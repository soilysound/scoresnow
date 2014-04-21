// RENDER A FOOTBALL MATCH

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');

  var matchEvents = this.querySelector('.match-view__events');

  var row = [
    '<div class="match-view__events-row #{class}" id="#{id}">',
      '<div class="match-view__events-row__col match-view__events-row__col1">',
        '<div class="match-view__events-icon #{event}"></div>',
      '</div>',
      '<div class="match-view__events-row__col match-view__events-row__col2">#{time}</div>',
      '<div class="match-view__events-row__col match-view__events-row__col3">#{description}</div>',
      
    '</div>'
  ].join('');

  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.teams.home.short_name);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.teams.away.short_name);
    this.id = 'i' + data.matchId;
  }

  function sanitizePlayerName(name){
    return name.split(' ').pop();
  }

  updateText(this.querySelector('.data-bar__cell-homescore'), data.score.home);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score.away);

  var status = SCORESNOW.statusLookup[data.generalInfo.matchStatus.toLowerCase()];
  this.querySelectorAll('.data-bar').forEach(function(item){
    item.setAttribute('data-status', status);
  });

  // loop through events
  for(var i = -1; ++i < data.events.length;){

    var item = data.events[i];
    var itemRow = row;
    var id = item.eventType + parseInt(item.time, 10);
    id = id.replace(/ /g, '-');
    itemRow = itemRow.replace('#{id}', id);
    if(matchEvents.querySelector('#' + id)){
      continue;
    }

    itemRow = itemRow.replace('#{event}', '[ ]');
    itemRow = itemRow.replace('#{time}', item.time ? (item.time + '\'') : '');
    
    // add descrption text
    var descriptiton = '';

    if(item.description){
      description = item.description;
    }

    if(item.player){
      description = item.player[0];
    }
    
    if(item.eventType.match(/info/i)){
      description = offsetTime.getTime(data.generalInfo.kickoffDate, data.generalInfo.kickoffTime) + ' &nbsp;' + data.generalInfo.venue;
    }

    if(!item.time){
      itemRow = itemRow.replace('#{class}', 'match-view__events-row--no-time');
    }

    itemRow = itemRow.replace('#{description}', description);
  
    matchEvents.insertAdjacentHTML('afterbegin', itemRow);
  }

};