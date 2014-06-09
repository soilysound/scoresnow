// TAP TOUCH

module.exports = function(el){

  var eventType = window.device.hasTouch ? 'ontouchmove' : 'onmousemove';
  var notMoved = true;

  setTimeout(function(){
    if(notMoved){
        el.classList.add('tap-touch');
    }
  }, 50);
    
  el[eventType] = function(){
    el.classList.remove('tap-touch');
    el[eventType] = null;
    notMoved = false;
  };

};