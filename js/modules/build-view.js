// BUILD VIEW
window.onerror = function(a, b, c){
  alert(a);
  alert(b);
  alert(c);
};
module.exports = function(){
  
  var viewRendered;
  var date = require('../modules/offset-time.js');
  var addPageTitle = require('../modules/set-page-title.js');
  var sanitizeName = require('../modules/sanitize-name.js');
  var getTemplate = require('../modules/get-template.js');
  var addGhosts = require('../modules/ghost-page.js');


  function constructView(container, data, templateId, renderFunction, ghosts){

    // set page title if its coming from the data
    if(SCORESNOW.pageType.match(/match|competition/i)){
      addPageTitle(sanitizeName(data.title));
    }

    // loop through items in the data
    data.children.forEach(function(item, index){

      var templateInstance = ghosts[index];
      templateInstance.id = 'i' + item.id;
      
      // attach update function to this template and run it
      templateInstance.update = renderFunction;
      templateInstance.update(item, true);

    });

  }

  function updateView(container, data){
    
    // @TODO  use ids here instead
    data.children.forEach(function(item){
      var bar = container.querySelector('#i' + (item.id));

      if(!bar){
        return;
      }
      bar.update(item);
    });
  }

  function noFixtures(container){

    var div = document.createElement('div');
    div.className = 'no-fixtures-message';
    div.innerHTML = '<div class="no-fixtures-message__body"><svg height="16" viewBox="0 0 16 16" class="no-fixtures-message__icon"><path fill-rule="evenodd" d="m8,0c-4.418,0-8,3.582-8,8s3.582,8 8,8 8-3.582 8-8-3.582-8-8-8zm1,13h-2v-2h2v2zm0-3h-2v-7h2v7z"/></svg> No events</div>';
    container.appendChild(div);
  }


  function buildView(container, dataUrl, sport, contentType, contentId){
     
    // create ghost pages
    var ghosts = addGhosts(container, sport + "-" + contentType, SCORESNOW.numberOfGhostItems);

    // @TODO - if switching sports, kill the current data worker
    // if(SCORESNOW.dataWorker){
    //   SCORESNOW.dataWorker.terminate();
    //   SCORESNOW.dataWorker = null;
    // }

    // create new web worker
    if(!SCORESNOW.dataWorker){
      SCORESNOW.dataWorker = new Worker('/data-workers/' + sport + '.js?v=4');
    }

    // post message with url and content section
    SCORESNOW.dataWorker.postMessage({
      url: dataUrl,
      type: sport + '-' + contentType,
      currentDate: date.getDate(-15),
      id: contentId,
      refreshInterval: SCORESNOW.refreshInterval
    });

    SCORESNOW.dataWorker.onmessage = function(e){
      if(e.data === null){
        SCORESNOW.dataWorker.terminate();
        return;
      }

      if(e.data.children.length === 0){
        noFixtures(container);
        return;
      }

      if(viewRendered){
        updateView(container, e.data);
      }

      // construct view for the first time
      else {
        console.log('construct');
        constructView(
          // page container
          container,
          // data 
          e.data,
          // content section
          (sport + '-' + contentType),
          // render function for this view
          window.SCORESNOW.renderFunctions[sport + '-' + contentType],
          // placeholder ghost data bars
          ghosts
        );

        viewRendered = true;
      }

    };

  }

  document.addEventListener('pageChange', function(){

    if(SCORESNOW.pageType === 'home'){
      return;
    }
    // this is a new view so set viewRendered to false
    viewRendered = false;

    // get sport and page type
    var currentSport = SCORESNOW.currentSport;
    var pageType = SCORESNOW.pageType;

    // get end point url for [currentSport]
    var url = SCORESNOW.endPoints[currentSport];

    // optionally pass through content id or date to endpoint
    url = url.replace('#{id}', SCORESNOW.contentId);
    url = url.replace('#{date}', date.getDate(-15));

    var currentView = SCORESNOW.pages[SCORESNOW.currentPage];
    
    buildView(currentView, url, currentSport, pageType, SCORESNOW.contentId);
    
    
  });

  // when page transition is complete, scrubb view
  document.addEventListener('pageTransitionComplete', function(){

    var previousPage = SCORESNOW.pages[SCORESNOW.previousPage];
    if(!previousPage){
      return;
    }

  }, false);

};