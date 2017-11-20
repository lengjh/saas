define([
	'jquery',
	'underscore',
	'backbone',
	'admin-statistical-model',
	'admin-statistical-collection',
	'admin-statistical-view'
], function($, _, Backbone, Statistical, StatisticalList, StatisticalView) {

	var statisticals = new StatisticalList();

	var AppView = Backbone.View.extend({
		el: '#appStatistical',
		events: {},
		initialize: function() {
			statisticals.on('add', this.addOne, this);
			statisticals.on('reset', this.addAll, this);
			statisticals.fetch();
		},
		addOne: function(statistical) {
			statistical.set({
				'eid': statistical.get('_id') || statisticals.length
			});
			var view = new StatisticalView({
				model: statistical
			});
			$('#appStatistical tbody').append(view.render().el);
		},
		addAll: function() {
			statisticals.each(this.addOne);
		}
	});

	return AppView;
});