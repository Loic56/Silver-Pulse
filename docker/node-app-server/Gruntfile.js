module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'react']
      },
      dist: {
        files: {
          'js/unpacked/main.js': 'js/src/main.js'
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};