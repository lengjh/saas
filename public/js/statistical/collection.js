define([
	'backbone',
	'admin-statistical-model',
], function(Backbone, Statistical) {

	return Backbone.Collection.extend({
		model: Statistical,
		url: '/api/statistical'
	});

});