module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'dist/clear-ui.css' : 'sass/clear-ui.scss'
        }
      }
    },
    watch: {
      sass: {
        files: 'sass/{,*/}*.{scss,sass}',
        tasks: ['sass:dist']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
}