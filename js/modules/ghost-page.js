// GHOST PAGE

module.exports = {

  add: function(container){

    var number = 1;

    if(SCORESNOW.page === 'fixtures' && SCORESNOW.ghostPages[SCORESNOW.currentSport]['fixtures']){
        number = SCORESNOW.ghostPages[SCORESNOW.currentSport]['fixtures'];
    }

    if(SCORESNOW.page === 'match'){
      number = 1;
    }

    else {
      var reference = SCORESNOW.ghostPages[SCORESNOW.currentSport][SCORESNOW.page];
      if(reference[SCORESNOW.contentId]){
        number = reference[SCORESNOW.contentId];
      }
    }

    if(SCORESNOW.children){
      number = SCORESNOW.children;
    }

    var template = document.getElementById('shim-template');
    if(SCORESNOW.page === 'match'){
      template = document.getElementById(SCORESNOW.currentSport + '-match');
      console.log(template);
    }

    var shim = document.createElement('div');
    shim.innerHTML = template.innerHTML;
    shim = shim.firstChild;
    
    var fragment = document.createDocumentFragment();

    for(var i = -1;++i<number;){
      fragment.appendChild(shim.cloneNode(true));
    }

    container.innerHTML = "";
    container.appendChild(fragment);

  },

  set: function(number){

    var reference;

    if(SCORESNOW.page === 'fixtures'){
      SCORESNOW.ghostPages[SCORESNOW.currentSport]['fixtures'] = number;
    }

    if(SCORESNOW.page === 'match'){
      SCORESNOW.ghostPages[SCORESNOW.currentSport]['match'] = 1;
    }

    else {
      reference = SCORESNOW.ghostPages[SCORESNOW.currentSport][SCORESNOW.page];
      reference[SCORESNOW.contentId] = number;
    }
    
  }
};

