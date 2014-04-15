// SCORESNOW CONFIG

module.exports = function(){
  return {
    history: 0,
    currentPage: 0,
    previousPage: 0,
    direction: 'forward',
    pageTypeLookup: {
      1: 'fixtures',
      2: 'competition',
      3: 'match',

      // and the reverse
      'fixtures': 1,
      'competition': 2,
      'match': 3
    },
    sportLookup: {
      1: 'football',
      2: 'cricket',
      3: 'tennis',

      //and reverse
      'football': 1,
      'cricket': 2,
      'tennis': 3
    },

    statusLookup: {
      'played': 'FT',
      'fixture': 'KO'
    },

    competitionLookup: {
      'football': {
        2896: [8318, 'Premier League'],
        2897: [8428, 'Championship'],
        3268: [8325, 'League One'],
        3269: [8326, 'League Two'],
        2900: [8260, 'FA Cup'],
        // 233: [111, 'AFC Champions League'],
        76: [7707, 'Friendlies'],
        // 105: [999, 'Club Friendlies'],
        2932: [8391, 'Scottish Premiership'],
        438: [8217, 'Scottish Championship'],
        // 159: [444, 'Indonesian Superleague'],
        // 65: [555, 'Argentian Primera Division'],
        // 75: [666, 'Indian I-League'],
        140: [8218, 'Scottish League 1'],
        3277: [8491, 'La Liga'],
        3275: [8467, 'Bundesliga'],
        3276: [8398, 'Seria A'],
        2914: [8381, 'UEFA Champions League'],
        3274: [8463, 'Ligue 1'],
        82: [8472, 'DFB Pokal German Cup'],
        2915: [8295, 'UEFA Europa League']
      }
    },

    endpoints: {
      football: {
        fixtures: 'https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/football-fixtures-#{date}.js?',
        // fixtures: 'http://192.168.0.6/data/football/today.js?',
        competition: 'http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=#{id}&gsmLang=en',
        match: 'http://www.goal.com/feed/matches/scores?format=goal&matchId=1635404%2C1635405&edition=en-gb'
      }
    }
  };
};
  