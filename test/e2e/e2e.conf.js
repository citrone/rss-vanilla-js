// test/e2e/e2e.conf.js
// The protractor configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  // address of the app
  baseUrl: 'http://localhost:8080',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'phantomjs'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['features/**/*.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
