// RENDER A FOOTBALL MATCH

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');
  var offsetTime = require('../offset-time.js');

  var matchEvents = this.querySelector('.match-view__events');

  var row = [
    '<div class="match-view__events-row match-view__event-#{class} match-view__event-side-#{side}" id="#{id}">',
      '<div class="match-view__events-row__col match-view__events-row__col1">',
        '<div class="match-view__events-icon #{event}" data-event="#{event}"><img src="/images/events/#{event}.svg?v=4"></div>',
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

  // set status on match events to selectively hide some events at different points of the match
  matchEvents.setAttribute('data-status', data.status);

  // loop through events
  for(var i = -1; ++i < data.events.length;){

    var item = data.events[i];

    var itemRow = row;
    var id = item.type + parseInt(item.sortTime, 10) + item.side;
    id = id.replace(/ /g, '-');
    itemRow = itemRow.replace('#{id}', id);
    itemRow = itemRow.replace(/#{event}/g, item.type);
    itemRow = itemRow.replace('#{time}', item.time ? (item.time + '\'') : '');
    itemRow = itemRow.replace(/#{side}/g, item.side);

    // add descrption text
    var descriptiton = '';

    if(item.description){
      description = item.description;
    }

    itemRow = itemRow.replace('#{description}', description);


    // add an event class to each event row
    var eventClass = item.type;

    if(!item.time){
      eventClass += " match-view__events-row--no-time";
    }

    itemRow = itemRow.replace('#{class}', eventClass);
    
    // check if row is already in page
    var rowExists = matchEvents.querySelector('#' + id);
    // if so just update the description and time (eg, if the goal score comes in after the goal)
    if(rowExists){
      if(rowExists && item.replace === true){
        matchEvents.insertBefore(rowExists, matchEvents.firstChild);
      }

      rowExists.querySelector('.match-view__events-row__col3').textContent = description;
      rowExists.querySelector('.match-view__events-row__col2').textContent = item.time + '\'';
    }
    // add new row
    else {
      matchEvents.insertAdjacentHTML('afterbegin', itemRow);
    }
  }


};