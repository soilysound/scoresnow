// MEDIA QUERIES

(function(){

  var mobile = window.matchMedia("(max-width: 32em)");
  var tablet = window.matchMedia("(min-width: 32em) and (max-width: 48em)");
  var desktop = window.matchMedia("(min-width: 54em) and (max-width: 65em)");
  var desktopWide = window.matchMedia("(min-width: 65em)");

  if(mobile.matches){
    document.currentBreakPoint = "mobile";
  }

  if(tablet.matches){
    document.currentBreakPoint = "tablet";
  }

  if(desktop.matches){
    document.currentBreakPoint = "desktop";
  }

  if(desktopWide.matches){
    document.currentBreakPoint = "desktopWide";
  }
   
  // create a breakpoint change event
  var bpEvent = document.createEvent('Event');
  bpEvent.initEvent('breakPointChange', true, true);

  mobile.addListener(function(){
    document.currentBreakPoint = "mobile";
    document.dispatchEvent(bpEvent);
  });

  tablet.addListener(function(){
    document.currentBreakPoint = "tablet";
    document.dispatchEvent(bpEvent);
  });

  desktop.addListener(function(){
    document.currentBreakPoint = "desktop";
    document.dispatchEvent(bpEvent);
  });

  desktopWide.addListener(function(){
    document.currentBreakPoint = "desktopWide";
    document.dispatchEvent(bpEvent);
  });


})();

