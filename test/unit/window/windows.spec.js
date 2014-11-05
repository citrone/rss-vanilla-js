// test/unit/window/window.spec.js
// Unit tests for the  base Window class
describe('Base Window class', function () {
  'use strict';

  it('should create an empty div when called with no args', function () {

    var theWindow = new WindowBase();
    theWindow.addElement();

    expect(document.getElementsByTagName('div')).not.toBe(null);
  });

  it('should create an ul element if specified so', function () {
    var theWindow = new WindowBase();
    theWindow.addElement('ul');

    expect(document.getElementsByTagName('ul')).not.toBe(null);
  });

  it('should set up the id property if specified', function () {
    var theWindow = new WindowBase();
    theWindow.addElement('div', {id: 'test', class: 'test'});

    expect(document.getElementById('test')).not.toBe(null);
    expect(document.getElementsByClassName('test')).not.toBe(null);
  });
});
