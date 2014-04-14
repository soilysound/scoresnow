// UPDATE TEXT

module.exports = function(node, text){

  if(!node || text === null || text === undefined){
    return;
  }
  
  text = text.toString();

  if(node.textContent!==text){
    if(node.textContent.length > 0){
      node.setAttribute('updated', true);
    }
    node.textContent = text;
  }
  else {
    node.removeAttribute('updated');
  }
};