// src/app/windows/mainwnd.js
// The main window of the application
function MainWnd () {}

MainWnd.prototype = WindowBase.prototype;

MainWnd.init = function () {
  addElement('div', {id: 'feeds', class: 'feeds'});
  addElement('div', {id: 'content', class: 'content'});
};
