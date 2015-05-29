/**
 * @description here comes your description
 */

/* jshint browser:true, smarttabs:true, eqeqeq:true, strict:false, devel:true, latedef:true, undef:true, unused:false, noempty:false*/
/* global angular:true */

(function() {

	/* @ngInject */
	function Factory(dependencies) {
		var service = {
			func: func
		};
		return service;

		/**
		 * [func description]
		 */
		function func() {
		}
	}

	angular
		.module('module')
		.factory('Factory', Factory);

	Factory.$inject = ['dependencies'];
	
})();