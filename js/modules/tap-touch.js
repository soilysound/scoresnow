// TAP TOUCH

module.exports = function(el){

  var notMoved = true;

  setTimeout(function(){
    if(notMoved){
        el.classList.add('tap-touch');
    }
  }, 50);
    
  el.ontouchmove = function(){
    el.classList.remove('tap-touch');
    el.ontouchmove = null;
    notMoved = false;
  };

  el.ontouchend = function(){
    setTimeout(function(){
      el.classList.remove('tap-touch');
      el.ontouchend = null;
    }, 150);
    
  };

};