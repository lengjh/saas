 var db = require('../../lib/model/db');
 var webutils = require('webutils');

 /**
  * 增删改查记录
  * @param  {[type]}   res      [description]
  * @param  {[type]}   options  [description]
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
 var recordOperation = function(res, options, callback) {

 	var user;
 	var ops = Object.assign({}, options);
 	//options = options || {};
 	callback = callback || function() {};
 	if (!res) {
 		throw '缺少必要参数';
 	}
 	user = this.session && this.session.user ? this.session.user : null;
 	if (ops.record === false || (user && ops.dbName && ops.editType)) {
 		if (user) {
 			db.save('log', {
 				save: {
 					dbName: ops.dbName,
 					dbID: ops.dbID,
 					editType: ops.editType,
 					who: user.userName
 				}
 			}, function() {});
 		}

 		callback();
 	} else {
 		res.renderResult({}, {
 			message: '没有登录'
 		});
 	}
 };

 var restfulAipRouter = function(options) {

 	var router = this;
 	var saveObject = {};
 	var updateObject = {};

 	var ops = Object.assign({
 		contentLength: false,
 		record: true,
 		getPermissions: function() {
 			return true;
 		},
 		list: [],
 		saveItems: [],
 		updateItems: []
 	}, options);

 	var dbName = ops.dbName ? '' : '/:dbName';

 	/**
 	 * 获取所有
 	 */
 	router.get(dbName + '/', function(req, res, next) {
 		var _dbName = req.params.dbName || ops.dbName;
 		var list = Array.isArray(ops.list) ? ops.list : ops.list(_dbName);
 		var contentLength = req.query.contentLength || ops.contentLength;
 		var nameLength = req.query.nameLength || ops.nameLength;
 		if (!ops.getPermissions(_dbName, 'get', req)) {
 			next({
 				message: '权限不够',
 				status: 200
 			});
 			return;
 		}

 		recordOperation.call(req, res, {
 			dbName: _dbName,
 			record: ops.record,
 			editType: 'view'
 		}, function() {
 			db.find(_dbName, {
 				list: list,
 				pageSize: req.query.pageSize,
 				pageIndex: req.query.pageIndex
 			}, function(err, result) {
 				if (err) {
 					next(err);
 				} else {

 					if (contentLength || nameLength) {
 						var rs = [];

 						result.forEach(function(item) {
 							if (contentLength) {
 								item.content = item.content.slice(0, contentLength);
 							}
 							if (nameLength) {
 								item.name = item.name.slice(0, nameLength);
 							}
 							rs.push(item);
 						});
 						res.send(rs);
 					} else {
 						res.send(result);
 					}

 				}

 			});
 		});
 	});

 	/**
 	 * 获取单个
 	 */
 	router.get(dbName + '/:id', function(req, res, next) {
 		var _dbName = req.params.dbName || ops.dbName;
 		var list = Array.isArray(ops.list) ? ops.list : ops.list(_dbName);
 		if (!ops.getPermissions(_dbName, 'get', req)) {
 			next({
 				message: '权限不够',
 				status: 200
 			});
 			return;
 		}

 		db.find(_dbName, {
 			list: list,
 			findType: 'findOne',
 			query: {
 				_id: req.params.id
 			}
 		}, function(err, result) {
 			if (err) {
 				next(err);
 			} else {
 				res.send(result);
 			}

 		});
 	});

 	/**
 	 * 添加
 	 */
 	router.post(dbName + '/', function(req, res, next) {
 		var body = req.body;
 		var obj = {};
 		var _dbName = req.params.dbName || ops.dbName;
 		var saveItems = Array.isArray(ops.saveItems) ? ops.saveItems : (ops.saveItems(_dbName) || []);

 		if (!ops.getPermissions(_dbName, 'post', req)) {
 			next({
 				message: '权限不够',
 				status: 200
 			});
 			return;
 		}

 		if (!saveItems.length) {
 			res.send({});
 			return;
 		}
 		saveItems.forEach(function(item) {
 			obj[item] = body[item];
 		});

 		recordOperation.call(req, res, {
 			dbName: _dbName,
 			record: ops.record,
 			editType: 'save'
 		}, function() {
 			db.save(_dbName, {
 				save: obj
 			}, function(err, result) {

 				if (err) {
 					res.send(err);
 				} else {
 					res.send(result);
 				}
 			});
 		});

 	});
 	/**
 	 * 修改
 	 */
 	router.put(dbName + '/:id', function(req, res, next) {
 		var id = req.params.id;
 		var body = req.body;
 		var obj = {};
 		var _dbName = req.params.dbName || ops.dbName;
 		var updateItems = Array.isArray(ops.updateItems) ? ops.updateItems : (ops.updateItems(_dbName) || []);

 		if (!ops.getPermissions(_dbName, 'put', req)) {
 			next({
 				message: '权限不够',
 				status: 200
 			});
 			return;
 		}

 		if (!updateItems.length) {
 			res.send({});
 			return;
 		}
 		updateItems.forEach(function(item) {
 			obj[item] = body[item];
 		});
 		recordOperation.call(req, res, {
 			dbName: _dbName,
 			record: ops.record,
 			dbID: id,
 			editType: 'update'
 		}, function() {

 			db.update(_dbName, {
 				query: {
 					_id: req.params.id
 				},
 				update: obj
 			}, function(err, result) {
 				if (err) {
 					next(err);
 				} else {
 					res.send(result);
 				}
 			});
 		});
 	});

 	/**
 	 * 删除
 	 */
 	router.delete(dbName + '/:id', function(req, res, next) {
 		var id = req.params.id;
 		var _dbName = req.params.dbName || ops.dbName;

 		if (!ops.getPermissions(_dbName, 'delete', req)) {
 			next({
 				message: '权限不够',
 				status: 200
 			});
 			return;
 		}

 		recordOperation.call(req, res, {
 			dbName: _dbName,
 			record: ops.record,
 			dbID: id,
 			editType: 'delete'
 		}, function(callback) {

 			db.delete(_dbName, {
 				query: {
 					_id: id
 				}
 			}, function(err, result) {
 				if (err) {
 					next(err);
 				} else {
 					res.send(result);
 				}
 			});
 		});

 	});
 };

 module.exports = restfulAipRouter;