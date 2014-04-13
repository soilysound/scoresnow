// SCORESNOW CONFIG

module.exports = function(){
  return {
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
    }
  };
};
  