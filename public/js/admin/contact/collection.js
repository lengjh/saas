define([
	'backbone',
	'/js/admin/banner/model.js'
], function(Backbone, Banner) {

	return Backbone.Collection.extend({
		model: Banner,
		url: '/api/banner'
	});

});