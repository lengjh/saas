var express = require('express');
var webutils = require('webutils');
var router = express.Router();
var db = require('../../lib/model/db');
/**
 * 获取所有
 */
router.get('/', function(req, res, next) {
	db.find('user', {

	}, function(err, result) {
		res.send(result);
	});
	//res.renderResult();
});
/**
 * 获取单个
 */
router.get('/:id', function(req, res, next) {
	res.renderResult();
});
/**
 * 添加
 */
router.post('/', function(req, res, next) {
	var save = {};
	for (var key in req.body) {
		save[key] = webutils.trimHtml(req.body[key]);
	}
	if (save.code !== '2017') {
		res.send('Error');
		return;
	}
	if (save.userName && save.password) {
		db.find('user', {
			findType: 'findOne',
			query: {
				userName: save.userName
			}
		}, function(err, result) {
			if (result) {
				res.renderResult('已经存在');
			} else {
				db.save('user', {
					save: save
				}, function(err, result) {
					res.renderResult(err || result);
				});
			}
		});
	} else {
		res.renderResult('不能为空');
	}


});
/**
 * 修改
 */
router.put('/:id', function(req, res, next) {
	res.renderResult();
});
/**
 * 删除
 */
router.delete('/:id', function(req, res, next) {
	res.renderResult();
});

module.exports = router;