 var path = require('path');
 var fs = require('fs');
 var table = require('table').table;
 var webutils = require('webutils');
 var showLogList = [];
 var db = {};

 function getFiles(p) {
 	var list = [];

 	function get(p) {
 		fs.readdirSync(p).forEach(function(item, index) {
 			var _p = path.join(p, item);
 			if (fs.statSync(_p).isFile()) {
 				list.push(_p);
 			} else if (fs.statSync(_p).isDirectory()) {
 				get(_p);
 			}
 		});
 	}
 	get(p);
 	return list;
 }
 var tables = [];
 var reg = RegExp('\\\\', 'ig');

 getFiles(__dirname).forEach(function(item) {
 	item = item.replace(reg, '/');
 	var _item = item.slice(item.lastIndexOf('/') + 1, -3);
 	if (_item === 'db') {
 		return;
 	}
 	tables.push(_item);
 	db[_item] = require(item);

 });

 webutils.info('已经添加数据库表', '[', tables.join(']['), ']');
 (function() {
 	var data,
 		output,
 		options;

 	data = [
 		['0A', '0B', '0C'],
 		['1A', '1B', '1C'],
 		['2A', '2B', '2C']
 	];

 	options = {
 		columns: {

 		}
 	};
 	var list = [
 		['序号', '表名']
 	];
 	tables.forEach(function(item, index) {
 		list.push([index, item]);
 	});

 	output = table(list, options);
 	webutils.info('已经添加数据库表:');
 	webutils.info(output);
 })();
 const config = {
 	pageSize: 500,
 	pageIndex: 1,
 	findType: 'find',
 	sort: {
 		createTime: -1
 	},
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
 		webutils.error(name, type, 'Error', err);
 		callback(err, docs);
 	} else {
 		if (debug && webutils.inArray(name, showLogList) !== -1) {
 			webutils.success(name, type, 'Success', docs && docs.result ? docs.result : docs);
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

 	if (!db[name]) {
 		cb({
 			status: 404,
 			message: 'Not Found'
 		}, {}, callback, ops, type, name);
 		return;
 	}

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
 			ops.update.updateTime = Date.now();
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
 		case 'count':
 			//db[name].count();
 			cb(null, db[name].find(ops.query).count(), callback, ops);
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