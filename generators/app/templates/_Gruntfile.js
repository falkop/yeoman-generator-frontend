/* global module:true, require:true */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			deploy: ['<%= pkg.project.deploy.cwd %>']
		},

		sass: {
			options: {
				noCache: false,
				cacheLocation: 'development/.sass-cache',
				require: ['sass-globbing']//to import a complete directory 'sass-globbing' is necessary, https://github.com/chriseppstein/sass-globbing
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					dest: '<%= pkg.project.dev.cssCWD %>',
					cwd: '<%= pkg.project.dev.scssCWD %>',
					src: ['*.scss'],
					ext: '.css'
				}]
			},
			deploy: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: [{
					expand: true,
					dest: '<%= pkg.project.deploy.cssCWD %>',
					cwd: '<%= pkg.project.dev.scssCWD %>',
					src: ['*.scss'],
					ext: '.css'
				}]
			}
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer-core')({
						browsers: ''
					})
				]
			},
			dev: {
				options: {
					map: true
				},
				files: [{
					expand: true,
					src: ['<%= pkg.project.dev.cssCWD %>/*.css']
				}]
			},
			deploy: {
				files: [{
					expand: true,
					src: ['<%= pkg.project.deploy.cssCWD %>/*.css']
				}]
			}
		},

		watch: {
			sass: {
				files: '<%= pkg.project.dev.scssCWD %>/**/*.scss',
				tasks: [
					'sass:dev',
					'postcss:dev'
				]
			}
		},

		copy: {
			deploy: {
				files: [{
					expand: true,
					cwd: '<%= pkg.project.dev.cwd %>',
					src: 'index.html',
					dest: '<%= pkg.project.deploy.cwd %>'
				}]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');

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

	/**
	 * run deploy tasks
	 */
	grunt.registerTask('deploy', function() {
		grunt.task.run([
			'clean:deploy',
			'sass:deploy',
			'postcss:deploy',
			'copy:deploy'
		]);
	});

};
