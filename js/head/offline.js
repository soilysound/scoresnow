// OFFLINE

(function(){

  var style = document.createElement('style');
  document.head.appendChild(style);

  function overlay(){

    if(navigator.onLine){
      style.textContent = ".offline-overlay {visibility: hidden!important}";
    }

    else {
      style.textContent = ".offline-overlay {visibility: visible!important}";
    }

  }

  overlay();

  window.addEventListener("offline", overlay, false);
  window.addEventListener("online", overlay, false);

})();
