// SANITIZE NAME

module.exports = function(name){

  if(!name){
    return name;
  }
  
  // remove year
  name = name.replace(/20[0-9][0-9] /, '');
  // remove brackets
  name = name.replace(/ *\([^)]*\) */, '');
  
  return name;

};