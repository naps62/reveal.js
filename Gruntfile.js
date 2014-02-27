/* global module:false */
module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      main: {
        files: {
          'reveal/css/theme/default.css': 'reveal/css/theme/source/default.scss',
          'reveal/css/theme/beige.css': 'reveal/css/theme/source/beige.scss',
          'reveal/css/theme/night.css': 'reveal/css/theme/source/night.scss',
          'reveal/css/theme/serif.css': 'reveal/css/theme/source/serif.scss',
          'reveal/css/theme/simple.css': 'reveal/css/theme/source/simple.scss',
          'reveal/css/theme/sky.css': 'reveal/css/theme/source/sky.scss',
          'reveal/css/theme/moon.css': 'reveal/css/theme/source/moon.scss',
          'reveal/css/theme/solarized.css': 'reveal/css/theme/source/solarized.scss'
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'reveal/css',
          environment: 'production'
        }
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false
        }
      },
      files: [ 'Gruntfile.js', 'reveal/js/reveal.js' ]
    },

    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },

    slim: {
      dist: {
        files: [{
          expand: true,
          cwd: 'slim',
          src: ['{,*/}*.slim'],
          dest: 'reveal',
          ext: '.html'
        }]
      }
    },

    watch: {
      main: {
        files: [ 'Gruntfile.js', 'reveal/js/reveal.js', 'reveal/css/reveal.css' ],
        tasks: 'default'
      },
      theme: {
        files: [ 'reveal/css/theme/source/*.scss', 'reveal/css/theme/template/*.scss' ],
        tasks: 'themes'
      },
      compass: {
        files: [ 'sass/[^_]*.sass' ],
        tasks: 'compass'
      },
      slim: {
        files: [ 'slim/[^_]*.slim' ],
        tasks: 'slim'
      }
    }

  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-compass' );
  grunt.loadNpmTasks( 'grunt-slim' );

  // Theme task
  grunt.registerTask( 'themes', [ 'sass' ] );

  // Serve presentation locally
  grunt.registerTask( 'default', [ 'connect', 'watch' ] );
};
