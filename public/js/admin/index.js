require([
	'jquery',
	'webutils',
	'/js/common/model/add-product.js',
	'/js/common/view/kindEditor.js',
	'/js/common/view/upload.js',
	'/js/common/view/add-product.js',
	'/js/product/app-view.js',
	'/js/admin/banner/banner-app-view.js',
	'/js/admin/tag/tag-app-view.js',
	'/js/admin/news/news-app-view.js'
], function(
	$,
	webutils,
	AppProductModel,
	KindEditorView,
	UploadView,
	AddProductView,
	ProductAppView,
	BannerAppView,
	TagAppView,
	NewsAppView
) {



	var AppRouter = Backbone.Router.extend({
		routes: {
			'nav/:type': 'setNav',
			'*actions': 'defaultRroute'
		},
		setNav: function(nav) {

			$('[data-nav]').removeClass('active');
			$('[data-nav="' + nav + '"]').addClass('active');
			this.renderPage(nav);
		},
		navStatus: {},
		renderPage: function(nav) {
			var _this = this;
			$('#title').html($('.admin-menu [data-nav="' + nav + '"]').text());
			$('.admin-body-item').hide();
			$('.admin-body-item[data-nav="' + nav + '"]').show();
			if (_this.navStatus[nav]) {
				return;
			}
			_this.navStatus[nav] = true;
			switch (nav) {
				case 'addProduct':
					var appProductModel = new AppProductModel();
					appProductModel.set();
					var addProduct = new AddProductView({
						model: appProductModel,
						postUrl: '/api/product/?dir=backbone'
					});

					$('#addProduct').append(addProduct.el);
					break;
				case 'editProduct':
					new ProductAppView();
					break;
				case 'addNews':
					var addNews = new AddProductView({
						postUrl: '/api/news/'
					});
					$('#addNews').append(addNews.el);
					break;
				case 'editNews':
					new NewsAppView();
					break;
				case 'addBanner':
					new BannerAppView();
					break;
				case 'addTag':
					new TagAppView();
					break;
				case 'editTag':
					break;
			}

		},
		defaultRroute: function(a, b) {}
	});

	var appRouter = new AppRouter();
	if (!location.hash) {
		location.hash = '#nav/home';
	}
	Backbone.history.start();
});