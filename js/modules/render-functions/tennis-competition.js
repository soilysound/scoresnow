// TENNIS COMPETITION

module.exports = function(data, firstRun){

  var updateText = require('../update-text.js');

  var players = data.players;
  var status = SCORESNOW.statusLookup[data.status.toLowerCase()];

  if(firstRun){
    updateText(this.querySelector('.data-bar__cell-tennis-side1-participant'), players[0].name);
    updateText(this.querySelector('.data-bar__cell-tennis-side2-participant'), players[1].name);
  }

  // get player row
  var playerRows = this.querySelectorAll('.data-bar__row');

  // get winner
  var winner = -1;
  if(players[0]['is_winner']){
    winner = 0;
  }

  if(players[1]['is_winner']){
    winner = 1;
  }

  // get server
  var server = -1;
  if(players[0]['is_serving']){
    server = 0;
  }

  if(players[1]['is_serving']){
    server = 1;
  }

  // set winner and server
  if(playerRows[winner]){
    playerRows[winner].setAttribute('data-is-winner', winner + 1);
  }

  if(playerRows[server]){
    playerRows.forEach(function(item){
      item.removeAttribute('data-is-server');
    });
    playerRows[server].setAttribute('data-is-server', server + 1);
  }


  // loop through each player row
  this.querySelectorAll('.data-bar__cell-tennis-set-group').forEach(function(item, index){

    var player = players[index];
    var setNodes = item.querySelectorAll('.data-bar__cell-tennis-set');

    item.setAttribute('data-sets', player.set_games.length);
    item.setAttribute('data-status', status);

    player.set_games.forEach(function(set, index){
      updateText(setNodes[index], set);
    });


  });

};