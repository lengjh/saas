define([
	'backbone',
	'underscore',
	'kindeditor-view',
	'webutils',
	'webuploader',
	'kindeditor',
], function(Backbone, _, KindeditorView, webutils, WebUploader) {
	return function(obj) {

		return Backbone.View.extend({
			tagName: 'tr',
			template: function() {
				return '';
			},
			initialize: function() {
				this.template = _.template(obj.template || '');

				// 每次更新模型后重新渲染  
				this.model.bind('change', this.render, this);
				// 每次删除模型之后自动移除UI  
				this.model.bind('destroy', this.remove, this);
			},
			events: {
				'click .edit-item': 'editing',
				'click .save-item': 'close',
				//"blur input,select,textarea": "close",
				"click .delete-item": "clear"
			},
			createImage: function(url) {
				var width = 100;
				var height = width * 0.618;
				return '<img src="' + url + '" data-url="' + url + '" alt="" style="width:' + width + 'px;height:' + height + 'px;"/>';
			},
			editing: function(ev) {
				var _this = this;
				$(ev.currentTarget).parents('tr').addClass('editing');
				this.editor = KindEditor.create($(this.el).find('textarea'), {
					width: 800,
					height: 400,
					uploadJson: '/api/file/upload',
				});

				_this.uploader = WebUploader.create({
					auto: true,
					// swf文件路径
					swf: obj.swf || '/js/plugins/webuploader/Uploader.swf',

					// 文件接收服务端。
					server: obj.url || '/api/file/upload?originType=WebUploader',

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
					$list.html(_this.createImage(res[0].url));
					_this.uploader.reset();
					_this.values = [];
					$list.find('img').each(function() {
						_this.values.push($(this).data('url'));
					});
				});
				//KindeditorView();
			},
			close: function(ev) {
				var _this = this;
				var obj = {};
				var $parent = $(ev.currentTarget).parents('tr');
				$parent.find('input,select').each(function() {
					obj[$(this).attr('name')] = $(this).val();
				});
				try {
					obj.content = this.editor.html() || '';
				} catch (ev) {}
				obj.id = $(ev.currentTarget).data('id');
				obj.imageUrl = $parent.find('.webuploader-file-list img').data('url');
				console.log('obj',obj);
				this.model.save(obj, {
					type: 'PUT'
				});
				$parent.removeClass('editing');
				KindEditor.remove($(this.el).find('textarea'));
				this.uploader.destroy();
			},
			remove: function() {
				$(this.el).remove();
			},
			clear: function(ev) {
				if (confirm('确定要删除吗？')) {
					this.model.set({
						id: $(ev.currentTarget).data('id')
					});
					this.model.destroy({
						success: function(model, response) {
							//console.log(response);
						},
						error: function(model, error) {
							console.log(model, error);
						}
					});
				}
			},
			render: function() {

				this.model.set({
					'afterContent': webutils.slice(webutils.trimHtml(this.model.get('content')), 100)
				});
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		})
	};
});