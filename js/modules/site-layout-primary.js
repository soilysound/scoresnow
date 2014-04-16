// SITE LAYOUT PRIMARY

module.exports = {

  init: function(){

    // get elements
    this.openNavButton = document.querySelector('.site-header__col3');
    this.siteLayout = document.querySelector('.site-layout-primary__col2');
    this.siteLayoutBody = this.siteLayout.querySelector('.content-window');

    this.navIsOpen = false;

    // if(document.currentBreakPoint === 'mobile' || document.currentBreakPoint === 'tablet'){
    //   this.navIsOpen = true;
    // }

    // bind click action
    this.openNavButton.addEventListener('click', function(){
      
      if(this.navIsOpen){
        this.closeNav();
      }

      else {
        this.openNav();
      }

    }.bind(this), false);
  },

   // close nav
  closeNav: function(e){
    if(e){
      e.stopPropagation();
    }
    
    this.siteLayoutBody.ontouchstart = null;
    this.siteLayout.classList.remove('site-layout-primary--nav-open');
    this.navIsOpen = false;
  },

  // open nav
  openNav: function(e){
    this.siteLayoutBody.ontouchstart = this.closeNav.bind(this);
    this.siteLayout.classList.add('site-layout-primary--nav-open');
    this.navIsOpen = true;
  }


};