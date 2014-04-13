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

function callback(data){
  self.postMessage(data.data.fixtures[new Date().toISOString().split('T').shift()]);
}

self.addEventListener('message', function(e) {
  
  importScripts(e.data + '&callback=callback');
  
  setTimeout(function(){
    importScripts(e.data + '&callback=callback');
  }, 45000);

// XHR(e.data, postData);

  // setInterval(function(){
  //   XHR(e.data, postData);
  // }, 10000);

 
}, false);

// http://www.espn.co.uk/blank/sport/match/json/livescores.json?_=1397395647974;callback=sdf
// http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=8318&gsmLang=en&callback=sdf