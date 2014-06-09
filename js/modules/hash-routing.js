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

    SCORESNOW.pageType = SCORESNOW.pageTypeLookup[tiers.length];
    SCORESNOW.previousSport = SCORESNOW.currentSport;
    SCORESNOW.currentSport = tiers[0] || 'all';
    SCORESNOW.contentId = tiers[tiers.length - 1];

    // set previous page
    SCORESNOW.previousPage = SCORESNOW.currentPage;

    // set current page
    
    // this is the homepage
    if(tiers.length === 0){

      // set homepage title
      addPageTitle('Home');
      SCORESNOW.currentPage = 0;
    }

    // this is a sport page
    if(tiers.length === 1){
      SCORESNOW.currentPage = SCORESNOW.pageSlots[tiers[0]];
      addPageTitle(SCORESNOW.currentSport);
    }

    if(tiers.length > 1){
      SCORESNOW.currentPage = SCORESNOW.pageSlots[SCORESNOW.pageType];
    }

    // set a last page variable to re-open app at previous last page
    var lastPage = {
      url: hash,
      date: offsetDate.getDate()
    };
    
    window.localStorage.setItem('last-page', JSON.stringify(lastPage));
  }

  function setGhostPages(){
    var numberOfGhostItems = SCORESNOW.ghostPages[SCORESNOW.currentSport][SCORESNOW.pageType];
    if(SCORESNOW.pageType === 'competition'){
      numberOfGhostItems = numberOfGhostItems[SCORESNOW.contentId];
    }
    SCORESNOW.numberOfGhostItems = numberOfGhostItems;
  }

  function setUpPages(e){

    // remove trailing slash
    if(location.hash.match(/\/$/)){
      location.hash = location.hash.replace(/\/$/, '');
      return;
    }

    setPage(location.hash);
    setGhostPages();
    document.dispatchEvent(hashEvent);
  }

  window.addEventListener('hashchange', setUpPages, false);
  setUpPages();

};