define(['backbone', 'kindeditor'], function(Backbone) {
	return Backbone.View.extend({
		tagName: 'textarea',
		editor: undefined,
		initialize: function(options) {
			var _this = this;
			var ops = options || {};
			setTimeout(function() {
				_this.create(ops);
			}, 0);
		},
		create: function(ops) {
			this.editor = KindEditor.create(this.el, {
				uploadJson: '/api/file/upload',
				width: ops.width,
				height: ops.height
			});
		},
		events: {},
		render: function() {}
	});
});