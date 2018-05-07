require([
	'jquery',
	'layer',
	'upload-view',
	'kindeditor-view',
	'app',
	'jquery-plugins'
], function($,
	layer,
	UploadView,
	KindeditorView,
	App) {

	App({
		el: $('#xcxApp'),
		//validates: ['imageUrl', 'link'],
		url: '/api/weixin/xcx-list',
		addTemplate: '' +
			'<td data-id="<%=_id%>"><span class="display"></span><input class="form-input" type="text" name="name" value="" data-id="<%=_id%>"/></td>' +
			'<td><textarea name="content" id="" cols="30" rows="10"></textarea></td>' +
			'<td><span class="img"></span></td>' +
			'<td><span class="add-item m-r-10 btn-1 btn-small">添加</span></td>',
		template: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td data-id="<%=_id%>"><span class="display"><%=content%></span><textarea class="form-input" name="content" id="" cols="30" rows="10" data-id="<%=_id%>"><%=content%></textarea></td>' +
			'<td data-id="<%=_id%>"><span class="display"><img src="<%=imageUrl%>" alt="图片" width="100" height="50" name="imageUrl"/></span><span class="webuploader-file-list"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file">上传图片</span></td>' +
			'<td><span class="edit-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">编辑</span><div class="save-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">保存</div><span class="delete-item  btn-2 btn-small" data-id="<%=_id%>">删除</span></td>'
	});

});