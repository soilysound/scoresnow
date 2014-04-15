// APP.JS

// get dependencies

// create site config object
window.SCORESNOW = require('../../js/modules/SCORESNOW-config.js')();

var siteLayoutPrimary = require('../../js/modules/site-layout-primary.js');
var attachFastClick = require('../../js/vendor/fastclick.js');
var hashRouting = require('../../js/modules/hash-routing.js');
var pageTransitions = require('../../js/modules/page-transitions.js');
var scrollPanes = require('../../js/modules/scroll-panes.js');
var buildView = require('../../js/modules/build-view.js');
var backButton = require('../../js/modules/back-button.js');
var nav = require('../../js/modules/nav.js');

// add taptpuch globally to add inline
window.tapTouch = require('../../js/modules/tap-touch.js');

window.SCORESNOW.renderFunctions = {
  "football-competition": require('../../js/modules/render-functions/football-competition.js'),
  "football-fixtures": require('../../js/modules/render-functions/football-fixtures.js')
};


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

