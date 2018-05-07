require(['jquery',
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
	//banner
	App({
		el: $('#caseApp'),
		validates: ['name', 'imageUrl', 'content'],
		url: '/api/admin/item',
		addTemplate: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="img"></span></td>' +
			'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
			'<td><span class="add-item m-r-10 btn-1 btn-small">添加</span></td>',
		template: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="display"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file-list"><img src="<%=imageUrl%>" data-url="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file">上传图片</span></td>' +
			'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
			'<td><span class="edit-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">编辑</span><div class="save-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">保存</div><span class="delete-item  btn-2 btn-small" data-id="<%=_id%>">删除</span></td>'
	});

});