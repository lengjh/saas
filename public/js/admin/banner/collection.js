define([
	'backbone',
	'/js/admin/news/model.js'
], function(Backbone, Banner) {

	return Backbone.Collection.extend({
		model: Banner,
		url: '/api/news'
	});

});