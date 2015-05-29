'use strict';
var yeoman = require('yeoman-generator'),
	chalk = require('chalk'),
	yosay = require('yosay');

var Base = yeoman.generators.Base.extend({
	setProp: function(sKeyName_, value_) {
		if (this.props === undefined) {
			this.props = {};
		}

		this.props[sKeyName_] = value_;
		this.log(this.props);
	},
	getProp: function(sKeyName_) {
		if (this.props !== undefined) {
			return this.props[sKeyName_];
		} else {
			return {};
		}
	},
	copyTpl: function(oFiles_) {
		for (var oFile in oFiles_) {
			this.fs.copyTpl(
				this.templatePath(oFiles_[oFile].template),
				this.destinationPath(oFiles_[oFile].dest),
				oFiles_[oFile].config
			);
		}
	}
});

module.exports = Base.extend({
	/**
	 * Your initialization methods (checking current project state, getting configs, etc)
	 */
	initializing: function() {},
	/**
	 * Where you prompt users for options (where you'd call this.prompt())
	 */
	prompting: function() {
		var done = this.async();

		this.prompt({
			type: 'input',
			name: 'appname',
			default: 'appname',
			message: 'What\'s the name of the app?'
		}, function(arguments_) {
			this.setProp('appname', arguments_.appname);
			done();
		}.bind(this));
	},
	/**
	 * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
	 */
	configuring: function() {},
	/**
	 * Where you write the generator specific files (routes, controllers, etc)
	 */
	writing: function() {
		var oFiles = {
			index: {
				template: 'development/index.html',
				dest: 'development/index.html',
				config: {
					appname: this.getProp('appname')
				}
			},
			bowerrc: {
				template: '_.bowerrc',
				dest: '.bowerrc'
			},
			gitignore: {
				template: '_.gitignore',
				dest: '.gitignore'
			},
			jshintrc: {
				template: '_jshintrc',
				dest: 'jshintrc'
			},
			pkgjson: {
				template: '_package.json',
				dest: 'package.json',
				config: {
					appname: this.getProp('appname')
				}
			},
			grunt: {
				template: '_Gruntfile.js',
				dest: 'Gruntfile.js',
				config: {
					pkg: {
						project: {
							dev: {
								cwd: '<%= pkg.project.dev.cwd %>',
								cssCWD: '<%= pkg.project.dev.cssCWD %>',
								scssCWD: '<%= pkg.project.dev.scssCWD %>'
							},
							deploy: {
								cwd: '<%= pkg.project.deploy.cwd %>',
								cssCWD: '<%= pkg.project.deploy.cssCWD %>'
							}
						}
					}
				}
			},
			readme: {
				template: '_README.md',
				dest: 'README.md'
			}
		};
		this.copyTpl(oFiles);

		//copy whole style structure
		this.directory('development/styles', 'development/styles');
	},
	/**
	 * Where conflicts are handled (used internally)
	 */
	conflicts: function() {

	},
	/**
	 * Where installation are run (npm, bower)
	 */
	install: function() {
		this.npmInstall(
			[
				'autoprefixer-core',
				'grunt',
				'grunt-contrib-clean',
				'grunt-contrib-watch',
				'grunt-postcss',
				'grunt-contrib-sass',
				'grunt-contrib-copy'
			], {
				'saveDev': true
			}
		);
	},
	/**
	 *  Called last, cleanup, say good bye, etc
	 */
	end: function() {}
});