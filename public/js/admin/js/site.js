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
	App
) {

	$.get('/api/admin/site/', function(res) {
		var data = res[0] || {};

		$('#siteInfo').find('[name="id"]').val(data._id);
		$('#siteInfo').find('[name="name"]').val(data.name);
		$('#siteInfo').find('[name="title"]').val(data.title);
		$('#siteInfo').find('[name="keywords"]').val(data.keywords);
		$('#siteInfo').find('[name="description"]').val(data.description);
		$('#siteInfo').find('[name="logo"]').val(data.logo);

		$('#logoImageUrl').html((new UploadView({
			multiple: false,
			values: [data.logo]
		})).el);
		//$('#siteInfo').find('[name=""]').val(data.);
		//siteInfo
	});
	$('#siteInfoBtn').click(function() {
		var obj = {
			id: $('#siteInfo').find('[name="id"]').val(),
			name: $('#siteInfo').find('[name="name"]').val(),
			title: $('#siteInfo').find('[name="title"]').val(),
			keywords: $('#siteInfo').find('[name="keywords"]').val(),
			description: $('#siteInfo').find('[name="description"]').val(),
			logo: $('#logoImageUrl').find('img').data('url')
		};

		if (obj.id) {
			$.ajax({
				url: '/api/admin/site/' + obj.id,
				type: 'put',
				data: obj,
				success: function(res) {
					alert('修改成功');
				}
			});
		} else {
			$.ajax({
				url: '/api/admin/site/',
				type: 'post',
				data: obj,
				success: function(res) {
					alert('保存成功');

				}
			});
		}
	});
});