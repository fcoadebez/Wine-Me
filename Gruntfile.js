module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		dirs: {
			srcPath: 'src',
			destPath: 'dist',
			srcCssPath: '<%= dirs.srcPath %>/css',
          srcLessPath: '<%= dirs.srcPath %>/less',
          destCssPath: '<%= dirs.destPath %>/css',
          srcJsPath: '<%= dirs.srcPath %>/js',
          destJsPath: '<%= dirs.destPath %>/js'
      },

      less: {
        development: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            files: [{
                src: [
                '<%= dirs.srcLessPath %>/main.less',
                '<%= dirs.srcLessPath %>/vertical.less',
                '<%= dirs.srcLessPath %>/contact.less',
                '<%= dirs.srcLessPath %>/esprit.less',
                '<%= dirs.srcLessPath %>/gamme-detail.less',
                '<%= dirs.srcLessPath %>/gammes.less',
                '<%= dirs.srcLessPath %>/questions.less',
                '<%= dirs.srcLessPath %>/question-detail.less',
                '<%= dirs.srcLessPath %>/recettes.less',
                '<%= dirs.srcLessPath %>/recette-detail.less',
                '<%= dirs.srcLessPath %>/trio-bienfaits.less',
                ],
                dest: '<%= dirs.srcCssPath %>/',
                expand: true,
                rename: function(dest, src) {
                    return dest + src.match(/\/([^/]*)$/)[1].replace('.less', '.css');
                }
            }]
        }
    },

    autoprefixer: {
        options: {
            browsers: ['last 2 versions', 'Explorer 9', 'Android 2.3']
        },
        dist: {
            expand: true,
            flatten: true,
            cwd: '<%= dirs.srcCssPath %>/',
            src: ["*.css"],
            dest: '<%= dirs.srcCssPath %>/'
        }
    },

    concat: {
        css: {
            src: [
            '<%= dirs.srcCssPath %>/*.css'
            ],
            dest: '<%= dirs.destCssPath %>/main.css'
        }
    },

    uglify: {
        base: {
            files: {
                '<%= dirs.destJsPath %>/main.js': [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/aos/dist/aos.js',
                '<%= dirs.srcJsPath %>/main.js',
                '<%= dirs.srcJsPath %>/animation.js'
                ]
            }
        },
        resources: {
            files: {
                '<%= dirs.destJsPath %>/resources.js': [
                ]
            }
        },
        options: {
            mangle: false
        }
    },

    watch: {
     less: {
        files: '<%= dirs.srcLessPath %>/*.less',
        tasks: [ 'less', 'autoprefixer', 'concat' ]
    },
    uglify: {
        files: '<%= dirs.srcJsPath %>/*.js',
        tasks: [ 'uglify:base' ]
    }
}

});

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);

};
