// ROUTING

module.exports = function(){

  var addPageTitle = require('../modules/set-page-title.js');
  var offsetDate = require('../modules/offset-time.js');

  // create a custom event which we can fire when we've performed all actions in hashchange
  var hashEvent = document.createEvent('Event');
  hashEvent.initEvent('pageChange', true, true);

  function setPage(hash){

    var tiers = hash.toLowerCase().replace('#','').replace(/^\//, '').split('/');
    if(tiers.length === 1 && tiers[0].length === 0){
      tiers.pop();
    }

    SCORESNOW.page = SCORESNOW.pageType[tiers.length];
    SCORESNOW.currentSport = tiers[0] || 'all';
    SCORESNOW.contentId = tiers[tiers.length - 1];
    SCORESNOW.previousPage = SCORESNOW.currentPage;
    SCORESNOW.currentPage = SCORESNOW.pageSlot[tiers.length < 2 ? SCORESNOW.currentSport : SCORESNOW.page];

    var lastPage = {
      url: hash,
      date: offsetDate.getDate()
    };
    
    window.localStorage.setItem('last-page', JSON.stringify(lastPage));
  }

  function setPageTitle(hash){
    
    if(SCORESNOW.page === 'fixtures'){
      SCORESNOW.pageTitle = SCORESNOW.currentSport;
    }

    if(SCORESNOW.page === 'competition'){
      var lookup = SCORESNOW.competitionLookup[SCORESNOW.currentSport];
      Object.keys(lookup).forEach(function(key){
        if(lookup[key][0].toString() === SCORESNOW.contentId){
          SCORESNOW.pageTitle = lookup[key][1];
        }
      });
    }

    // if(SCORESNOW.page === 'match'){
    //   SCORESNOW.pageTitle = 'Match';
    // }

    if(SCORESNOW.page === 'home'){
      SCORESNOW.pageTitle = 'Home';
    }

    addPageTitle(SCORESNOW.pageTitle);

  }

  function setDirection(direction){
    SCORESNOW.direction = direction;
  }

  function setUpPages(e){

    // remove trailing slash
    if(location.hash.match(/\/$/)){
      location.hash = location.hash.replace(/\/$/, '');
      return;
    }

    var hash = location.hash;

    setPage(hash);
    setPageTitle();

    // @TODO - work out how to tell if the user is going back
    setDirection('forward');

    document.dispatchEvent(hashEvent);
  }

  window.addEventListener('hashchange', setUpPages, false);
  setUpPages();

};