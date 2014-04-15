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
        8: [8318, 'Premier League'],
        7: [8491, 'La Liga'],
        10: [8381, 'Champions League'],
        13: [8398, 'Serie A'],
        16: [8463, 'Ligue 1'],
        93: [8260, 'FA Cup'],
        104: [8472, 'DFB Pokal Cup']

      }
    },

    endpoints: {
      football: {
        fixtures: 'http://www.goal.com/feed/matches/highlights?edition=en&format=lmc',
        competition: 'http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=#{id}&gsmLang=en',
        match: 'match/#{id}.json'
      }
    }
  };
};
  