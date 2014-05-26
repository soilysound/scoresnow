// GET TEMPLATE

module.exports = function(id){

  var template = document.getElementById(id);
  var span = document.createElement('span');
  span.innerHTML = template.innerHTML;
  return span.firstChild;

};