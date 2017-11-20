 var webutils = require('webutils');
 var showLogList = [];
 var db = {
 	news: require('./news'),
 	product: require('./product'),
 	user: require('./user')
 };

 const config = {
 	pageSize: 5,
 	pageIndex: 1,
 	findType: 'find',
 	sort: {},
 	list: [],
 	multi: false,
 	query: {},
 	save: {},
 	update: {},
 	delete: {}
 };

 var debug = process.env.debug || true;

 //callback
 var cb = function(err, docs, callback, ops, type, name) {
 	// docs = JSON.stringify(docs);
 	// docs = JSON.parse(docs);
 	// console.log('docs',docs);
 	if (debug && webutils.inArray(name, showLogList) !== -1) {
 		webutils.warn(name, type, '入参', ops);
 	}

 	if (err) {
 		webutils.error(name, type, '出错了', err);
 		callback(err, docs);
 	} else {
 		if (debug && webutils.inArray(name, showLogList) !== -1) {
 			webutils.success(name, type, '操作成功', docs && docs.result ? docs.result : docs);
 		}
 		callback(null, docs);
 	}

 };

 function assign() {
 	'use strict';
 	var obj = {};
 	var deepCopy = function copy(source) {
 		var result = {};
 		if (!source) {
 			return source
 		}
 		if (typeof source !== 'object') {
 			return source;
 		}
 		if (Object.prototype.toString.call(source).slice(8, -1) === 'Array') {
 			result = [];
 			for (var i = 0; i < source.length; i++) {
 				result[i] = copy(source[i]);
 			}
 			return result;
 		}
 		for (var key in source) {
 			result[key] = copy(source[key]);
 		}
 		return result;
 	};
 	if (!arguments.length) {
 		return null;
 	}
 	for (var item = 0, len = arguments.length; item < len; item++) {
 		for (var key in arguments[item]) {
 			if (undefined !== arguments[item][key]) {
 				obj[key] = deepCopy(arguments[item][key]);
 			}
 		}
 	}
 	return obj;
 }

 function getFunction(type, name, options, callback) {
 	var ops = assign({}, config, options);
 	var chat;

 	switch (type) {

 		case 'find':
 			db[name]
 				[ops.findType](ops.query, ops.list)
 				.skip(~~(ops.pageIndex <= 0 ? 0 : ops.pageIndex - 1) * ops.pageSize)
 				.limit(~~ops.pageSize)
 				.sort(ops.sort)
 				.exec(function(err, docs) {
 					cb(err, docs, callback, ops, type, name);
 				});
 			break;
 		case 'save':
 			chat = new db[name](ops.save);
 			chat.save(function(err, result) {
 				cb(err, result, callback, ops, type, name);
 			});
 			break;
 		case 'update':
 			db[name].update(
 				ops.query,
 				ops.update, {
 					multi: config.multi
 				},
 				function(err, docs) {
 					cb(err, docs, callback, ops, type, name);
 				});
 			break;
 		case 'delete':
 			db[name].remove(
 				ops.query,
 				function(err, docs) {
 					cb(err, docs, callback, ops, type, name);
 				});
 			break;
 		default:
 			cb(null, null, callback, ops);
 	}
 }

 module.exports = {

 	count: function(name, options, callback) {
 		getFunction('count', name, options, callback);
 	},
 	find: function(name, options, callback) {
 		getFunction('find', name, options, callback);
 	},
 	save: function(name, options, callback) {
 		getFunction('save', name, options, callback);
 	},
 	delete: function(name, options, callback) {
 		getFunction('delete', name, options, callback);
 	},
 	update: function(name, options, callback) {
 		getFunction('update', name, options, callback);
 	}
 };