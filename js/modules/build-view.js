// BUILD VIEW

module.exports = function(){
  
  var viewRendered;

  function constructView(container, data, template, renderFunction){

    template = document.getElementById(template);

    var span = document.createElement('span');
    span.innerHTML = template.innerHTML;
    template = span.firstChild;

    var fragment = document.createDocumentFragment();

    data.forEach(function(item){

      var templateInstance = template.cloneNode(true);

      templateInstance.update = renderFunction;
      templateInstance.update(item);

      fragment.appendChild(templateInstance);

    });

    container.innerHTML = "";
    container.appendChild(fragment);
  }

  function updateView(){
    console.log('update');
  }

  function buildView(container, dataUrl, template){

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
      type: template
    });

    SCORESNOW.dataWorker.onmessage = function(e){
      console.log(e.data);
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

    var currentView = (SCORESNOW.pages[SCORESNOW.currentPage - 1]);

    buildView(currentView, url, currentSport + '-' + pageType);
    
  });

  // when page transition is complete, scrubb view
  document.addEventListener('pageTransitionComplete', function(){

    var previousPage = SCORESNOW.pages[SCORESNOW.previousPage - 1];
    if(!previousPage){
      return;
    }

    previousPage.innerHTML = document.getElementById('shim-template').innerHTML;

  }, false);

};