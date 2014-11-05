// src/app/windows/base-classes/window-base.js
// Base class for all the windows in the application
var WindowBase = function () {
  'use strict';

  var el = document.getElementById('main-container') ||
           document.getElementsByTagName('body')[0];

  return {
    addElement: function (type, properties) {
      if (!type) type = 'div';

      var element = document.createElement(type);

      if (properties) {
        for(var property in properties) {
          element[property] = properties[property];
        }
      }

      el.appendChild(element);
    }
  };
};
