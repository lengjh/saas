require([
	'jquery',
	'/js/common/kindEditor.js',
	'/js/common/upload.js',
	'/js/common/add-product.js',
	'/js/product/app-view.js'
], function(
	$,
	KindEditorView,
	UploadView,
	AddProduct,
	ProductAppView
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
					var addProduct = new AddProduct({
						postUrl: '/api/product/?dir=backbone'
					});

					$('#addProduct').append(addProduct.el);

					break;
				case 'editProduct':
					new ProductAppView();
					break;
				case 'addNews':
					var addNews = new AddProduct({
						postUrl: '/api/news/'
					});

					$('#addNews').append(addNews.el);
					break;
				case 'editNews':
					break;
				case 'addBanner':
					break;
				case 'editBanner':
					break;
				case 'addTag':
					break;
				case 'editTag':
					break;
			}

		},
		defaultRroute: function(a, b) {
			console.log(a, b);
		}
	});

	var appRouter = new AppRouter();
	if (!location.hash) {
		location.hash = '#nav/home';
	}
	Backbone.history.start();
});