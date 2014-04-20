// RENDER A FOOTBALL MATCH

module.exports = function(data, firstRun){
  
  var updateText = require('../update-text.js');
  var matchEvents = this.querySelector('.match-view__events');
  var row = '<div class="match-view__events-row #{class}" id="#{id}"><div class="match-view__events-row__col match-view__events-row__col1">#{home}</div><div class="match-view__events-row__col match-view__events-row__col2">#{event}</div> <div class="match-view__events-row__col match-view__events-row__col3">#{away}</div></div>';

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

  for(var i = -1; ++i < data.events.length;){

    var item = data.events[i];
    var itemRow = row;
    var id = item.eventType + parseInt(item.time, 10);
    id = id.replace(/ /g, '-');
    itemRow = itemRow.replace('#{id}', id);
    if(matchEvents.querySelector('#' + id)){
      continue;
    }

    if(item.isHomeEvent === 1){
      itemRow = itemRow.replace('#{home}', sanitizePlayerName(item.player[0]) + '<em class="match-view__events-time-home">' + item.time + '\'</em>');
      itemRow = itemRow.replace('#{away}', '');
    }

    if(item.isHomeEvent === 0){
      itemRow = itemRow.replace('#{away}', '<em class="match-view__events-time-away">' + item.time + '\'</em>' + sanitizePlayerName(item.player[0]));
      itemRow = itemRow.replace('#{home}', '');
    }

    if(item.matchEvent){
      itemRow = itemRow.replace('#{event}', item.eventType);
      itemRow = itemRow.replace('#{home}', '');
      itemRow = itemRow.replace('#{away}', '');
    }

    if(item.eventType.match(/goal/i)){
      itemRow = itemRow.replace('#{class}', 'match-view__events-row--heightlighted');
    }

    itemRow = itemRow.replace('#{event}', item.eventType.substring(0, 1));

    matchEvents.insertAdjacentHTML('afterbegin', itemRow);
  }

};