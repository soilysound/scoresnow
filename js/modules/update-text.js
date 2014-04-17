// UPDATE TEXT

module.exports = function(node, text){

  if(!node || text === null || text === undefined){
    return;
  }
  
  text = text.toString().trim();
  var currentText = node.textContent.trim();

  if(currentText!==text || currentText === '-'){
    if(currentText.length > 0){
      node.setAttribute('data-updated', true);
    }
    node.textContent = text;
  }
  else {
    node.removeAttribute('data-updated');
  }
};