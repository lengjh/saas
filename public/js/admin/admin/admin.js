define([
	'underscore',
	'backbone',
	'jquery',
	'admin-user-app-view',
	'admin-statistical-app-view'
], function(_, Backbone, $, UserAppView, StatisticalAppView) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			'nav/:type': 'setNav',
			'*actions': 'defaultRroute'
		},
		setNav: function(nav) {
			$('[data-nav]').removeClass('active');
			$('[data-nav="' + nav + '"]').addClass('active');
			this.renderPage(nav);
		},
		navStatus: {},
		renderPage: function(nav) {
			var _this = this;
			if (_this.navStatus[nav]) {
				return;
			}
			_this.navStatus[nav] = true;
			switch (nav) {
				case 'home':
					break;
				case 'user':
					new UserAppView();
					break;
				case 'list':
					break;
				case 'statistical':
					new StatisticalAppView();
					break;
			}

		},
		defaultRroute: function(a, b) {
			console.log(a, b);
		}
	});

	var appRouter = new AppRouter();
	if (!location.hash) {
		location.hash = '#nav/home';
	}
	Backbone.history.start();
});