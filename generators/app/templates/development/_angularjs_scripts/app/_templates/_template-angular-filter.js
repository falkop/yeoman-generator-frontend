/**
 * @description here comes your description
 */

/* jshint browser:true, smarttabs:true, eqeqeq:true, strict:false, devel:true, latedef:true, undef:true, unused:false, noempty:false*/
/* global angular:true */

(function() {

	function filter() {
		function filterFilter(params) {
			return params;
		}

		return filterFilter;
	}

	angular
		.module('module')
		.filter('filter', filter);

})();