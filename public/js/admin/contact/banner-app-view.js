define([
	'jquery',
	'underscore',
	'backbone',
	'/js/common/view/upload.js',
	'/js/admin/banner/model.js',
	'/js/admin/banner/collection.js',
	'/js/admin/banner/view.js'
], function($, _, Backbone, UploadView, Banner, BannerList, BannerView) {

	function success(a, b, c) {

	}

	var Banners = new BannerList();
	var AppView = Backbone.View.extend({
		el: $('#addBanner'),
		events: {
			'click .add-html': 'addHtml',
			'click .add': 'createOnEnter'
		},
		initialize: function() {
			Banners.bind('add', this.addOne, this);
			Banners.bind('reset', this.addAll, this);
			Banners.fetch();
		},
		addHtml: function() {
			var htmlResult = [
				'<div class="table-box">',
				'    <table class="table">',
				'        <thead>',
				'            <tr>',
				'                <th>图片</th>',
				'                <th>链接</th>',
				'                <th></th>',
				'            </tr>',
				'        </thead>',
				'        <tbody>',
				'            <tr>',
				'                <td data-type="upload"></td>',
				'                <td><input type="text" class="form-input" name="link" placeholder="http://"></td>',
				'                <td><button class="add">add</button></td>',
				'            </tr>',
				'        </tbody>',
				'    </table>',
				'</div>'
			].join('');

			$(this.el).find('#addBanner-add').html(htmlResult);
			$(this.el).find('#addBanner-add').find('[data-type="upload"]').html(new UploadView({}).el);
		},
		createOnEnter: function() {
			
			var banner = new Banner();
			var attr = {};
			var $item = $(this.el).find('#addBanner-add');
			attr.imageUrl = $item.find('.webuploader-file-list').find('img').data('url');
			attr.link = $item.find('[name="link"]').val();
			console.log(attr);
			if(!attr.imageUrl||!attr.link){
				//alert('缺少必要内容');
				//return;
			}
			banner.bind('error', function(model, error) {
				console.error('createOnEnter', error);
			});
			if (banner.set(attr)) {
				Banners.create(banner, {
					validate: true,
					wait: true,
					success: success
				});
			}
		},
		addOne: function(banner) {
			banner.set({
				'eid': banner.get('_id') || Banners.length
			});


			banner.bind('error', function(model, error) {
				console.error('addOne', error);
			});
			var view = new BannerView({
				model: banner
			});

			$('#addBannerTbody').append(view.render().el);
		},
		addAll: function() {
			Banners.each(this.addOne);
		}

	});
	return AppView;
});