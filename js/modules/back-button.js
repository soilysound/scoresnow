// BACK BUTTON

module.exports = function(){

  var backButtonHistory = 0;
  var history = 0;

  // get back button node
  var backButton = document.querySelector('.site-header__col1');

  // show hide back button
  function showBackButton(show){

    if(show){
      backButton.style.cssText = 'opacity:1';
    }

    else {
      backButton.style.cssText = 'pointer-events:none;opacity:0;';
    }

  }

  backButton.addEventListener('click', function(){

    if(SCORESNOW.historyBack){
      return;
    }

    // go back one in history
    window.history.go(-1);

    // set a brief variable saying this is going backwards
    SCORESNOW.historyBack = true;
    setTimeout(function(){
      SCORESNOW.historyBack = false;

    }, 500);

  }, false);


  // set backbutton state on page change
  document.addEventListener('pageChange', function(){


    // iterate internal history if going forward
    if(SCORESNOW.historyBack){
      backButtonHistory++;
    }
    else {
      history++;
    }

    // if history is more than 0, show back button
    showBackButton(history ? true : false);

    // if back button history is the same as history, then hide back button or...
    // ...if app has just started up, hide back button

    if(backButtonHistory === history || SCORESNOW.appStartUp){
      showBackButton(false);
      SCORESNOW.appStartUp = false;
      backButtonHistory = 0;
      history = 0;
    }

  });
};