define([
	'backbone',
	'/js/product/model.js',
	'/js/product/collection.js',
	'/js/product/view.js'
], function(Backbone, ProductModel, ProductCollection, ProductView) {

	var products = new ProductCollection();
	return Backbone.View.extend({
		el: '#editProduct',
		events: {},
		initialize: function() {
			products.on('add', this.addOne, this);
			products.on('reset', this.addAll, this);
			products.fetch();
		},
		addOne: function(model) {
			var view = new ProductView({
				model: model
			});
			$('#editProduct').append(view.render().el);
		},
		addAll: function() {

		}
	});
});