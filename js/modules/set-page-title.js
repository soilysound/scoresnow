// SET PAGE TITLE

module.exports = function(text, defaultText){

  var updateText = require('../modules/update-text.js');

  var pageTitle = document.querySelector('.page-title');
  var newTitle = text ? text : defaultText;

  pageTitle.style.cssText = "opacity: 0; visibility: hidden";
  updateText(pageTitle, newTitle);
  setTimeout(function(){
    pageTitle.style.cssText = "opacity: 1; visibility: visible";
  }, SCORESNOW.disableTransitions ? 0 : 180);
  
};