// Gruntfile.js
// The configuration file for grunt task runner.
module.exports = function (grunt) {

  // task configuration
  grunt.initConfig({
    protractor: {
      options: {
        keepAlive: true,
        noColor: false
      },
      run: {},
      all: {
        options: {
          configFile: "test/e2e/e2e.conf.js",
          args: {}
        }
      },
      protractor_webdriver: {
        run: {}
      }
    },

    karma: {
      unit: {
        options: {
          files: ['src/index.html', 'test/unit/**/*', 'src/app/**/*'],
          frameworks: ['jasmine']
        },
        singleRun: true,
        browsers: ['PhantomJS'],
        hostname: process.env.IP,
        port: process.env.PORT,
        runnerPort: 0,
        reporters: 'dots',
        logLevel: 'ERROR'
      }
    }
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-karma');

  // local tasks
  grunt.registerTask('e2e', ['protractor:all']);
  grunt.registerTask('unit', ['karma']);
  grunt.registerTask('test',['e2e', 'unit']);
  grunt.registerTask('default', ['test']);
};
