define([
	'underscore',
	'backbone',
	'webuploader'
], function(_, Backbone, WebUploader) {

	return Backbone.View.extend({
		tagName: 'div',
		uploader: undefined,
		template: _.template('<div class="webuploader-file-list"></div><div class="webuploader-file">上传文件</div>'),
		initialize: function(options) {
			var _this = this;
			var ops = options || {};
			$(this.el).html(this.template());
			$(this.el).find('.webuploader-file').html(ops.btnText || '');
			setTimeout(function() {
				_this.create(ops);
			}, 0);
		},
		events: {},
		create: function(ops) {
			var _this = this;
			var multiple = ops.multiple || true;
			this.uploader = WebUploader.create({
				auto: true,
				// swf文件路径
				//swf: BASE_URL + '/js/Uploader.swf',

				// 文件接收服务端。
				server: ops.url || '/api/file/upload?originType=WebUploader',

				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: $(this.el).find('.webuploader-file'),
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,bmp,png',
					mimeTypes: 'image/*'
				},

				// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				resize: false
			});
			this.uploader.on('uploadSuccess', function(file, res) {
				if (multiple) {
					$(_this.el).find('.webuploader-file-list').append('<img src="' + res[0].url + '" data-url="' + res[0].url + '" alt="" />')
				} else {
					$(_this.el).find('.webuploader-file-list').html('<img src="' + res[0].url + '" data-url="' + res[0].url + '" alt="" />')
				}

			});
		},
		render: function() {}
	});
});