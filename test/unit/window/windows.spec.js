// test/unit/window/window.spec.js
// Unit tests for the Window class

describe('The MainWnd class properties', function () {
  'use strict';

  it('should have an el property', function () {
    var mainWnd = new MainWnd();
    console.log(mainWnd);
    expect(mainWnd.el).not.toBeNull();
  });
});
