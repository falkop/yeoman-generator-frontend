/**
 * @description here comes your description
 */

/* global jQuery:true, $:true, angular:true */

'use strict';

(function() {

	/* @ngInject */
	function directiveTEMPLATE (dependencies) {
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
			controller: Controller,
			controllerAs: 'vm',
			link: link,
			restrict: 'EA',
			scope: {
			}
		};
	}

	/* @ngInject */
	function Controller () {

	}

	angular
		.module('moduleTEMPLATE')
		.directive('directiveTEMPLATE', directiveTEMPLATE);

	directiveTEMPLATE.$inject = ['dependencies'];
})();
