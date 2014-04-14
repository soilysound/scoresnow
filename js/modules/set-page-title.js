// SET PAGE TITLE

module.exports = function(text, defaultText){

  var updateText = require('../modules/update-text.js');

  var pageTitle = document.querySelector('.page-title');
  var newTitle = text ? text : defaultText;

  updateText(pageTitle, newTitle);
  pageTitle.style.visibility = 'visible';
 

};