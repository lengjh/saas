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
	App({
		el: $('#tagApp'),
		validates: ['name', 'link'],
		url: '/api/admin/tag',
		addTemplate: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="display"></span><input type="text" class="form-input" name="link" value=""/></td>' +
			'<td><span class="add-item m-r-10 btn-1 btn-small">添加</span></td>',
		template: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="display"><%=link%></span><input type="text" class="form-input" name="link" value="<%=link%>"/></td>' +
			'<td><span class="edit-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">编辑</span><div class="save-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">保存</div><span class="delete-item  btn-2 btn-small" data-id="<%=_id%>">删除</span></td>'
	});
});