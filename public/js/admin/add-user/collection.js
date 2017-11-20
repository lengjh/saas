define([
	'backbone',
	'admin-user-model',
], function(Backbone, User) {

	return Backbone.Collection.extend({
		model: User,
		url: '/api/admin/user'
	});

});