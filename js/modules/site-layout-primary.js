// SITE LAYOUT PRIMARY

module.exports = function(){

  // get elements
  var openNavButton = document.querySelector('.site-header__hamburger');
  var siteLayout = document.querySelector('.site-layout-primary');
  var navIsOpen = false;

  // bind click action
  openNavButton.addEventListener('click', function(){
    
    if(navIsOpen){
      // close nav
      siteLayout.classList.remove('site-layout-primary--nav-open');
      navIsOpen = false;
    }

    else {
      // open nav
      siteLayout.classList.add('site-layout-primary--nav-open');
      navIsOpen = true;
    }

  }, false);

};