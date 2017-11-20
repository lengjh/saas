var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');
/**
 * 获取所有
 */
router.get('/', function(req, res, next) {
	db.find('news', {

	}, function(err, result) {
		res.renderResult({
			data: result
		});
	});
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
	var body = req.body;
	var name = body.name;
	var content = body.content;
	var imageUrl = body.imageUrl;
	db.save('news', {
		save: {
			name: name,
			content: content,
			imageUrl: imageUrl
		}
	}, function(err, result) {
		res.renderResult({
			data: result
		});
	});

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