// SET PAGE TITLE

module.exports = function(text, defaultText){

  // capitlize text
  function capitalize(text) {
    return text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }

  var updateText = require('../modules/update-text.js');

  var pageTitle = document.querySelector('.page-title');
  var newTitle = text ? text : defaultText;

  // update page title
  updateText(pageTitle, newTitle);

  // update document title
  if(newTitle){
    document.title = capitalize(newTitle);
  }
};