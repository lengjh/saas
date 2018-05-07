define([
	'backbone',
], function(Backbone) {

	var Common = Backbone.Model.extend({
		defaults: {
			name: '',
			title: '',
			content: '',
			imgUrl: '',
			imgsUrl: [],
			createDate: ''
		},
		initialize: function() {

			this.on('invalid', function(model, err) {
				console.warn('Invalid ' + err);
			});
			this.on('error', function(model, err) {
				console.error('Error ' + err);
			});

		},
		validate: function(attrs) {

			// for (var key in attrs) {
			// 	if (attrs[key] === '' && ['headImgUrl'].indexOf('headImgUrl') === -1) {
			// 		return key + ' 不合法';
			// 	}

			// 	if ('message' in attrs) {
			// 		return attrs.message || '未知错误';
			// 	}
			// }
		}
	});

	return Common;
});