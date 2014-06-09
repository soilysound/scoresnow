// NAV ACTIONS

module.exports = function(){

  var siteLayout = require('../modules/site-layout-primary.js');
  var navItems = document.querySelectorAll('.nav__item-link');

  document.addEventListener('pageChange', function(){

    navItems.forEach(function(link){
      link.classList.remove('nav__item-link--selected');
      if(link.classList.contains('nav__item-link--' + SCORESNOW.currentSport)){
        link.classList.add('nav__item-link--selected');
      }
    });

  });

  navItems.forEach(function(item){

    item.addEventListener('click', function(e){
      
      if(document.currentBreakPoint === 'mobile' || document.currentBreakPoint === 'tablet'){
        SCORESNOW.disableTransitions = true;
      }

      siteLayout.closeNav();

      setTimeout(function(){
        SCORESNOW.disableTransitions = false;
      }, 400);


    }.bind(item), false);

  });

};