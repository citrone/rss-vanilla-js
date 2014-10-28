// src/app/windows/mainwnd.js
// The main window of the application
'use strict';

function MainWnd () {
  var el = document.getElementById('main-container') || 'body';

  function theLayout() {
    var feeds = document.createElement("div");
    feeds.id = 'feeds';
    feeds.className = 'feeds';
    el.appendChild(feeds);
  };

  return {
    el: el,
    createLayout: theLayout
  };
};
