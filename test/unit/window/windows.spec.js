// test/unit/window/window.spec.js
// Unit tests for the Window class
'use strict';

describe('The MainWnd class properties', function () {
  it('should have an el property', function () {
    var mainWnd = MainWnd();
    console.log(mainWnd);
    expect(mainWnd.el).not.toBeNull();
  });
});
