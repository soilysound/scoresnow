// football data worker

var refreshInterval;
var dataType;
var dataObject;
var currentDate;
var id;
self.dataCache = false;

self.addEventListener('message', function(e) {
  
  refreshInterval = e.data.refreshInterval;
  dataType = e.data.type;
  currentDate = e.data.currentDate;
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

  // football fixtures list
  if(dataType === 'football-fixtures'){
    dataObject = data;
    clearInterval(self.timer);
  }

  // a football competition
  if(dataType === 'football-competition'){
      data.children.forEach(function(item){
        if(item.id == id){
          dataObject = item;
        }
      });
  }

  // a football match
  if(dataType === 'football-match'){
    data.children.forEach(function(item){
      item.children.forEach(function(row){
        if(row.id == id){
          dataObject = {
            children: [row],
            title: item.title
          };
        }
      });
    });
  }

  // post new data to worker parent
  self.postMessage(dataObject);

}
