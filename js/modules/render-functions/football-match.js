// RENDER A FOOTBALL MATCH

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');

  var matchEvents = this.querySelector('.match-view__events');

  var row = [
    '<div class="match-view__events-row #{class}" id="#{id}">',
      '<div class="match-view__events-row__col match-view__events-row__col1">',
        '<div class="match-view__events-icon #{event}" data-event="#{event}"></div>',
      '</div>',
      '<div class="match-view__events-row__col match-view__events-row__col2">#{time}</div>',
      '<div class="match-view__events-row__col match-view__events-row__col3">#{description}</div>',
      
    '</div>'
  ].join('');


  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-hometeam'), data.homepart);
    updateText(this.querySelector('.data-bar__cell-awayteam'), data.awaypart);
    this.id = 'i' + data.id;
  }

  function sanitizePlayerName(name){
    return name.split(' ').pop();
  }

  updateText(this.querySelector('.data-bar__cell-homescore'), data.score[0]);
  updateText(this.querySelector('.data-bar__cell-awayscore'), data.score[1]);

  //var status = SCORESNOW.statusLookup[data.status.toLowerCase()];
  this.querySelectorAll('.data-bar').forEach(function(item){
    item.setAttribute('data-status', data.status);
  });

  // loop through events
  for(var i = -1; ++i < data.events.length;){

    var item = data.events[i];

    var itemRow = row;
    var id = item.type + parseInt(item.time, 10);
    id = id.replace(/ /g, '-');
    itemRow = itemRow.replace('#{id}', id);

    itemRow = itemRow.replace(/#{event}/g, item.type);
    itemRow = itemRow.replace('#{time}', item.time ? (item.time + '\'') : '');
    
    // add descrption text
    var descriptiton = '';

    if(item.description){
      description = item.description;
    }

    if(!item.time){
      itemRow = itemRow.replace('#{class}', 'match-view__events-row--no-time');
    }

    itemRow = itemRow.replace('#{description}', description);
    
    // check if row is already in page
    var rowExists = matchEvents.querySelector('#' + id);
    // if so just update the description (eg, if the goal score comes in after the goal)
    if(rowExists){
      rowExists.querySelector('.match-view__events-row__col3').textContent = description;
    }
    // add new row
    else {
      matchEvents.insertAdjacentHTML('afterbegin', itemRow);
    }
  }


};