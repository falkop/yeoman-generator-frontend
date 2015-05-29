/**
 * @description here comes your description
 */

/* jshint browser:true, smarttabs:true, eqeqeq:true, strict:false, devel:true, latedef:true, undef:true, unused:false, noempty:false*/
/* global angular:true */

(function() {

	/* @ngInject */
	function Service(dependencies) {

		function func() {
		}

		this.func = func;
	}

	angular
		.module('module')
		.service('Service', Service);

	Service.$inject = ['dependencies'];
})();