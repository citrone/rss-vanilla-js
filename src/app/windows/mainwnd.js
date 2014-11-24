// src/app/windows/mainwnd.js
// The main window of the application
function MainWnd () {}

MainWnd.prototype = Object.create(new WindowBase());

MainWnd.prototype.init = function () {
  'use strict';

  this.addElement('div', {id: 'feeds', className: 'feeds'});
  this.addElement('div', {id: 'content', className: 'content'});
};
