// ROUTING

module.exports = function(){

  // create a custom event which we can fire when we've performed all actions in hashchange
  var hashEvent = document.createEvent('Event');
  hashEvent.initEvent('pageChange', true, true);

  function setPage(hash){
    page = hash.replace('#/','').split('/')[1];
    SCORESNOW.previousPage = SCORESNOW.currentPage;
    SCORESNOW.currentPage = SCORESNOW.pageTypeLookup[page];
  }

  function setSport(hash){
    var sport = hash.replace('#/','').split('/').shift();
    SCORESNOW.currentSport = sport;
  }

  function setContentId(hash){
    var id = hash.split('/').pop();
    SCORESNOW.contentId = id;
  }

  function setDirection(direction){
    SCORESNOW.direction = direction;
  }

  function setUpPages(){
    setPage(location.hash);
    setSport(location.hash);
    setContentId(location.hash);
    // @TODO - work out how to tell if the user is going back
    setDirection('forward');
    document.dispatchEvent(hashEvent);
  }

  window.addEventListener('hashchange', setUpPages, false);
  setUpPages();

};