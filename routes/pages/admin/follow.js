var path = require('path');
var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');



router.get('/', function(req, res, next) {

	res.renderNormal('admin/follow', {
		layout: 'admin/layout',
		title: 'follow'
	});
});

module.exports = router;