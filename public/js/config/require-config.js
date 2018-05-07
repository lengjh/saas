require.config({
	baseUrl: '/js/',
	urlArgs: '',
	paths: {

		'underscore': 'libs/underscore/1.8.3/underscore',
		'socket.io': '//static.huizecdn.com/js/plugins/socket.io/2.0.3/socket.io',
		'backbone': 'libs/backbone/0.5.3/backbone',
		'backbone-localstorage': 'libs/backbone/backbone-localstorage',
		'jquery': ['//static.huizecdn.com/js/libs/jquery/1.8.0/jquery.min', 'libs/jquery/1.8.0/jquery'],
		'socket': 'libs/socket.io/socket.io',
		'require-css': 'plugins/require-css/css.min',

		'layer': '//static.huizecdn.com/js/plugins/layer/3.0.3/layer',
		'jquery-plugins': '/js/admin/js/common/jquery-plugins',

		'app-model': 'common/app-view/model',
		'app-view': 'common/app-view/view',
		'app-collection': 'common/app-view/collection',
		'app': 'common/app-view/app',

		//view
		'upload-view': 'common/view/upload',
		'kindeditor-view': 'common/view/kindeditor',

		'webuploader': '//static.huizecdn.com/js/plugins/webuploader/webuploader.min',
		'kindeditor': '//static.huizecdn.com/js/plugins/kindeditor/kindeditor-all-min',

		'storage': '/js/plugins/local-storage/local-storage',
		'webutils': 'common/webutils'

	},
	waitSeconds: 0,
	shim: {
		'backbone': {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		'backbone-localstorage': {
			exports: 'Store',
			deps: ['backbone']
		},
		'jquery-plugins': {
			deps: ['jquery']
		},
		'webuploader': {
			deps: ['css!webuploader-css']
		},
		'kindeditor-view': {
			deps: ['css!kindeditor-view-css']
		},
		'layer': {
			deps: ['jquery', 'css!layer-css']
		}
	},
	map: {
		'*': {
			'css': 'require-css',
			'layer-css': '//static.huizecdn.com/js/plugins/layer/3.0.3/skin/default/layer',
			'kindeditor-view-css': '//static.huizecdn.com/js/plugins/kindeditor/themes/default/default',
			'webuploader-css': '//static.huizecdn.com/js/plugins/webuploader/webuploader'
		}
	}
});