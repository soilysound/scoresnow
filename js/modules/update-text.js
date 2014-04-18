// UPDATE TEXT

module.exports = function(node, text){

  if(!node || text === null || text === undefined){
    return;
  }
  
  text = text.toString().trim();
  var currentText = node.textContent;

  if(currentText !== text){
    if(currentText.length > 0 && currentText !== '-'){
      node.setAttribute('data-updated', true);
    }
    node.textContent = text;
  }
  else {
    node.removeAttribute('data-updated');
  }
};