define([
	'backbone',
	'/js/product/model.js'
], function(Backbone, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: '/api/product'
	});
});