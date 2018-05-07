define([
	'backbone',
	'/js/admin/tag/model.js'
], function(Backbone, Banner) {

	return Backbone.Collection.extend({
		model: Banner,
		url: '/api/tag'
	});

});