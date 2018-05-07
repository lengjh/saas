define([
	'backbone',
	'/js/common/model/model.js'
], function(Backbone, AdminCommonModel) {

	var Banner = Backbone.Model.extend(
		_.extend({}, AdminCommonModel.prototype)
	);
	return Banner;
});