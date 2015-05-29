/**
 * @description here comes your description
 */

/* jshint browser:true, smarttabs:true, eqeqeq:true, strict:false, devel:true, latedef:true, undef:true, unused:false, noempty:false*/
/* global angular:true */

(function() {

	/* @ngInject */
	function Ctrl(dependencies) {
		var vm = this;
		vm.title = 'Ctrl';

		/**
		 * [activate description]
		 */
		function activate() {
		}

		activate();
	}

	angular
		.module('module')
		.controller('Ctrl', Ctrl);

	Ctrl.$inject = ['dependencies'];
})();