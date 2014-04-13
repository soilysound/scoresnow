// PREVENT OVERSCROLL

module.exports = function(){

  if(!device.hasTouch){
    return;
  }

  function disableOverScroll(){

    if((this.offsetHeight + this.scrollTop) >= this.scrollHeight){
      this.scrollTop = this.scrollTop - 1;

    }
    // make sure this scroll pane never gets to 0, so it always has momentum scrollin in ios.
    if (this.scrollTop <= 0) {
      this.scrollTop = 1;
    }
  
  }

  var scrollPanes = document.querySelectorAll('.scroll-pane');

  scrollPanes.forEach(function(element){

    element.addEventListener('touchstart', disableOverScroll, false);

  });
};

