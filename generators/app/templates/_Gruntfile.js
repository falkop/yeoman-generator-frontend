/* global module:true, require:true */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			terminal: {
				src: [
					'<%= pkg.project.dev.jsCWD %>/**/*.js'
				]
			},
			report: {
				options: {
					reporter: require('jshint-html-reporter'),
					reporterOutput: 'style-report/scripts/jshint-report.html'
				},
				src: [
					'<%= pkg.project.dev.jsCWD %>/**/*.js'
				]
			}
		},

		jscs: {
			options: {
				config: '.jscsrc',
				reporter: require('jscs-stylish').path
			},
			terminal: {
				src: [
					'<%= pkg.project.dev.jsCWD %>/**/*.js'
				]
			},
			report: {
				options: {
					reporter: 'node_modules/jscs-html-reporter/jscs-html-reporter.js',
					reporterOutput: 'style-report/scripts/jscs-html-report.html'
				},
				src: [
					'<%= pkg.project.dev.jsCWD %>/**/*.js'
				]
			}
		},

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
				},
				{
					expand: true,
					cwd: '<%= pkg.project.dev.cwd %>/assets',
					dest: '<%= pkg.project.deploy.cwd %>/assets',
					src: '**',
					filter: function(filepath_) {
						//exlude directories and files with an underscore e.g. 'assets/_sample.png'
						//if filepath includes '/_' then don't copy directory
						if(filepath_.match('/_') !== null) {
							return false;
						} else {
							return true;
						}
					}
				}]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//register tasks
	
	/**
	 * check js code via jshint and jscs (JavaScript Code Style)
	 */
	grunt.registerTask('style_check', function() {
		var aTasks = [
			'jshint:terminal',
			'jscs:terminal'
		];
		//using force to run next task if one task abort
		grunt.option('force', true);
		grunt.task.run(aTasks);
	});

	/**
	 * establish style reports
	 */
	grunt.registerTask('style_report', function() {
		var aTasks = [
			'jshint:report',
			'jscs:report'
		];
		//using force to run next task if one task abort
		grunt.option('force', true);
		grunt.task.run(aTasks);
	});
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
