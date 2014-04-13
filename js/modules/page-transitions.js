// PAGE TRANSITIONS

module.exports = function(){

  var pages = document.querySelectorAll('.page-slot');

  function setPosition(domNode, position, animate){
    
    if(!domNode){
      return;
    }

    var styles = [];

    if(!animate){
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
      }, 400);

  }

  document.addEventListener('pageChange', function(){

    var pageToGoTo = SCORESNOW.currentPage;
    var previousPage = SCORESNOW.previousPage;
    var direction = SCORESNOW.direction;
    
    animateTo(pageToGoTo - 1, previousPage - 1 , direction);

  }, false);

};