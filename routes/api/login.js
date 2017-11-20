var express = require('express');
var router = express.Router();

/**
 * 获取所有
 */
router.get('/', function(req, res, next) {
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