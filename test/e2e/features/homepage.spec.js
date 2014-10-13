// test/e2e/features/homepage.spec.js
// Tests for the setting application's title
describe('Applications Home Page', function () {

  // make sure the browser is open before each test
  beforeEach(function () {
    browser.driver.get("http://localhost:8000");
  });

  // requirement: title should be "RSS Reader | Plain JS Tutorial"
  it('should have a meaningful title', function () {
    expect(browser.driver.getTitle()).toEqual('RSS Reader | Plain JS Tutorial');
  });

  // requirement: app.js should be loaded
  it('should load the entry point of the JS application, app.js', function() {
    var scriptElement = browser.driver.findElement(By.tagName('script'));
    var appAttribute = scriptElement.getAttribute('src');

    expect(appAttribute).toEqual('http://localhost:8000/app/app.js');
  });

  // layout: a main container with a left menu and a content area
  describe('Main Page Layout', function () {

    // requirement: container is a div with a row class
    it('should have a div container with a row class', function () {
      var container = browser.driver.findElement(By.id('main-container'));
      var theAttribute = container.getAttribute('class');

      expect(theAttribute).toContain('row');
    });
  });
});
