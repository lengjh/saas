var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		res.redirect('/admin');
	} else {
		res.renderNormal('./user/login', {
			layout: './user/layout',
			title: '登录'
		});
	}
});

module.exports = router;