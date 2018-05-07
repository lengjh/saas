define([
	'jquery',
	'layer',
	'upload-view',
	'kindeditor-view',
	'app',
	'jquery-plugins'
], function(
	$,
	layer,
	UploadView,
	KindeditorView,
	App
) {

	App({
		el: $('#newsApp'),
		validates: ['name', 'imageUrl', 'content'],
		url: '/api/admin/news',
		addTemplate: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="img"></span></td>' +
			'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
			'<td><span class="add-item m-r-10 btn-1 btn-small">添加</span></td>',
		template: '' +
			'<td data-id="<%=_id%>"><span class="display"><%=name%></span><input class="form-input" type="text" name="name" value="<%=name%>" data-id="<%=_id%>"/></td>' +
			'<td><span class="display"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file-list"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file">上传图片</span></td>' +
			'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
			'<td><span class="edit-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">编辑</span><div class="save-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">保存</div><span class="delete-item  btn-2 btn-small" data-id="<%=_id%>">删除</span></td>'
	});

	

	

	

	// App({
	// 	el: $('#followApp'),
	// 	validates: ['imageUrl', 'content'],
	// 	url: '/api/admin/product',
	// 	addTemplate: '' +
	// 		'<td><span class="img"></span></td>' +
	// 		'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
	// 		'<td><span class="add-item m-r-10 btn-1 btn-small">添加</span></td>',
	// 	template: '' +
	// 		'<td><span class="display"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file-list"><img src="<%=imageUrl%>" alt="图片" width="100" height="50"/></span><span class="webuploader-file">上传图片</span></td>' +
	// 		'<td><span class="display"><%=afterContent%></span><textarea class="form-textarea" name="" id="" cols="30" rows="10"><%=content%></textarea></td>' +
	// 		'<td><span class="edit-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">编辑</span><div class="save-item m-r-10 btn-1 btn-small" data-id="<%=_id%>">保存</div><span class="delete-item  btn-2 btn-small" data-id="<%=_id%>">删除</span></td>'
	// });


	// layer.open({
	// 	title: 'adsf',
	// 	area: ['300px', '200px']
	// });
	// var kindeditorView = new KindeditorView({
	// 	html: 'as<strong>html</strong>'
	// });

	// var uploadView = new UploadView({
	// 	values: ['http://localhost:8080/api/file/fb3d932ff3bd3867b4a153eada679a6a.jpeg', 'http://localhost:8080/api/file/fb3d932ff3bd3867b4a153eada679a6a.jpeg']
	// });

	// $('body').append(uploadView.el);
	// $('body').append(kindeditorView.el);

	$('.tab-wrap').tab({
		index: 7, //选中第几个，从0开始;默认：0
		event: function(ev) {
			console.log(ev);
		}
	});


});