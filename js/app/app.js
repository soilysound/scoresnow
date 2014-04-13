// APP.JS

// get dependencies
var siteConfig = require('../../js/modules/SCORESNOW-config.js');
var siteLayoutPrimary = require('../../js/modules/site-layout-primary.js');
var attachFastClick = require('../../js/vendor/fastclick.js');
var hashRouting = require('../../js/modules/hash-routing.js');
var pageTransitions = require('../../js/modules/page-transitions.js');

// create site config object
window.SCORESNOW = siteConfig();

// run modules
siteLayoutPrimary();
pageTransitions();
hashRouting();

// attach fastclick
attachFastClick(document.body);

