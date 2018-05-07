define([
	'backbone',
], function(Backbone) {

	var Common = Backbone.Model.extend({
		defaults: {
			_id: null,
			imageUrl: {},
			multiple: true
		},
		initialize: function() {

			this.on('invalid', function(model, err) {
				console.warn('Invalid ' + err);
			});
			this.on('error', function(model, err) {
				console.error('Error ' + err);
			});

		},
		validate: function(attrs) {

		}
	});

	return Common;
});