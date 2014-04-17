!function t(e,n,o){function i(r,a){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!a&&c)return c(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t){window.SCORESNOW=t("../../js/modules/SCORESNOW-config.js")();var e=t("../../js/modules/site-layout-primary.js"),n=t("../../js/vendor/fastclick.js"),o=t("../../js/modules/hash-routing.js"),i=t("../../js/modules/page-transitions.js"),s=t("../../js/modules/scroll-panes.js"),r=t("../../js/modules/build-view.js"),a=t("../../js/modules/back-button.js"),c=t("../../js/modules/nav.js");window.tapTouch=t("../../js/modules/tap-touch.js"),window.SCORESNOW.renderFunctions={"football-competition":t("../../js/modules/render-functions/football-competition.js"),"football-fixtures":t("../../js/modules/render-functions/football-fixtures.js"),"football-match":t("../../js/modules/render-functions/football-match.js"),"tennis-fixtures":t("../../js/modules/render-functions/tennis-fixtures.js"),"tennis-competition":t("../../js/modules/render-functions/tennis-competition.js"),"darts-fixtures":t("../../js/modules/render-functions/darts-fixtures.js"),"darts-competition":t("../../js/modules/render-functions/darts-competition.js")},e.init(),i(),c(),r(),o(),a(),s(),n(document.body)},{"../../js/modules/SCORESNOW-config.js":2,"../../js/modules/back-button.js":3,"../../js/modules/build-view.js":4,"../../js/modules/hash-routing.js":6,"../../js/modules/nav.js":7,"../../js/modules/page-transitions.js":9,"../../js/modules/render-functions/darts-competition.js":10,"../../js/modules/render-functions/darts-fixtures.js":11,"../../js/modules/render-functions/football-competition.js":12,"../../js/modules/render-functions/football-fixtures.js":13,"../../js/modules/render-functions/football-match.js":14,"../../js/modules/render-functions/tennis-competition.js":15,"../../js/modules/render-functions/tennis-fixtures.js":16,"../../js/modules/scroll-panes.js":18,"../../js/modules/site-layout-primary.js":20,"../../js/modules/tap-touch.js":21,"../../js/vendor/fastclick.js":23}],2:[function(t,e){e.exports=function(){return{history:0,currentPage:0,previousPage:0,direction:"forward",disableTransitions:!1,pageTypeLookup:{1:"home",2:"fixtures",3:"competition",4:"match",home:1,fixtures:2,competition:3,match:4},ghostPages:{all:{home:1},football:{fixtures:1,competition:{},match:1},tennis:{fixtures:1,competition:{},match:1},darts:{fixtures:1,competition:{},match:1}},sportLookup:{1:"all",2:"football",3:"cricket",4:"tennis",5:"darts",all:1,football:2,cricket:3,tennis:4,darts:5},statusLookup:{played:"FT",fixture:"KO",playing:"IP",finished:"FT","not started":"KO","in progress":"IP"},competitionLookup:{football:{2896:[8318,"Premier League"],2897:[8428,"Championship"],3268:[8325,"League One"],3269:[8326,"League Two"],2900:[8260,"FA Cup"],2932:[8391,"Scottish Premiership"],438:[8217,"Scottish Championship"],46:[8218,"Scottish League 1"],3277:[8491,"La Liga"],3275:[8467,"Bundesliga"],3276:[8398,"Seria A"],2914:[8381,"UEFA Champions League"],3274:[8463,"Ligue 1"],82:[8472,"DFB Pokal German Cup"],2915:[8295,"UEFA Europa League"],53:[8342,"Copa Del Ray"],65:[8658,"Argentina Primera Division"]},tennis:{},darts:{}},endpoints:{all:{home:""},football:{fixtures:"https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/football-fixtures-#{date}.js?",competition:"http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=#{id}&gsmLang=en",match:"http://www.goal.com/en-gb/data/get-events-for-match?gsmMatchId=#{id}&gsmLang=en&callback=callback"},tennis:{fixtures:"https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/tennis-fixtures-#{date}.js?",competition:"https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/tennis-fixtures-#{date}.js?"},darts:{fixtures:"https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/darts-fixtures-#{date}.js?",competition:"https://googledrive.com/host/0B5Em7PKD4NLoR2dYMktjTmxOckU/darts-fixtures-#{date}.js?"}}}}},{}],3:[function(t,e){e.exports=function(){function t(t){n.style.cssText=t?"opacity: 1":"opacity: 0; pointer-events: none"}var e=0,n=document.querySelector(".site-header__col1");n.addEventListener("click",function(){SCORESNOW.historyBack=!0,history.go(-1),e++,e===SCORESNOW.history&&(t(!1),e=0,SCORESNOW.history=0),setTimeout(function(){SCORESNOW.historyBack=!1},50)},!1),document.addEventListener("pageChange",function(){SCORESNOW.historyBack||SCORESNOW.history++,SCORESNOW.history>0&&t(!0)})}},{}],4:[function(t,e){e.exports=function(){function e(t,e,n,o){r.set(SCORESNOW.children||e.items.length),n=document.getElementById(n),a(c(e.name));var i=document.createElement("span");i.innerHTML=n.innerHTML,n=i.firstChild;var s=document.createDocumentFragment();e.items.forEach(function(t){var e=n.cloneNode(!0);e.update=o,e.update(t,!0),e.onclick=function(){SCORESNOW.children=parseInt(this.getAttribute("data-children"),10),setTimeout(function(){SCORESNOW.children=null},300)},s.appendChild(e)}),t.innerHTML="",t.appendChild(s)}function n(t,e){e.items.forEach(function(e){var n=t.querySelector("#i"+(e.matchId||e.id));n&&n.update(e)})}function o(t,o,a,c){r.add(t),SCORESNOW.dataWorker&&SCORESNOW.dataWorker.terminate();var u=new Blob([document.getElementById("blob-worker").textContent]);SCORESNOW.dataWorker=new Worker(window.URL.createObjectURL(u)),SCORESNOW.dataWorker.postMessage({url:o,type:a,currentDate:s.getDate(),id:c}),SCORESNOW.dataWorker.onmessage=function(o){return o.data?void(i?n(t,o.data):(e(t,o.data,a,window.SCORESNOW.renderFunctions[a]),i=!0)):void SCORESNOW.dataWorker.terminate()}}var i,s=t("../modules/offset-time.js"),r=t("../modules/ghost-page.js"),a=t("../modules/set-page-title.js"),c=t("../modules/sanitize-name.js");document.addEventListener("pageChange",function(){i=!1;var t=SCORESNOW.currentSport,e=SCORESNOW.pageTypeLookup[SCORESNOW.currentPage],n=SCORESNOW.endpoints[t][e];n=n.replace("#{id}",SCORESNOW.contentId),n=n.replace("#{date}",s.getDate());var r=SCORESNOW.pages[SCORESNOW.currentPage-1];"home"!==SCORESNOW.page&&o(r,n,t+"-"+e,SCORESNOW.contentId)}),document.addEventListener("pageTransitionComplete",function(){var t=SCORESNOW.pages[SCORESNOW.previousPage-1]},!1)}},{"../modules/ghost-page.js":5,"../modules/offset-time.js":8,"../modules/sanitize-name.js":17,"../modules/set-page-title.js":19}],5:[function(t,e){e.exports={add:function(t){var e=1;if("fixtures"===SCORESNOW.page&&SCORESNOW.ghostPages[SCORESNOW.currentSport].fixtures&&(e=SCORESNOW.ghostPages[SCORESNOW.currentSport].fixtures),"match"===SCORESNOW.page)e=1;else{var n=SCORESNOW.ghostPages[SCORESNOW.currentSport][SCORESNOW.page];n[SCORESNOW.contentId]&&(e=n[SCORESNOW.contentId])}SCORESNOW.children&&(e=SCORESNOW.children);var o=document.getElementById(SCORESNOW.currentSport+"-"+SCORESNOW.page),i=document.createElement("div");i.innerHTML=o.innerHTML,i=i.firstChild;for(var s=document.createDocumentFragment(),r=-1;++r<e;)s.appendChild(i.cloneNode(!0));t.innerHTML="",t.appendChild(s)},set:function(t){var e;"fixtures"===SCORESNOW.page&&(SCORESNOW.ghostPages[SCORESNOW.currentSport].fixtures=t),"match"===SCORESNOW.page?SCORESNOW.ghostPages[SCORESNOW.currentSport].match=1:(e=SCORESNOW.ghostPages[SCORESNOW.currentSport][SCORESNOW.page],e[SCORESNOW.contentId]=t)}}},{}],6:[function(t,e){e.exports=function(){function e(t){SCORESNOW.page=t.replace("#/","").split("/")[1],SCORESNOW.previousPage=SCORESNOW.currentPage,SCORESNOW.currentPage=SCORESNOW.pageTypeLookup[SCORESNOW.page]}function n(t){var e=t.replace("#/","").split("/").shift();SCORESNOW.currentSport=e}function o(t){var e=t.split("/").pop();SCORESNOW.contentId=e}function i(){if("fixtures"===SCORESNOW.page&&(SCORESNOW.pageTitle=SCORESNOW.currentSport),"competition"===SCORESNOW.page){var t=SCORESNOW.competitionLookup[SCORESNOW.currentSport];Object.keys(t).forEach(function(e){t[e][0].toString()===SCORESNOW.contentId&&(SCORESNOW.pageTitle=t[e][1])})}"match"===SCORESNOW.page&&(SCORESNOW.pageTitle="Match"),"home"===SCORESNOW.page&&(SCORESNOW.pageTitle="Home"),a(SCORESNOW.pageTitle)}function s(t){SCORESNOW.direction=t}function r(){var t=location.hash;location.hash.length<3&&(t="#/all/home/0"),e(t),n(t),o(t),i(t),s("forward"),document.dispatchEvent(c)}var a=t("../modules/set-page-title.js"),c=document.createEvent("Event");c.initEvent("pageChange",!0,!0),window.addEventListener("hashchange",r,!1),r()}},{"../modules/set-page-title.js":19}],7:[function(t,e){e.exports=function(){var e=t("../modules/site-layout-primary.js"),n=document.querySelectorAll(".nav__item-link");document.addEventListener("pageChange",function(){n.forEach(function(t){t.classList.remove("nav__item-link--selected"),t.classList.contains("nav__item-link--"+SCORESNOW.currentSport)&&t.classList.add("nav__item-link--selected")})}),n.forEach(function(t){t.addEventListener("click",function(){("mobile"===document.currentBreakPoint||"tablet"===document.currentBreakPoint)&&(SCORESNOW.disableTransitions=!0),e.closeNav(),setTimeout(function(){SCORESNOW.disableTransitions=!1},333)}.bind(t),!1)})}},{"../modules/site-layout-primary.js":20}],8:[function(t,e){e.exports={getTime:function(t,e){var n=new Date(t+"T"+e),o=n.getHours(),i=n.getMinutes();return 0===i&&(i="0"+i),0===o&&(o="0"+o),o+":"+i},getDate:function(){var t=new Date,e=Math.abs(t.getTimezoneOffset());return t.setHours(t.getHours()+e/60),t.toISOString().split("T").shift()}}},{}],9:[function(t,e){e.exports=function(){function t(t,e,n){if(t){var o=[];(!n||SCORESNOW.disableTransitions)&&(o.push("-webkit-transition-duration: 0"),o.push("transition-duration: 0")),o.push("-webkit-transform: translateX("+e+")"),o.push("transform: translateX("+e+")"),t.style.cssText=o.join(";")}}function e(e,i){t(n[i],0,!1),t(n[e],"100%",!1),t(n[i],"-100%",!0),t(n[e],0,!0),setTimeout(function(){t(n[i],"100%",!1),document.dispatchEvent(o)},400)}var n=document.querySelectorAll(".page-slot");SCORESNOW.pages=n;var o=document.createEvent("Event");o.initEvent("pageTransitionComplete",!0,!0),document.addEventListener("pageChange",function(){var t=SCORESNOW.currentPage,n=SCORESNOW.previousPage,o=SCORESNOW.direction;t!==n&&e(t-1,n-1,o)},!1)}},{}],10:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js");this.setAttribute("data-status",e.status),o(this.querySelector(".data-bar__cell-homescore"),e.homescore),o(this.querySelector(".data-bar__cell-awayscore"),e.awayscore),o(this.querySelector(".data-bar__cell-status"),status),n&&(o(this.querySelector(".data-bar__cell-time"),"vs"),o(this.querySelector(".data-bar__cell-hometeam"),e.homepart),o(this.querySelector(".data-bar__cell-awayteam"),e.awaypart),this.id="i"+e.id)}},{"../update-text.js":22}],11:[function(t,e){e.exports=function(e,n){console.log(e);var o=t("../update-text.js"),i=t("../sanitize-name.js");if(n){var s=e.name.trim();o(this.querySelector(".data-bar__cell-competition-name"),i(s)),this.href="/#/darts/competition/"+e.id,this.setAttribute("data-children",e.competitionChildren)}}},{"../sanitize-name.js":17,"../update-text.js":22}],12:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js"),i=t("../offset-time.js"),s=SCORESNOW.statusLookup[e.status.toLowerCase()];this.setAttribute("data-status",s),o(this.querySelector(".data-bar__cell-homescore"),e.scoreHome),o(this.querySelector(".data-bar__cell-awayscore"),e.scoreAway),o(this.querySelector(".data-bar__cell-status"),s),n&&(o(this.querySelector(".data-bar__cell-time"),i.getTime(e.kickoffDate,e.kickoffTime)),o(this.querySelector(".data-bar__cell-hometeam"),e.teamHomeClubName),o(this.querySelector(".data-bar__cell-awayteam"),e.teamAwayClubName),this.href="/#/football/match/"+e.matchId,this.id="i"+e.matchId)}},{"../offset-time.js":8,"../update-text.js":22}],13:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js");if(n){var i=SCORESNOW.competitionLookup[SCORESNOW.currentSport][e.competitionId];if(!i)return;var s=i[1],r="/#/"+["football","competition",i[0]].join("/");o(this.querySelector(".data-bar__cell-competition-name"),s),this.href=r,this.setAttribute("data-title",s),this.setAttribute("data-children",e.competitionChildren),this.id="i"+e.competitionId}}},{"../update-text.js":22}],14:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js");o(this.querySelector(".data-bar__cell-homescore"),e.score.home),o(this.querySelector(".data-bar__cell-awayscore"),e.score.away);var i=SCORESNOW.statusLookup[e.generalInfo.matchStatus.toLowerCase()];this.querySelectorAll(".data-bar").forEach(function(t){t.setAttribute("data-status",i)}),n&&(o(this.querySelector(".data-bar__cell-hometeam"),e.teams.home.name),o(this.querySelector(".data-bar__cell-awayteam"),e.teams.away.name),this.id="i"+e.matchId)}},{"../update-text.js":22}],15:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js"),i=e.players,s=SCORESNOW.statusLookup[e.status.toLowerCase()];n&&(o(this.querySelector(".data-bar__cell-tennis-side1-participant"),i[0].name),o(this.querySelector(".data-bar__cell-tennis-side2-participant"),i[1].name),this.id="i"+e.id);var r=this.querySelectorAll(".data-bar__row"),a=-1;i[0].is_winner&&(a=0),i[1].is_winner&&(a=1);var c=-1;i[0].is_serving&&(c=0),i[1].is_serving&&(c=1),r[a]&&r[a].setAttribute("data-is-winner",a+1),r[c]&&r[c].setAttribute("data-is-server",c+1),this.querySelectorAll(".data-bar__cell-tennis-set-group").forEach(function(t,e){var n=i[e],r=t.querySelectorAll(".data-bar__cell-tennis-set");t.setAttribute("data-sets",n.set_games.length),t.setAttribute("data-status",s),n.set_games.forEach(function(t,e){o(r[e],t)})})}},{"../update-text.js":22}],16:[function(t,e){e.exports=function(e,n){var o=t("../update-text.js"),i=t("../sanitize-name.js");if(n){var s=e.name.trim();o(this.querySelector(".data-bar__cell-competition-name"),i(s)),this.href="/#/tennis/competition/"+e.id,this.setAttribute("data-children",e.competitionChildren)}}},{"../sanitize-name.js":17,"../update-text.js":22}],17:[function(t,e){e.exports=function(t){return t?(t=t.replace(/20[0-9][0-9] /,""),t=t.replace(/ *\([^)]*\) */,"")):t}},{}],18:[function(t,e){e.exports=function(){function t(){this.offsetHeight+this.scrollTop>=this.scrollHeight&&(this.scrollTop=this.scrollTop-1),this.scrollTop<=0&&(this.scrollTop=1)}if(device.hasTouch){var e=document.querySelectorAll(".scroll-pane");e.forEach(function(e){e.addEventListener("touchstart",t,!1),e.scrollTop=1})}}},{}],19:[function(t,e){e.exports=function(e,n){var o=t("../modules/update-text.js"),i=document.querySelector(".page-title"),s=e?e:n;o(i,s)}},{"../modules/update-text.js":22}],20:[function(t,e){e.exports={init:function(){this.openNavButton=document.querySelector(".site-header__col3"),this.siteLayout=document.querySelector(".site-layout-primary__col2"),this.siteLayoutBody=this.siteLayout.querySelector(".content-window"),this.navIsOpen=!1,this.openNavButton.addEventListener("click",function(){this.navIsOpen?this.closeNav():this.openNav()}.bind(this),!1)},closeNav:function(t){t&&t.stopPropagation(),this.siteLayoutBody.ontouchstart=null,this.siteLayout.classList.remove("site-layout-primary--nav-open"),this.navIsOpen=!1},openNav:function(){this.siteLayoutBody.ontouchstart=this.closeNav.bind(this),this.siteLayout.classList.add("site-layout-primary--nav-open"),this.navIsOpen=!0}}},{}],21:[function(t,e){e.exports=function(t){var e=!0;setTimeout(function(){e&&t.classList.add("tap-touch")},50),t.ontouchmove=function(){t.classList.remove("tap-touch"),t.ontouchmove=null,e=!1}}},{}],22:[function(t,e){e.exports=function(t,e){t&&null!==e&&void 0!==e&&(e=e.toString(),t.textContent!==e?(t.textContent.length>0&&t.setAttribute("data-updated",!0),t.textContent=e):t.removeAttribute("data-updated"))}},{}],23:[function(t,e){function n(t,e){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var s;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!n.notNeeded(t)){for(var r=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,u=r.length;u>c;c++)a[r[c]]=i(a[r[c]],a);o&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,o):i.call(t,e,n,o)},t.addEventListener=function(e,n,o){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(t,e,n,o)}),"function"==typeof t.onclick&&(s=t.onclick,t.addEventListener("click",function(t){s(t)},!1),t.onclick=null)}}var o=navigator.userAgent.indexOf("Android")>0,i=/iP(ad|hone|od)/.test(navigator.userAgent),s=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=i&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);n.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(i&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},n.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!o;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},n.prototype.sendClick=function(t,e){"use strict";var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},n.prototype.determineEventType=function(t){"use strict";return o&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},n.prototype.focus=function(t){"use strict";var e;i&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},n.prototype.updateScrollParent=function(t){"use strict";var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},n.prototype.onTouchStart=function(t){"use strict";var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],i){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!s){if(n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},n.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(t){"use strict";var e,n,a,c,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=l.tagName.toLowerCase(),"label"===a){if(e=this.findControl(l)){if(this.focus(l),o)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-n>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),i&&"select"===a||(this.targetElement=null,t.preventDefault()),!1);return i&&!s&&(c=l.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},n.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},n.prototype.destroy=function(){"use strict";var t=this.layer;o&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(t){"use strict";var e,n;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!o)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}return"none"===t.style.msTouchAction?!0:!1},n.attach=function(t,e){"use strict";return new n(t,e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof e&&e.exports?(e.exports=n.attach,e.exports.FastClick=n):window.FastClick=n},{}]},{},[1]);