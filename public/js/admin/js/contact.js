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
	var upload = new UploadView({
		multiple: false
	});
	var editor = new KindeditorView();
	var url = '/api/admin/contact';

	$('#contactImg').html(upload.el);
	$('#contactContent').html(editor.el);

	$.get(url, {}, function(res) {
		console.log(res);
		$('#contactApp').find('.webuploader-file-list').html('<img src="' + res.imageUrl + '" alt="" data-url="' + res.imageUrl + '" />');
		editor.html(res.content);
		$('#contactBtn').data('id', res._id);
	});
	$('#contactBtn').on('click', function() {
		var id = $(this).data('id');
		$.ajax({
			url: id ? (url + '/' + id) : url,
			type: 'put',
			data: {
				imageUrl: $('#contactImg').find('img').data('url'),
				content: editor.html()
			},
			success: function(res) {
				console.log(res);
			}
		});
	});

});