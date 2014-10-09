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
    }
  });

  // npm tasks
  grunt.loadNpmTasks('grunt-protractor-runner');

  // local tasks
  grunt.registerTask('e2e', ['protractor:all']);
  grunt.registerTask('test',['e2e']);
  grunt.registerTask('default', ['test']);
};
