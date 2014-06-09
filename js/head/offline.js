// OFFLINE

(function(){

  var style = document.createElement('style');
  document.head.appendChild(style);

  function overlay(isEvent){

    if(navigator.onLine){
      style.textContent = ".offline-overlay {display: none}";
      if(isEvent){
        window.setTimeout(function(){
         location.reload()
       }, 1000);
      }
    }

    else {
      style.textContent = ".offline-overlay {display: table}";
    }

  }

  overlay();

  window.addEventListener("offline", overlay, false);
  window.addEventListener("online", overlay.bind(null, 'isEvent'), false);

})();
