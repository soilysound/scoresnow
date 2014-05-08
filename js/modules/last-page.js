// if homepage app, retrieve last page from localstorage
module.exports = function(){

  var offsetDate = require('../modules/offset-time.js');
  var lastPage = window.localStorage.getItem('last-page');

  if(window.navigator.standalone && lastPage){

    lastPage = JSON.parse(lastPage);
    var date = offsetDate.getDate();

    if(date !== lastPage.date){
      window.localStorage.removeItem('last-page');
    }
    else {
      location.hash = lastPage.url;
      SCORESNOW.history = 0;
      SCORESNOW.appStartUp = true;
    }
  }

};