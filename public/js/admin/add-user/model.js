define([
	'backbone',
	'admin-common-model'
], function(Backbone, AdminCommonModel) {
	var User = Backbone.Model.extend(
		_.extend({}, AdminCommonModel.prototype)
	);
	return User;
});