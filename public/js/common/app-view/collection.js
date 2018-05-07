define([
	'backbone',
	'app-model'
], function(
	Backbone,
	model
) {

	return function(obj) {
		var Model = model(obj);
		return Backbone.Collection.extend({
			model: Model,
			url: obj.url
		});
	};
});