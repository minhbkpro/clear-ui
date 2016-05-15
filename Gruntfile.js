module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist_expanded: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/clear-ui.css' : 'sass/clear-ui.scss'
        }
      },
      dist_compressed: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/clear-ui.min.css' : 'sass/clear-ui.scss'
        }
      },
      docs: {
        options: {
          style: 'expanded'
        },
        files: {
          'docs/_site/dist/clear-ui.css' : 'sass/clear-ui.scss'
        }
      }
    },
    csslint: {
      options: {
        important: false,
        'adjoining-classes': false,
        'outline-none': false,
        'fallback-colors': false,
        'box-model': false,
        'unqualified-attributes': false,
      },
      all: ['docs/_site/dist/clear-ui.css']
    },
    jshint: {
      all: ['js/*.js']
    },
    concat: {
      dist: {
        src: [
          'js/*.js'
        ],
        dest: 'dist/clear-ui.js'
      },
      docs: {
        src: [
          'js/*.js'
        ],
        dest: 'docs/_site/dist/clear-ui.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/clear-ui.min.js': ['js/*.js']
        }
      }
    },
    watch: {
      sass: {
        files: 'sass/*.scss',
        tasks: ['sass:docs']
      },
      csslint: {
        files: 'docs/_site/dist/clear-ui.css',
        tasks: ['csslint:all']
      },
      jshint: {
        files: 'js/*.js',
        tasks: ['jshint:all']
      },
      concat: {
        files: 'js/*.js',
        tasks: ['concat:docs']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dist', ['sass:dist_expanded', 'sass:dist_compressed', 'concat:dist', 'uglify:dist']);
};