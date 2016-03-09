module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-webpack');

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
    },
    webpack: {
      main: {
        entry: './js/unpacked/main.js',
        output: {
          path: 'js/packed/',
          filename: 'main.js'
        },
        stats: {
          colors: false,
          modules: true,
          reasons: true
        },
        storeStatsTo: 'xyz',
        progress: false,
        failOnError: true,
        watch: false,
        keepalive: false,
        inline: false,
        hot: false
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['babel', 'webpack']);

};