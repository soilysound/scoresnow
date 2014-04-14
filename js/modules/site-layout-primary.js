// SITE LAYOUT PRIMARY

module.exports = function(){

  // get elements
  var openNavButton = document.querySelector('.site-header__col3');
  var siteLayout = document.querySelector('.site-layout-primary');
  var siteLayoutBody = siteLayout.querySelector('.content-window');

  var navIsOpen = false;

   // close nav
  function closeNav(e){
    if(e){
      e.stopPropagation();
    }
    siteLayoutBody.removeEventListener('touchstart', closeNav, true);
    siteLayout.classList.remove('site-layout-primary--nav-open');
    navIsOpen = false;
  }

  // open nav
  function openNav(e){
    siteLayoutBody.addEventListener('touchstart', closeNav, true);
    siteLayout.classList.add('site-layout-primary--nav-open');
    navIsOpen = true;
  }

  // bind click action
  openNavButton.addEventListener('click', function(){
    
    if(navIsOpen){
      closeNav();
    }

    else {
      openNav();
    }

  }, false);


};