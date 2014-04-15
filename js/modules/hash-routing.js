// ROUTING

module.exports = function(){

  var addPageTitle = require('../modules/set-page-title.js');

  // create a custom event which we can fire when we've performed all actions in hashchange
  var hashEvent = document.createEvent('Event');
  hashEvent.initEvent('pageChange', true, true);

  function setPage(hash){
    SCORESNOW.page = hash.replace('#/','').split('/')[1];
    SCORESNOW.previousPage = SCORESNOW.currentPage;
    SCORESNOW.currentPage = SCORESNOW.pageTypeLookup[SCORESNOW.page];
  }

  function setSport(hash){
    var sport = hash.replace('#/','').split('/').shift();
    SCORESNOW.currentSport = sport;
  }

  function setContentId(hash){
    var id = hash.split('/').pop();
    SCORESNOW.contentId = id;
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

    if(SCORESNOW.page === 'match'){
      SCORESNOW.pageTitle = 'Match';
    }

    addPageTitle(SCORESNOW.pageTitle);

  }

  function setDirection(direction){
    SCORESNOW.direction = direction;
  }

  function setUpPages(e){

     // if no has return
    if(location.hash.length === 0){
      return;
    }

    setPage(location.hash);
    setSport(location.hash);
    setContentId(location.hash);
    setPageTitle(location.hash);
    // @TODO - work out how to tell if the user is going back
    setDirection('forward');

    document.dispatchEvent(hashEvent);
  }

  window.addEventListener('hashchange', setUpPages, false);
  setUpPages();

};