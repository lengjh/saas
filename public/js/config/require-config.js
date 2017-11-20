require.config({
	baseUrl: '/js/',
	urlArgs: '',
	paths: {

		'underscore': 'libs/underscore/1.8.3/underscore',
		'backbone': 'libs/backbone/1.3.3/backbone',
		'backbone-localstorage': 'libs/backbone/backbone-localstorage',
		'jquery': 'libs/jquery/1.8.0/jquery',
		'socket': 'libs/socket.io/socket.io',
		'require-css': 'plugins/require-css/css.min',

		'webuploader': 'plugins/webuploader/webuploader.min',
		'kindeditor': 'plugins/kindeditor/kindeditor-all-min'

	},
	waitSeconds: 0,
	shim: {
		'backbone': {
			deps: ['underscore']
		},
		'backbone-localstorage': {
			exports: 'Store',
			deps: ['backbone']
		},
		'webuploader': {
			deps: ['css!webuploader-css']
		}
	},
	map: {
		'*': {
			'css': 'require-css',
			'webuploader-css': 'plugins/webuploader/webuploader'
		}
	}
});