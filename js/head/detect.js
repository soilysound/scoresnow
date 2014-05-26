// DETECT

(function(){

  var device = {
    classList: ''
  };

  function parseFeature(feature, isPresent){
    device.classList += isPresent ? ' ' + feature : ' no-' + feature;
    return isPresent;
  }

  // feature tests
  
  // create a shim element and add some styles representing the features we're testing for
  var shim = document.createElement('div');
  shim.style.cssText = "-webkit-animation-name:shim;animation-name:shim;-moz-animation-name:shim;width:10vw";

  // touch
  device.hasTouch = parseFeature('touch', ('ontouchstart' in window) || ('DocumentTouch' in window) && document instanceof window.DocumentTouch);

  // css animations
  device.hasCssAnimations = parseFeature('cssanimations', !!(shim.style.animationName || shim.style.webkitAnimationName || shim.style.mozAnimationName));

  // animation start name
  var animationCandidates = {
    'webkitAnimation':'webkitAnimationStart',
    'mozAnimation':'mozAnimationStart',
    'animation':'animationstart',
    'msAnimation':'MSAnimationStart'
  };

  // test animation name candidates in shim element and set transitionPrefix to the match
  for(var property in animationCandidates) {
    if(property in shim.style){
      device.animationEventName = animationCandidates[property];
    }
  }

  document.documentElement.className = "js" + device.classList;

  window.device = device;

})();

