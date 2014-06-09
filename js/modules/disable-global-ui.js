module.exports = function(){
  
  var disbableUiLayer = document.querySelector('.disable-global-ui');

  window.SCORESNOW.disableGlobalUI = function(state){
    if(state){
      disbableUiLayer.style.visibility = 'visible';
    }
  
    else {
      disbableUiLayer.style.visibility = 'hidden';
    }
  };

}