/* global module:true, require:true */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				noCache: false,
				cacheLocation: 'development/.sass-cache'
			},
			dev: {
				options: {
					require: ['sass-globbing']
				},
				files: [{
					expand: true,
					dest: '<%= pkg.project.cssCWD %>',
					cwd: '<%= pkg.project.scssCWD %>',
					src: ['*.scss'],
					ext: '.css'
				}]
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({
						browsers: 'last 20 versions'
					}),
					require('csswring').postcss
				]
			},
			dev: {
				files: [{
					expand: true,
					src: ['<%= pkg.project.cssCWD %>/*.css']
				}]
			}
		},

		watch: {
			sass: {
				files: '<%= pkg.project.scssCWD %>/**/*.scss',
				tasks: [
					'sass:dev',
					'postcss:dev'
				]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');

	//register tasks
	/**
	 * compile sass one time
	 */
	grunt.registerTask('sass_compile', function() {
		grunt.task.run([
			'sass:dev',
			'postcss:dev'
		]);
	});

	/**
	 * start watch task to compile sass files on change
	 */
	grunt.registerTask('sass_watch', function() {
		//compile sass and then start watch task
		grunt.task.run([
			'sass:dev',
			'watch:sass'
		]);
	});

};
