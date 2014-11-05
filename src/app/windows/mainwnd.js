// src/app/windows/mainwnd.js
// The main window of the application

function MainWnd () {
  'use strict';

  var el = document.getElementById('main-container') || 'body';

  return {
    init: function () {
      var mainWnd = new WindowBase();

      mainWnd.addElement('div', {id: 'feeds', class: 'feeds'});
      mainWnd.addElement('div', {id: 'content', class: 'content'});
    }
  };
}
