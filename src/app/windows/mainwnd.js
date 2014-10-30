// src/app/windows/mainwnd.js
// The main window of the application

function MainWnd () {
  'use strict';

  var el = document.getElementById('main-container') || 'body';

  var createFeedsDiv = function () {
    var feeds = document.createElement("div");

    feeds.id = 'feeds';
    feeds.className = 'feeds';
    el.appendChild(feeds);
  };

  var createContentDiv = function () {
    var content = document.createElement("div");

    content.id = 'content';
    content.className = 'content';
    el.appendChild(content);
  };

  return {
    createLayout: function () {
      createFeedsDiv();
      createContentDiv();
    }
  };
}
