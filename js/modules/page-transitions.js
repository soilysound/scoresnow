// PAGE TRANSITIONS

module.exports = function(){

  var pages = document.querySelectorAll('.page-slot');
  SCORESNOW.pages = pages;

  // create a page transition event complete event
  var transitionEvent = document.createEvent('Event');
  transitionEvent.initEvent('pageTransitionComplete', true, true);

  function setPosition(domNode, position, animate){
    
    if(!domNode){
      return;
    }

    var styles = [];

    if(!animate || SCORESNOW.disableTransitions){
      styles.push("-webkit-transition-duration: 0");
      styles.push("transition-duration: 0");
    }

    styles.push("-webkit-transform: translateX("+ position +")");
    styles.push("transform: translateX("+ position +")");
    
    domNode.style.cssText = styles.join(';');
  }

  function animateTo(page, previousPage, direction){

      setPosition(pages[previousPage], 0, false);
      setPosition(pages[page], '100%', false);

      setPosition(pages[previousPage], '-100%', true);
      setPosition(pages[page], 0, true);

      setTimeout(function(){
        setPosition(pages[previousPage], '100%', false);
        document.dispatchEvent(transitionEvent);
      }, 400);

  }

  document.addEventListener('pageChange', function(){

    var pageToGoTo = SCORESNOW.currentPage;
    var previousPage = SCORESNOW.previousPage;
    var direction = SCORESNOW.direction;

    // make sure each page starts at scroll top 1;
    pages[pageToGoTo - 1].scrollTop = 1;

    if(pageToGoTo === previousPage){
      return;
    }
    
    animateTo(pageToGoTo - 1, previousPage - 1 , direction);

  }, false);

};