var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');
var os = require('os');
/**
 * 获取所有
 */
router.get('/', function(req, res, next) {

	var info = {
		'操作系统': os.type(),
		'platform': os.platform(),
		'CPU体系结构': os.arch(),
		'CPU数量': os.cpus().length
	};
	if (req.session && req.session.user && req.session.user.permissions) {
		res.renderResult(info);
	} else {
		res.renderResult(null, {
			errorCode: 10000
		});
	}

});

module.exports = router;