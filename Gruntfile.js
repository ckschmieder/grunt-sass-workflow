module.exports = function(grunt) {
  grunt.initConfig({

    concat : {
      options: {
        separator: '\n\n//------------------------------------------\n',
        banner: '\n\n//------------------------------------------\n'
      },
      dist : {
        src: ['components/scripts/*.js'],
        dest: 'builds/development/js/script.js'
      }
    }, //concat

    bower_concat: {
      all: {
        dest: 'components/scripts/_bower.js',
        cssDest: 'components/sass/partials/_bower.scss'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files : [{
          src: 'components/scss/main.scss',
          dest: 'builds/development/css/style.css'
        }]
      },
      prod: {
        options: {
          style: 'expanded'
        },
        files : [{
          src: 'components/sass/style.scss',
          dest: 'builds/production/css/style.css'
        }]
      }
    }, //sass

    autoprefixer: {
      multiple_files: {
        src: "builds/development/css/style.css"
      }
    }, //autoprefixer

    uglify: {
      theme: {
        options: {
          preserveComments: "some"
        },
        files  : {

          "builds/development/js/script.min.js": [
            "components/scripts/_bower.js",            
            "components/scripts/script.js"           
          ]
        }
      }
    }, //uglify

    // wiredep: {
    //   task: {
    //     src: 'builds/development/**/*.html'
    //   }
    // },

    // connect: {
    //   sever: {
    //     options: {
    //       hostname: 'localhost',
    //       port: 3000,
    //       base: 'builds/development/',
    //       livereload: true
    //     }
    //   }
    // },

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['components/scripts/**/*.js',
        'components/sass/**/*.scss'],
        tasks: ['concat', 'sass']
      }
    }


  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['bower_concat', 'concat', 'sass:dist', 'watch']);

}; //wrapper function