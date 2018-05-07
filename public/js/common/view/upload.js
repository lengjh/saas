define([
	'underscore',
	'backbone',
	'webuploader'
], function(_, Backbone, WebUploader) {

	return Backbone.View.extend({
		tagName: 'div',
		uploader: undefined,
		template: _.template('<div class="webuploader-file-list"></div><div class="webuploader-file"><%=btnText%></div>'),
		initialize: function(options) {
			var _this = this;
			_this.ops = options || {};

			var imgs = [];
			var btnText = _this.ops.btnText || '上传文件';
			$(_this.el).html(_this.template({
				btnText: btnText
			}));
			_this.values = _this.ops.values || [];
			$.each(_this.values, function(index, item) {
				imgs.push(_this.createImage(item));
			});
			$(_this.el).find('.webuploader-file-list').html(imgs.join(''));
			_this.create(_this.ops);
		},
		events: {},
		values: [],
		html: function() {

		},
		createImage: function(url) {
			var width = this.ops.width || 100;
			var height = this.ops.height || width * 0.618;
			return '<img src="' + url + '" data-url="' + url + '" alt="" style="width:' + width + 'px;height:' + height + 'px;"/>';
		},
		create: function(ops) {
			var _this = this;
			var multiple = this.ops.multiple === false ? false : true;

			_this.uploader = WebUploader.create({
				auto: true,
				// swf文件路径
				swf: _this.ops.swf || '/js/plugins/webuploader/Uploader.swf',

				// 文件接收服务端。
				server: _this.ops.url || '/api/file/upload?originType=WebUploader',

				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: $(_this.el).find('.webuploader-file'),
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,bmp,png',
					mimeTypes: 'image/*'
				},
				// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				resize: false
			});
			_this.uploader.on('uploadSuccess', function(file, res) {
				var $list = $(_this.el).find('.webuploader-file-list');
				if (multiple) {
					$list.append(_this.createImage(res[0].url))
				} else {
					$list.html(_this.createImage(res[0].url));
				}
				_this.uploader.reset();
				_this.values = [];
				$list.find('img').each(function() {
					_this.values.push($(this).data('url'));
				});
			});
		},
		render: function() {
			return this;
		}
	});
});