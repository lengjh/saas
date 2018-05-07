var express = require('express');
var router = express.Router();

// var ccap = require('ccap');
// var captcha = ccap();
/**
 * 获取所有
 */
router.get('/', function(req, res, next) {

	// var ary = ccap.get();
	// var txt = ary[0];
	// var buf = ary[1];
	// req.end(buf);
	res.renderResult();
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
	res.renderResult();
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