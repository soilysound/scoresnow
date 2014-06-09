// tennis data worker

var refreshInterval;
var dataType;
var dataObject;
var currentDate;
var id;
self.dataCache = false;

self.addEventListener('message', function(e) {
  
  refreshInterval = e.data.refreshInterval;
  dataType = e.data.type;
  id = e.data.id;

  // if theres some cached data immedietly call it to prevent render delays
  if(typeof self.dataCache === 'object'){
    // console.log('from cache');
    callback(self.dataCache);
  }

  try{
    // try and import data source
    importScripts(e.data.url);
  }

  catch(error){
    // if error post null to worker parent 
    self.postMessage(null);
    clearInterval(self.timer);
  }

  // reload script on specified interval
  clearInterval(self.timer);
  self.timer = setInterval(function(){
    importScripts(e.data.url);
  }, refreshInterval);

  // console.log(self.timer);

  
}, false);

// callback function on data worker
function callback(data){

  self.dataCache = data;

  // tennis fixtures list
  if(dataType === 'tennis-fixtures'){
    dataObject = data;
    clearInterval(self.timer);
  }

  // a tennis competition
  if(dataType === 'tennis-competition'){
      data.children.forEach(function(item){
        if(item.id == id){
          dataObject = item;
        }
      });
  }

  // post new data to worker parent
  self.postMessage(dataObject);

}
