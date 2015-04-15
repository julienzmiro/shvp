(function () {

  function init () {
    var i;
    var v = document.getElementsByClassName("shvp");

    addEvent(window, 'unload', EventCache.flush);

    for (i = 0; i < v.length; ++i) {
      addEvent(v[i], 'click', vClickHandler);
    }

    createOverlays(v);
  }

  function vClickHandler (e) {
    var el = this;
    var video = el.getElementsByTagName("VIDEO")[0];
    var overlay = el.getElementsByClassName("shvpOverlay")[0];
    var playIco = overlay.getElementsByClassName("shvpPlayIco")[0];

    if (video.paused) {
      playIco.style.opacity = 0;
      overlay.style.opacity = 0;
      video.play();
    } else {
      playIco.style.opacity = 1;
      overlay.style.opacity = 1;
      video.pause();
    }
  }

  function createOverlays (videosToCreate) {
    var i;

    for (i = 0; i < videosToCreate.length; ++i) {
      var overlay = document.createElement("DIV");
      overlay.className = "shvpOverlay";
      overlay.style.height = videosToCreate[i].getElementsByTagName("VIDEO")[0].offsetHeight + "px";
      overlay.style.width = videosToCreate[i].getElementsByTagName("VIDEO")[0].offsetWidth + "px";

      var svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgEl.width = 72;
      svgEl.height = 72;
      svgEl.setAttribute("width", "72");
      svgEl.setAttribute("height", "72");
      svgEl.setAttribute("viewBox", "0 0 72 72");
      svgEl.setAttribute("version", "1.1");
      svgEl.setAttribute("xlmns", "http://www.w3.org/2000/svg");
      svgEl.setAttribute("class", "shvpPlayIco");
      overlay.appendChild(svgEl);

      var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("fill", "#333333");
      pathEl.setAttribute("d", "M36,0 C16.1172,0 0,16.1172 0,36 C0,55.8828 16.1172,72 36,72 C55.8828,72 72,55.8828 72,36 C72,16.1172 55.8828,0 36,0 L36,0 L36,0 Z M31.25,22 L48.75,36 L31.25,50 L31.25,22 L31.25,22 Z");
      svgEl.appendChild(pathEl);

      videosToCreate[i].appendChild(overlay);
    }
  }

  // Rock solid add event method by Dustin Diaz (http://dustindiaz.com/rock-solid-addevent)
  function addEvent (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener( type, fn, false );
      EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
      obj.attachEvent( "on"+type, obj[type+fn] );
      EventCache.add(obj, type, fn);
    }
    else {
      obj["on"+type] = obj["e"+type+fn];
    }
  }
  var EventCache = function () {
    var listEvents = [];
    return {
      listEvents : listEvents,
      add : function(node, sEventName, fHandler){
        listEvents.push(arguments);
      },
      flush : function(){
        var i, item;
        for(i = listEvents.length - 1; i >= 0; i = i - 1){
          item = listEvents[i];
          if(item[0].removeEventListener){
            item[0].removeEventListener(item[1], item[2], item[3]);
          };
          if(item[1].substring(0, 2) != "on"){
            item[1] = "on" + item[1];
          };
          if(item[0].detachEvent){
            item[0].detachEvent(item[1], item[2]);
          };
          item[0][item[1]] = null;
        };
      }
    };
  }();


  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      init();
      clearInterval(readyStateCheckInterval);
    }
  }, 10);
})();
