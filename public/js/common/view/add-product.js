define([
	'jquery',
	'underscore',
	'backbone',
	'webutils',
	'/js/common/view/kindEditor.js',
	'/js/common/view/upload.js',
	'/js/common/model/add-product.js',
], function(
	$,
	_,
	Backbone,
	webutils,
	KindEditorView,
	UploadView,
	AppProductModel
) {

	var htmlResult = [
		'<div class="add-product-form-box form-box">',
		'	<div class="form-item">',
		'		<input type="text" name="name" value="<%=name||title%>"/>',
		'	</div>',
		'	<div class="form-item">',
		'		<div data-type="upload"></div>',
		'	</div>',
		'	<div class="form-item">',
		'		<div data-type="textarea"></div>',
		'	</div>',
		'	<div class="form-item">',
		'		<button>添加</button>',
		'	</div>',
		'</div>'
	].join('');
	return Backbone.View.extend({
		tagName: 'div',
		product: undefined,
		template: _.template(htmlResult),
		initialize: function(options) {
			var _this = this;
			var ops = options || {};
			ops.submitBtnText = '添加';
			this.ops = ops;
			this.postUrl = ops.postUrl;
			this.render();
		},
		events: {
			'click button': 'submit'
		},
		submit: function(ops) {
			var _this = this;
			var name = $(_this.el).find('[name="name"]').val();
			var content = _this.kindEditorView.editor.html();
			var imageUrl = $(_this.el).find('[data-type="upload"]').find('img').data('url');
			if (!name || !content || !imageUrl) {
				alert('缺少必要内容');
				return;
			}
			$.ajax({
				url: _this.postUrl,
				type: 'post',
				data: {
					name: name,
					content: content,
					imageUrl: imageUrl
				},
				success: function(res) {
					console.log(res);
					alert('添加成功');
					$(_this.el).find('[name="name"]').val('');
					_this.kindEditorView.editor.html('');
					$(_this.el).find('[data-type="upload"]').find('.webuploader-file-list').html('');
				},
				error: function() {
					alert('添加失败');
				}
			});
		},
		render: function() {
			var obj = {
				title:'',
				name: '',
				content: '',
				imgUrl: ''
			};
			if (this.model) {
				obj = this.model.toJSON();
			}

			this.kindEditorView = new KindEditorView({
				model: this.model
			});
			this.uploadView = new UploadView({
				model: this.model,
				btnText: '上传缩略图'
			});
			$(this.el).html(this.template(obj));
			$(this.el).find('button').html(this.ops.submitBtnText);

			$(this.el).find('[data-type="upload"]').html(this.uploadView.el);
			$(this.el).find('[data-type="textarea"]').html(this.kindEditorView.el);
		}
	});
});