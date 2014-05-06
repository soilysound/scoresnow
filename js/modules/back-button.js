// BACK BUTTON

module.exports = function(){

  var backButtonHistory = 0;
  var backButton = document.querySelector('.site-header__col1');

  function showBackButton(show){

    if(show){
      backButton.style.cssText = 'opacity:1';
    }

    else {
      backButton.style.cssText = 'pointer-events:none;opacity:0;';
    }

  }

  backButton.addEventListener('click', function(){

    if(backButton.getAttribute('disabled')){
      return;
    }

    SCORESNOW.historyBack = true;
    history.go(-1);
    backButtonHistory++;
    if(backButtonHistory === SCORESNOW.history){
      showBackButton(false);
      backButtonHistory = 0;
      SCORESNOW.history = 0;
    }

    backButton.setAttribute('disabled', true);
    
    setTimeout(function(){
      SCORESNOW.historyBack = false;
    }, 50);

  }, false);


  document.addEventListener('pageChange', function(){

    // iterate internal history if not back button
    if(!SCORESNOW.historyBack){
      SCORESNOW.history++;
    }
    
    if(SCORESNOW.history > 0){
      showBackButton(true);
    }

    setTimeout(function(){
      backButton.removeAttribute('disabled');
    }, 250);


  });
};