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
      all: {
        options: {
          configFile: "test/e2e/e2e.conf.js",
          args: {}
        }
      }
    },

    karma: {
      unit: {
        options: {
          files: ['test/unit/**/*'],
          frameworks: ['jasmine']
        },
        browsers: ['PhantomJS']
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
