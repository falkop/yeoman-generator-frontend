/**
 * @description here comes your description
 */

/* global jQuery:true, $:true, angular:true */

'use strict';

(function() {

	/* @ngInject */
	function templateDirective (dependencies) {
		/**
		 * function to modify the DOM
		 * @param  {Object}    Angular scope object
		 * @param  {Object}  is the jqLite-wrapped element that this directive matches
		 * @param  {Object} attrs_    myCurrentTime
		 */
		function link($scope_, $element_, oAttrs_) {
		}

		return {
			bindToController: true,
			controller: templateController,
			controllerAs: 'vm',
			link: link,
			restrict: 'EA',
			scope: {
			}
		};
	}

	/* @ngInject */
	function templateController (dependencies) {
		var vm = this;

		/**
 		 * [initialize description]
		 */
		function _initialize() {

		}

		_initialize();
	}

	angular
		.module('moduleTEMPLATE')
		.directive('templateDirective', templateDirective);

	templateDirective.$inject = ['dependencies'];
	templateController.$inject = ['dependencies'];
})();