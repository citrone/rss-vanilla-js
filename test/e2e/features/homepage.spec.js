// test/e2e/features/homepage.spec.js
// Tests for the setting application's title
describe('Applications Home Page', function () {
  'use strict';

  // make sure the browser is open before each test
  beforeEach(function () {
    browser.driver.get("http://localhost:8000");
  });

  // requirement: title should be "RSS Reader | Plain JS Tutorial"
  it('should have a meaningful title', function () {
    expect(browser.driver.getTitle()).toEqual('RSS Reader | Plain JS Tutorial');
  });

  // layout: a main container with a left menu and a content area
  describe('Main Page Layout', function () {

    beforeEach(function () {
      browser.driver.get("http://localhost:8000");
    });

    // requirement: container is a div with a row class
    it('should have a div container with a row class', function () {
      var container = browser.driver.findElement(By.id('main-container'));
      var theAttribute = container.getAttribute('class');

      expect(theAttribute).toContain('row');
    });

    // requirement: container should have a feeds div
    it('should have a feeds div', function () {
      var theDiv = browser.driver.findElement({id: 'feeds'})
        .then(function (el) {
          var theAttribute = el.getAttribute('class')
            .then(function (attrName) {
              expect(attrName).toBe('feeds');
            });
        });
    });

    // requirement: container should have a content div
    it('should have a content div', function () {
      var theDiv = browser.driver.findElement({id: 'content'})
        .then(function (el) {
          var theAttribute = el.getAttribute('class')
            .then(function(attrName) {
              expect(attrName).toBe('content');
            });
        });
    });

  }); // end Main Page Layout

}); // end Applications Home Page
