// BUILD VIEW

module.exports = function(){
  
  var viewRendered;
  var date = require('../modules/offset-time.js');
  var ghostPage = require('../modules/ghost-page.js');
  var addPageTitle = require('../modules/set-page-title.js');
  var sanitizeName = require('../modules/sanitize-name.js');


  function constructView(container, data, template, renderFunction){
    
    ghostPage.set(SCORESNOW.children || data.items.length);
    template = document.getElementById(template);

    addPageTitle(sanitizeName(data.name));

    var span = document.createElement('span');
    span.innerHTML = template.innerHTML;
    template = span.firstChild;

    var fragment = document.createDocumentFragment();

    data.items.forEach(function(item){
      var templateInstance = template.cloneNode(true);
      templateInstance.update = renderFunction;
      templateInstance.update(item, true);

      templateInstance.onclick = function(el){
        // oerride ghostpage function with explicit number of children in next view
        SCORESNOW.children = parseInt(this.getAttribute('data-children'), 10);
        setTimeout(function(){
          // reset so ghost page function works as normal on next page
          SCORESNOW.children = null;
        }, 300);
      };

      fragment.appendChild(templateInstance);

    });

    container.innerHTML = "";
    container.appendChild(fragment);
  }

  function updateView(container, data){
    
    // @TODO  use ids here instead
    data.items.forEach(function(item){
      var bar = container.querySelector('#i' + item.matchId);
      if(!bar){
        return;
      }
      bar.update(item);
    });
  }

  function buildView(container, dataUrl, template, contentId){

    // create ghost pages
    ghostPage.add(container);

    // terminate previous web worker
    if(SCORESNOW.dataWorker){
      SCORESNOW.dataWorker.terminate();
    }

    // create new data worker
    var blob = new Blob([
      document.getElementById('blob-worker').textContent
    ]);

    SCORESNOW.dataWorker = new Worker(window.URL.createObjectURL(blob));
    SCORESNOW.dataWorker.postMessage({
      url: dataUrl,
      type: template,
      currentDate: date.getDate(),
      id: contentId
    });

    SCORESNOW.dataWorker.onmessage = function(e){

      if(!e.data){
        SCORESNOW.dataWorker.terminate();
        return;
      }

      if(viewRendered){
        updateView(container, e.data);
      }

      else {
        constructView(container, e.data, template, window.SCORESNOW.renderFunctions[template]);
        viewRendered = true;
      }

    };

  }

  document.addEventListener('pageChange', function(){

    viewRendered = false;

    var currentSport = SCORESNOW.currentSport;
    var pageType = SCORESNOW.pageTypeLookup[SCORESNOW.currentPage];

    var url = SCORESNOW.endpoints[currentSport][pageType];
    url = url.replace('#{id}', SCORESNOW.contentId);
    url = url.replace('#{date}', date.getDate());

    var currentView = (SCORESNOW.pages[SCORESNOW.currentPage - 1]);
    if(SCORESNOW.page !== 'home'){
      buildView(currentView, url, currentSport + '-' + pageType, SCORESNOW.contentId);
    }
    
  });

  // when page transition is complete, scrubb view
  document.addEventListener('pageTransitionComplete', function(){

    var previousPage = SCORESNOW.pages[SCORESNOW.previousPage - 1];
    if(!previousPage){
      return;
    }

    //previousPage.innerHTML = document.getElementById('shim-template').innerHTML;

  }, false);

};