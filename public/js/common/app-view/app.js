define([
	'/js/common/app-view/app-view.js'
], function(appView) {
	return function(options) {
		var App = appView(options);
		return new App();
	};
});