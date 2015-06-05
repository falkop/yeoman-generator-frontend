/**
 * @description here comes your description
 */

/* global jQuery:true, $:true, angular:true */

'use strict';

(function() {

	/* @ngInject */
	function factoryTEMPLATE(dependencies) {

		/**
		 * [func description]
		 * @return {[type]} [description]
		 */
		function func() {
		}

		return {
			func: func
		};
	}

	angular
		.module('module')
		.factory('factoryTEMPLATE', factoryTEMPLATE);

	factoryTEMPLATE.$inject = ['dependencies'];
	
})();
