module.exports = function(grunt) {

 // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner:
        '/*\n\n' +
        '<%= pkg.name %> - <%= pkg.version %> - <%= pkg.summary %>\n' +
        '(c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> / <%= pkg.author.url %>\n\n' +
        '*/\n',
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['Justward.js']
      }
    },
     jasmine: {
      src: "Justward.js",
      options: {
        specs: "spec.js",
        vendor: [
          "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
          "jasmine-jquery.js"
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= pkg.name %>.js' ,
        dest: '<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['*.js' , 'index.html' , 'fixture.html'],
        tasks: ['jshint', 'uglify' , 'jasmine'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify' , 'jasmine' , 'watch']);

};