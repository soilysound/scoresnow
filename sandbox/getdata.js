function XHR(url, func){

  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState==4 && request.status==200){
      func(JSON.parse(request.responseText));
    }
  };

  request.open("GET", url, true);
  request.send();
  
}

function postData(data){
  self.postMessage(data.sport.football.matches);
}

self.addEventListener('message', function(e) {
  
  XHR(e.data, postData);

  setInterval(function(){
    XHR(e.data, postData);
  }, 10000);

 
}, false);