var path = require('path');
var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');

router.all('*', function(req, res, next) {
	//req.session.user = 2016;
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
});

router.get('/', function(req, res, next) {
	res.renderNormal('admin/home', {
		layout: 'admin/layout',
		title: 'Express'
	});
});

module.exports = router;