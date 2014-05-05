// APP.JS

var offsetDate = require('../../js/modules/offset-time.js');

// get modules
var siteLayoutPrimary = require('../../js/modules/site-layout-primary.js');
var attachFastClick = require('../../js/vendor/fastclick.js');
var hashRouting = require('../../js/modules/hash-routing.js');
var pageTransitions = require('../../js/modules/page-transitions.js');
var scrollPanes = require('../../js/modules/scroll-panes.js');
var buildView = require('../../js/modules/build-view.js');
var backButton = require('../../js/modules/back-button.js');
var nav = require('../../js/modules/nav.js');
var getLastPage = require('../../js/modules/last-page.js');

// load taptouch globally to add inline events
window.tapTouch = require('../../js/modules/tap-touch.js');

// set render functions
window.SCORESNOW.renderFunctions = {
  "football-competition": require('../../js/modules/render-functions/football-competition.js'),
  "football-fixtures": require('../../js/modules/render-functions/football-fixtures.js'),
  "football-match": require('../../js/modules/render-functions/football-match.js')
};

// run modules
getLastPage();
siteLayoutPrimary.init();
pageTransitions();
nav();
buildView();
hashRouting();
backButton();
scrollPanes();

// attach fastclick
attachFastClick(document.body);