// GHOST PAGE

module.exports = function(container, contentType, numberOfItems){

  var ghosts = [];

  var template = document.getElementById(contentType);
 
  var shim = document.createElement('div');
  shim.innerHTML = template.innerHTML;
  shim = shim.firstChild;
  
  var fragment = document.createDocumentFragment();

  for(var i = -1;++i<numberOfItems;){
    var newGhost = shim.cloneNode(true);
    fragment.appendChild(newGhost);
    ghosts.push(newGhost);
  }

  container.innerHTML = "";
  container.appendChild(fragment);

  return ghosts;

};


