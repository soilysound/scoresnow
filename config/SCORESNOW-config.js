// SCORESNOW CONFIG

module.exports = function(){

  return {
    refreshInterval: 45000,
    history: 0,
    currentPage: 0,
    previousPage: 0,
    disableTransitions: true,
    endPoints: {
      football: '/data/football-fixtures-full.js',
      cricket: '',
      tennis: '/data/tennis-fixtures-full.js'
    },
    pageSlots: {
      home: 0,
      competition: 1,
      match: 2,
      football: 3,
      cricket: 4,
      tennis: 5
    },
    pageTypeLookup: {
      0: 'home',
      1: 'fixtures',
      2: 'competition',
      3: 'match'
    },
    ghostPages: {
      all: {
        home: 0
      },
      football: {
        fixtures: 0,
        competition: {

        },
        match: 1
      },
      cricket: {},
      tennis: {
        fixtures: 3,
        competition: {
          
        }
      }
    },

    statusLookup: {
      tennis: {
        'played': 'ft',
        'fixture': 'ko',
        'playing': 'ip',
        'finished': 'ft',
        'not started': 'ko',
        'in progress': 'ip'
      }
    },

    countrySortOrder: {
      'eng': 0,
      'sco': 1,
      'spa': 20,
      'ger': 21,
      'ita': 22,
      'fra': 23,
      'net': 24,
      'bra': 25,
      'arg': 26
    }

  };

};