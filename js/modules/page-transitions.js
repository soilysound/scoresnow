// PAGE TRANSITIONS

module.exports = function(){

  var pages = SCORESNOW.pages = document.querySelectorAll('.page-slot');
  var reset;

  // create a page transition event complete event
  var transitionEvent = document.createEvent('Event');
  transitionEvent.initEvent('pageTransitionComplete', true, true);

  function setPosition(domNode, position, animate){
    
    if(!domNode){
      return;
    }

    var styles = [];

    if(!animate || SCORESNOW.disableTransitions){
      styles.push("-webkit-transition-duration: 0.001s");
      styles.push("transition-duration: 0.001s!important");
    }

    styles.push("-webkit-transform: translateX("+ position +")");
    styles.push("transform: translateX("+ position +")");
    
    domNode.style.cssText = styles.join(';');
  }

  function resetPage(){
    setPosition(this, '100%', false);
    this.removeEventListener('transitionend', reset);
    document.dispatchEvent(transitionEvent);
  }

  function animateTo(nextPage, previousPage, direction){

    reset = resetPage.bind(pages[previousPage]);
    pages[previousPage].addEventListener('transitionend', reset);

    setPosition(pages[previousPage], 0, false);
    setPosition(pages[nextPage], '100%', false);

    setPosition(pages[previousPage], '-100%', true);
    setPosition(pages[nextPage], 0, true);

    // reenable transitions after first load
    SCORESNOW.disableTransitions = false;
  }

  document.addEventListener('pageChange', function(){

    var pageToGoTo = SCORESNOW.currentPage;
    var previousPage = SCORESNOW.previousPage;
    var direction = SCORESNOW.direction;

    // make sure each page starts at scroll top 1 if going forward;
    if(!SCORESNOW.historyBack){
      pages[pageToGoTo].scrollTop = 1;
    }
    
    if(pageToGoTo === previousPage){
      setPosition(pages[pageToGoTo], 0, false);
      // reenable transitions after first load
      SCORESNOW.disableTransitions = false;
      return;
    }
    
    animateTo(pageToGoTo, previousPage , direction);

  }, false);

};

