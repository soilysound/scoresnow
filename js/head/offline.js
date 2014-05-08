// OFFLINE

(function(){

  var style = document.createElement('style');
  document.head.appendChild(style);

  function overlay(){

    if(navigator.onLine){
      style.textContent = ".offline-overlay {display: none}";
    }

    else {
      style.textContent = ".offline-overlay {display: table}";
    }

  }

  overlay();

  window.addEventListener("offline", overlay, false);
  window.addEventListener("online", overlay, false);

})();
