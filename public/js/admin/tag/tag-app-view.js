define([
	'jquery',
	'underscore',
	'backbone',
	'/js/common/view/upload.js',
	'/js/admin/tag/model.js',
	'/js/admin/tag/collection.js',
	'/js/admin/tag/view.js'
], function($, _, Backbone, UploadView, Banner, BannerList, BannerView) {

	function success(a, b, c) {

	}

	var Banners = new BannerList();
	var AppView = Backbone.View.extend({
		el: $('#addTag'),
		events: {
			'click .add': 'createOnEnter'
		},
		initialize: function() {
			Banners.bind('add', this.addOne, this);
			Banners.bind('reset', this.addAll, this);
			Banners.fetch();
		},

		createOnEnter: function() {

			var banner = new Banner();
			var attr = {};
			var $item = $(this.el).find('#addTab-add');
 			attr.name = $item.find('[name="name"]').val();
 			attr.link = $item.find('[name="link"]').val();
			console.log(attr);
			if (!attr.name || !attr.link) {
				alert('缺少必要内容');
				return;
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

			$('#tagTbody').append(view.render().el);
		},
		addAll: function() {
			Banners.each(this.addOne);
		}

	});
	return AppView;
});