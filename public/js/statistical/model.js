define([
	'backbone',
	'admin-common-model',
], function(Backbone, AdminCommonModel) {

	var Statistical = Backbone.Model.extend(
		_.extend({
		 
		}, AdminCommonModel.prototype)
	);

	return AdminCommonModel;
});