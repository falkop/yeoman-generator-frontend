/**
 * @description here comes your description
 */

/* jshint browser:true, smarttabs:true, eqeqeq:true, strict:false, devel:true, latedef:true, undef:true, unused:false, noempty:false*/
/* global angular:true */

(function() {

	/* @ngInject */
	function directive (dependencies) {
		// Usage:
		//
		// Creates:
		//
		return {
			bindToController: true,
			controller: Controller,
			controllerAs: 'vm',
			link: link,
			restrict: 'A',
			scope: {
			}
		};

		/**
		 * [link description]
		 * @param  {[type]} scope   [description]
		 * @param  {[type]} element [description]
		 * @param  {[type]} attrs   [description]
		 * @return {[type]}         [description]
		 */
		function link(scope, element, attrs) {
		}
	}

	/* @ngInject */
	function Controller () {

	}

	angular
		.module('module')
		.directive('directive', directive);

	directive.$inject = ['dependencies'];
})();