/**
 * @description here comes your description
 */

/* global jQuery:true, $:true, angular:true */

'use strict';

(function() {

	/* @ngInject */
	function templateController(dependencies) {

		var vm = this;

		vm.title = 'templateController';

		/**
		 * [initialize description]
		 */
		function initialize() {
		}

		initialize();
	}

	angular
		.module('module')
		.controller('templateController', templateController);

	templateController.$inject = ['dependencies'];
})();
