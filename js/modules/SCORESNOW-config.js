// SCORESNOW CONFIG

module.exports = function(){
  return {
    history: 0,
    currentPage: 0,
    previousPage: 0,
    direction: 'forward',
    disableTransitions: false,
    pageTypeLookup: {
      1: 'home',
      2: 'fixtures',
      3: 'competition',
      4: 'match',

      // and the reverse
      'home': 1,
      'fixtures': 2,
      'competition': 3,
      'match': 4
    },
    ghostPages: {
      'all': {
        'home': 1
      },
      'football': {
        'fixtures':1,
        'competition': {

        },
        'match': 1
      },
      'tennis': {
        'fixtures': 1,
        'competition': {

        },
        'match': 1
      },

      'darts': {
        'fixtures': 1,
        'competition': {

        },
        'match': 1
      }
    },
    sportLookup: {
      1: 'all',
      2: 'football',
      3: 'cricket',
      4: 'tennis',
      5: 'darts',

      //and reverse
      'all': 1,
      'football': 2,
      'cricket': 3,
      'tennis': 4,
      'darts': 5
    },

    statusLookup: {
      'played': 'FT',
      'fixture': 'KO',
      'playing': 'IP',
      'finished': 'FT',
      'not started': 'KO',
      'in progress': 'IP'
    },

    competitionLookup: {
      'football': {
        2896: [8318, 'Premier League'],
        2897: [8428, 'Championship'],
        3268: [8325, 'League One'],
        3269: [8326, 'League Two'],
        2900: [8260, 'FA Cup'],
        // 233: [111, 'AFC Champions League'],
        //76: [7707, 'Friendlies'],
        // 105: [999, 'Club Friendlies'],
        2932: [8391, 'Scottish Premiership'],
        438: [8217, 'Scottish Championship'],
        // 159: [444, 'Indonesian Superleague'],
        // 75: [666, 'Indian I-League'],
        46: [8218, 'Scottish League 1'],
        3277: [8491, 'La Liga'],
        3275: [8467, 'Bundesliga'],
        3276: [8398, 'Seria A'],
        2914: [8381, 'UEFA Champions League'],
        3274: [8463, 'Ligue 1'],
        82: [8472, 'DFB Pokal German Cup'],
        2915: [8295, 'UEFA Europa League'],
        53: [8342, 'Copa Del Ray'],
        65: [8658, 'Argentina Primera Division']
        //63: [7964, 'Major League Soccer']
      },
      'tennis': {
        
      },
      'darts': {

      }
    },

    endpoints: {
      all: {
        home: ''
      },

      football: {
        fixtures: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/football-fixtures-#{date}.js?',
        // fixtures: 'http://192.168.0.6/data/football/today.js?',
        competition: 'http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=#{id}&gsmLang=en',
        match: 'http://www.goal.com/en-gb/data/get-events-for-match?gsmMatchId=#{id}&gsmLang=en&callback=callback'
      },

      tennis: {
        fixtures: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/tennis-fixtures-#{date}.js?',
        competition: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/tennis-fixtures-#{date}.js?'
      },
      darts: {
        fixtures: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/darts-fixtures-#{date}.js?',
        competition: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/darts-fixtures-#{date}.js?'
      }
    }
  };
};