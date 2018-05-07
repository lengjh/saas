var path = require('path');
var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');



router.get('/', function(req, res, next) {

	res.renderNormal('admin/weixin', {
		layout: 'admin/layout',
		title: 'weixin.ejs'
	});
});

router.get('/xcx', function(req, res, next) {

	res.renderNormal('admin/xcx', {
		layout: 'admin/layout',
		title: 'xcx'
	});
});

module.exports = router;