// src/app/windows/mainwnd.js
// The main window of the application

function MainWnd () {
  'use strict';

  var el = document.getElementById('main-container') || 'body';

  function createFeedsDiv() {
    var feeds = document.createElement("div");

    feeds.id = 'feeds';
    feeds.className = 'feeds';
    el.appendChild(feeds);
  }

  function createContentDiv() {
    var content = document.createElement("div");

    content.id='content';
    content.className = 'content';
    el.appendChild(content);
  }

  function theLayout() {
    createFeedsDiv();
    createContentDiv();
  }

  return {
    el: el,
    createLayout: theLayout
  };
}
