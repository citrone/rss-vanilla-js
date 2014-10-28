// test/unit/window/window.spec.js
// Unit tests for the Window class
'use strict';

describe('The MainWnd class properties', function () {
  var mainWnd;
  beforeEach(function (done) {
    window.onload =  function () {
      mainWnd = new MainWnd();
      done();
    };
  });

  it('should have an el property', function () {
    console.log(mainWnd);
    expect(mainWnd.el).not.toBeNull();
  });
});
