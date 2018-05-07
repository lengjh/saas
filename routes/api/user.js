var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');



/**
 * 获取所有
 */
router.get('/', function(req, res, next) {

	if (req.query.id !== 'kingwell') {
		res.renderResult(null, {
			errorCode: 20000
		});
	}
	db.find('user', {}, function(err, result) {
		res.renderResult(err || result);
	});
});
router.post('/login', function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;
	if (userName && password) {
		password = crypto.createHash('md5').update(password).digest('hex');
		db.find('user', {
			findType: 'findOne',
			query: {
				userName: userName,
				password: password
			}
		}, function(err, result) {
			if (result) {
				req.session.user = result;
				db.update('user', {
					query: {
						_id: result._id
					},
					update: {
						lastLoginTime: Date.now()
					}
				}, function(err, result) {
					//res.redirect('/admin');
				});
				res.renderResult(true, {
					message: '登录成功'
				});
				//res.renderResult(err || result);
			} else {
				res.renderResult(null, {
					message: '登录失败'
				});
			}

		});
	} else {
		res.renderResult(null, {
			message: '不能为空'
		});
	}

});

router.post('/md5', function(req, res, next) {
	var value = req.body.value || '';

	if (value) {
		res.renderResult(crypto.createHash('md5').update(value).digest('hex'));
	} else {
		res.renderResult(null, {
			errorCode: -1
		});
	}

});
/**
 * 获取单个
 */
router.get('/:id', function(req, res, next) {
	res.renderResult(null, {
		errorCode: 20000
		//message: '没有权限'
	});
	// db.find('user', {
	// 	findType: 'findOne',
	// 	query: {
	// 		_id: req.params.id
	// 	}
	// }, function(err, result) {
	// 	res.renderResult(result);
	// });
});
/**
 * 添加
 */

router.post('/register', function(req, res, next) {
	var userName = req.body.userName || '';
	var password = req.body.password || '';
	var code = req.body.code || '';
	if (userName.length < 6 || password.length < 6 || code.length !== 4) {
		res.renderResult(false, {
			message: '不合法'
		});
		return;
	}

	db.find('user', {
		findType: 'findOne',
		query: {
			userName: userName
		}
	}, function(err, result) {
		if (result) {
			res.renderResult(false, {
				message: '已经存在'
			});
		} else {
			if (code !== '2017') {
				res.renderResult(false, {
					message: 'Code错误'
				});
				return;
			}

			password = crypto.createHash('md5').update(password).digest('hex');

			db.save('user', {
				save: {
					userName: userName,
					password: password
				}
			}, function(err, result) {
				res.renderResult(err || result);
			});
		}
	});

});
/**
 * 修改
 */
router.put('/:id', function(req, res, next) {
	var query = req.query;
	var body = req.body;
	if (body.password !== '11e9c2847b81e5777c0d14a2e1dd13b6' && body.userName !== 'admin') {
		res.renderResult(null, {
			errorCode: 20000
		});
	} else {
		db.update('user', {
			findType: 'findOne',
			query: {
				_id: req.params.id
			},
			update: query
		}, function(err, result) {
			res.renderResult(result);
		});
	}

});
/**
 * 删除
 */
router.delete('/:id', function(req, res, next) {
	res.renderResult(null, {
		errorCode: 20000
		//message: '没有权限'
	});
	// db.delete('user', {
	// 	query: {
	// 		_id: req.params.id
	// 	}
	// }, function(err, result) {
	// 	res.renderResult(err || result);
	// });
});



module.exports = router;