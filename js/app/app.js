// APP.JS

// create site config object
window.SCORESNOW = require('../../config/SCORESNOW-config.js')();

// asyncronously update config object with ghost pages
window.ghostPageCallBack = function(object){
  for(var key in object){
    SCORESNOW.ghostPages[key].fixtures = object[key].fixtures;
  }
};

(function(){
  var script = document.createElement('script');
  script.src = "https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/ghost-pages.js";
  document.head.appendChild(script);
})();


// get modules
var siteLayoutPrimary = require('../../js/modules/site-layout-primary.js');
var attachFastClick = require('../../js/vendor/fastclick.js');
var hashRouting = require('../../js/modules/hash-routing.js');
var pageTransitions = require('../../js/modules/page-transitions.js');
var scrollPanes = require('../../js/modules/scroll-panes.js');
var buildView = require('../../js/modules/build-view.js');
var backButton = require('../../js/modules/back-button.js');
var nav = require('../../js/modules/nav.js');
var offsetDate = require('../../js/modules/offset-time.js');

// add taptpuch globally to add inline
window.tapTouch = require('../../js/modules/tap-touch.js');

window.SCORESNOW.renderFunctions = {
  "football-competition": require('../../js/modules/render-functions/football-competition.js'),
  "football-fixtures": require('../../js/modules/render-functions/football-fixtures.js'),
  "football-match": require('../../js/modules/render-functions/football-match.js'),
  'tennis-fixtures': require('../../js/modules/render-functions/tennis-fixtures.js'),
  'tennis-competition': require('../../js/modules/render-functions/tennis-competition.js'),
  'darts-fixtures': require('../../js/modules/render-functions/darts-fixtures.js'),
  'darts-competition': require('../../js/modules/render-functions/darts-competition.js'),
  'cricket-fixtures': require('../../js/modules/render-functions/cricket-fixtures.js'),
  'cricket-competition': require('../../js/modules/render-functions/cricket-competition.js')

};

// if homepage app, retrieve last page from localstorage
(function(){

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
    }
  }

})();

// run modules
siteLayoutPrimary.init();
pageTransitions();
nav();
buildView();
hashRouting();
backButton();
scrollPanes();

// attach fastclick
attachFastClick(document.body);