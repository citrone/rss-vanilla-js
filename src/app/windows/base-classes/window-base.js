// src/app/windows/base-classes/window-base.js
// Base class for all the windows in the application
var WindowBase = function () {
  'use strict';

  var el = document.getElementById('main-container') ||
           document.getElementsByTagName('body')[0];

  return {
    addElement: function (type, props) {
      if (!type) type = 'div';

      var element = document.createElement(type);

      if (props) {
        for(var prop in props) {
          element[prop] = props[prop];
        }
      }

      el.appendChild(element);
    }
  };
};
