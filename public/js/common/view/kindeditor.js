define(['backbone', 'kindeditor'], function(Backbone) {

	return Backbone.View.extend({
		tagName: 'textarea',
		editor: undefined,
		ops: {},
		initialize: function(options) {
			var _this = this;
			var ops = options || {};

			setTimeout(function() {
				_this.create(ops);
			}, 0);
		},
		html: function() {
			if (arguments[0]) {
				this.editor.html(arguments[0]);
			} else {
				return this.editor.html();
			}
		},
		create: function(ops) {
			this.editor = KindEditor.create(this.el, {
				uploadJson: this.ops.url || '/api/file/upload',
				width: ops.width || 300,
				height: ops.height || 100
			});
			if (undefined !== ops.html) {
				this.editor.html(ops.html);
			}
		},
		events: {},
		render: function() {}
	});
});