!function t(e,n,o){function i(s,a){if(!n[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(t){window.SCORESNOW=t("../../js/modules/SCORESNOW-config.js")();var e=t("../../js/modules/site-layout-primary.js"),n=t("../../js/vendor/fastclick.js"),o=t("../../js/modules/hash-routing.js"),i=t("../../js/modules/page-transitions.js"),r=t("../../js/modules/scroll-panes.js"),s=t("../../js/modules/build-view.js"),a=t("../../js/modules/back-button.js");window.SCORESNOW.renderFunctions={"football-competition":t("../../js/modules/render-functions/football-competition.js"),"football-fixtures":t("../../js/modules/render-functions/football-fixtures.js")},e(),i(),s(),o(),a(),r(),n(document.body)},{"../../js/modules/SCORESNOW-config.js":2,"../../js/modules/back-button.js":3,"../../js/modules/build-view.js":4,"../../js/modules/hash-routing.js":5,"../../js/modules/page-transitions.js":7,"../../js/modules/render-functions/football-competition.js":8,"../../js/modules/render-functions/football-fixtures.js":9,"../../js/modules/scroll-panes.js":10,"../../js/modules/site-layout-primary.js":12,"../../js/vendor/fastclick.js":14}],2:[function(t,e){e.exports=function(){return{history:0,currentPage:0,previousPage:0,direction:"forward",pageTypeLookup:{1:"fixtures",2:"competition",3:"match",fixtures:1,competition:2,match:3},sportLookup:{1:"football",2:"cricket",3:"tennis",football:1,cricket:2,tennis:3},statusLookup:{played:"FT",fixture:"KO"},competitionLookup:{football:{8:[8318,"Premier League"],7:[8491,"La Liga"],13:[8398,"Serie A"],16:[8463,"Ligue 1"],93:[8260,"FA Cup"]}},endpoints:{football:{fixtures:"http://www.goal.com/feed/matches/highlights?edition=en-gb&format=lmc",competition:"http://www.goal.com/en-gb/data/get-fixtures?gsmSeasonId=#{id}&gsmLang=en",match:"match/#{id}.json"}}}}},{}],3:[function(t,e){e.exports=function(){function t(t){n.style.visibility=t?"visible":"hidden"}var e=0,n=document.querySelector(".site-header__col1");n.addEventListener("click",function(){SCORESNOW.historyBack=!0,history.go(-1),e++,e===SCORESNOW.history&&(t(!1),e=0,SCORESNOW.history=0),setTimeout(function(){SCORESNOW.historyBack=!1},50)},!1),document.addEventListener("pageChange",function(){SCORESNOW.historyBack||SCORESNOW.history++,SCORESNOW.history>0&&t(!0),console.log(e,SCORESNOW.history)})}},{}],4:[function(t,e){e.exports=function(){function t(t,e,n,o){n=document.getElementById(n);var i=document.createElement("span");i.innerHTML=n.innerHTML,n=i.firstChild;var r=document.createDocumentFragment();e.forEach(function(t){var e=n.cloneNode(!0);e.update=o,e.update(t),r.appendChild(e)}),t.innerHTML="",t.appendChild(r)}function e(){console.log("update")}function n(n,i,r){SCORESNOW.dataWorker&&SCORESNOW.dataWorker.terminate();var s=new Blob([document.getElementById("blob-worker").textContent]);SCORESNOW.dataWorker=new Worker(window.URL.createObjectURL(s)),SCORESNOW.dataWorker.postMessage({url:i,type:r}),SCORESNOW.dataWorker.onmessage=function(i){return i.data?void(o?e(n,i.data):(t(n,i.data,r,window.SCORESNOW.renderFunctions[r]),o=!0)):void SCORESNOW.dataWorker.terminate()}}var o;document.addEventListener("pageChange",function(){o=!1;var t=SCORESNOW.currentSport,e=SCORESNOW.pageTypeLookup[SCORESNOW.currentPage],i=SCORESNOW.endpoints[t][e];i=i.replace("#{id}",SCORESNOW.contentId);var r=SCORESNOW.pages[SCORESNOW.currentPage-1];n(r,i,t+"-"+e)}),document.addEventListener("pageTransitionComplete",function(){var t=SCORESNOW.pages[SCORESNOW.previousPage-1];t&&(t.innerHTML=document.getElementById("shim-template").innerHTML)},!1)}},{}],5:[function(t,e){e.exports=function(){function e(t){SCORESNOW.page=t.replace("#/","").split("/")[1],SCORESNOW.previousPage=SCORESNOW.currentPage,SCORESNOW.currentPage=SCORESNOW.pageTypeLookup[SCORESNOW.page]}function n(t){var e=t.replace("#/","").split("/").shift();SCORESNOW.currentSport=e}function o(t){var e=t.split("/").pop();SCORESNOW.contentId=e}function i(){if("fixtures"===SCORESNOW.page&&(SCORESNOW.pageTitle=SCORESNOW.currentSport),"competition"===SCORESNOW.page){var t=SCORESNOW.competitionLookup[SCORESNOW.currentSport];Object.keys(t).forEach(function(e){t[e][0].toString()===SCORESNOW.contentId&&(SCORESNOW.pageTitle=t[e][1])})}a(SCORESNOW.pageTitle)}function r(t){SCORESNOW.direction=t}function s(){0!==location.hash.length&&(e(location.hash),n(location.hash),o(location.hash),i(location.hash),r("forward"),document.dispatchEvent(c))}var a=t("../modules/set-page-title.js"),c=document.createEvent("Event");c.initEvent("pageChange",!0,!0),window.addEventListener("hashchange",s,!1),s()}},{"../modules/set-page-title.js":11}],6:[function(t,e){e.exports=function(t,e){var n=new Date(t+"T"+e),o=n.getHours(),i=n.getMinutes();return console.log(i.length),0===i&&(i="0"+i),o+":"+i}},{}],7:[function(t,e){e.exports=function(){function t(t,e,n){if(t){var o=[];n||(o.push("-webkit-transition-duration: 0"),o.push("transition-duration: 0")),o.push("-webkit-transform: translateX("+e+")"),o.push("transform: translateX("+e+")"),t.style.cssText=o.join(";")}}function e(e,i){t(n[i],0,!1),t(n[e],"100%",!1),t(n[i],"-100%",!0),t(n[e],0,!0),setTimeout(function(){t(n[i],"100%",!1),document.dispatchEvent(o)},400)}var n=document.querySelectorAll(".page-slot");SCORESNOW.pages=n;var o=document.createEvent("Event");o.initEvent("pageTransitionComplete",!0,!0),document.addEventListener("pageChange",function(){var t=SCORESNOW.currentPage,n=SCORESNOW.previousPage,o=SCORESNOW.direction;t!==n&&e(t-1,n-1,o)},!1)}},{}],8:[function(t,e){e.exports=function(e){var n=t("../update-text.js"),o=t("../offset-time.js");this.setAttribute("data-status",SCORESNOW.statusLookup[e.status.toLowerCase()]),n(this.querySelector(".data-bar__cell-hometeam"),e.teamHomeClubName),n(this.querySelector(".data-bar__cell-awayteam"),e.teamAwayClubName),n(this.querySelector(".data-bar__cell-homescore"),e.scoreHome),n(this.querySelector(".data-bar__cell-awayscore"),e.scoreAway),n(this.querySelector(".data-bar__cell-time"),o(e.kickoffDate,e.kickoffTime)),n(this.querySelector(".data-bar__cell-status"),SCORESNOW.statusLookup[e.status.toLowerCase()])}},{"../offset-time.js":6,"../update-text.js":13}],9:[function(t,e){e.exports=function(e){var n=t("../update-text.js"),o=SCORESNOW.competitionLookup[SCORESNOW.currentSport][e.competitionId][1],i="/#/"+["football","competition",SCORESNOW.competitionLookup[SCORESNOW.currentSport][e.competitionId][0]].join("/");n(this.querySelector(".data-bar__cell-competition-name"),o),this.href=i,this.setAttribute("data-title",o)}},{"../update-text.js":13}],10:[function(t,e){e.exports=function(){function t(){this.offsetHeight+this.scrollTop>=this.scrollHeight&&(this.scrollTop=this.scrollTop-1),this.scrollTop<=0&&(this.scrollTop=1)}if(device.hasTouch){var e=document.querySelectorAll(".scroll-pane");e.forEach(function(e){e.addEventListener("touchstart",t,!1)})}}},{}],11:[function(t,e){e.exports=function(e,n){var o=t("../modules/update-text.js"),i=document.querySelector(".page-title"),r=e?e:n;o(i,r),i.style.visibility="visible"}},{"../modules/update-text.js":13}],12:[function(t,e){e.exports=function(){function t(){i.removeEventListener("touchstart",t,!0),o.classList.remove("site-layout-primary--nav-open"),r=!1}function e(){i.addEventListener("touchstart",t,!0),o.classList.add("site-layout-primary--nav-open"),r=!0}var n=document.querySelector(".site-header__col3"),o=document.querySelector(".site-layout-primary"),i=o.querySelector(".content-window"),r=!1;n.addEventListener("click",function(){r?t():e()},!1)}},{}],13:[function(t,e){e.exports=function(t,e){t&&null!==e&&void 0!==e&&(e=e.toString(),t.textContent!==e?(t.textContent.length>0&&t.setAttribute("updated",!0),t.textContent=e):t.removeAttribute("updated"))}},{}],14:[function(t,e){function n(t,e){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(e=e||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=e.touchBoundary||10,this.layer=t,this.tapDelay=e.tapDelay||200,!n.notNeeded(t)){for(var s=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,u=s.length;u>c;c++)a[s[c]]=i(a[s[c]],a);o&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var i=Node.prototype.removeEventListener;"click"===e?i.call(t,e,n.hijacked||n,o):i.call(t,e,n,o)},t.addEventListener=function(e,n,o){var i=Node.prototype.addEventListener;"click"===e?i.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(t,e,n,o)}),"function"==typeof t.onclick&&(r=t.onclick,t.addEventListener("click",function(t){r(t)},!1),t.onclick=null)}}var o=navigator.userAgent.indexOf("Android")>0,i=/iP(ad|hone|od)/.test(navigator.userAgent),r=i&&/OS 4_\d(_\d)?/.test(navigator.userAgent),s=i&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);n.prototype.needsClick=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(i&&"file"===t.type||t.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(t.className)},n.prototype.needsFocus=function(t){"use strict";switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!o;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},n.prototype.sendClick=function(t,e){"use strict";var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},n.prototype.determineEventType=function(t){"use strict";return o&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},n.prototype.focus=function(t){"use strict";var e;i&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},n.prototype.updateScrollParent=function(t){"use strict";var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},n.prototype.getTargetElementFromEventTarget=function(t){"use strict";return t.nodeType===Node.TEXT_NODE?t.parentNode:t},n.prototype.onTouchStart=function(t){"use strict";var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],i){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!r){if(n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},n.prototype.touchHasMoved=function(t){"use strict";var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},n.prototype.onTouchMove=function(t){"use strict";return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},n.prototype.findControl=function(t){"use strict";return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},n.prototype.onTouchEnd=function(t){"use strict";var e,n,a,c,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,s&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),a=l.tagName.toLowerCase(),"label"===a){if(e=this.findControl(l)){if(this.focus(l),o)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-n>100||i&&window.top!==window&&"input"===a?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),i&&"select"===a||(this.targetElement=null,t.preventDefault()),!1);return i&&!r&&(c=l.fastClickScrollParent,c&&c.fastClickLastScrollTop!==c.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},n.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},n.prototype.onMouse=function(t){"use strict";return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},n.prototype.onClick=function(t){"use strict";var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},n.prototype.destroy=function(){"use strict";var t=this.layer;o&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},n.notNeeded=function(t){"use strict";var e,n;if("undefined"==typeof window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!o)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}return"none"===t.style.msTouchAction?!0:!1},n.attach=function(t,e){"use strict";return new n(t,e)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return n}):"undefined"!=typeof e&&e.exports?(e.exports=n.attach,e.exports.FastClick=n):window.FastClick=n},{}]},{},[1]);