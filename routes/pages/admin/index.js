var express = require('express');
var router = express.Router();
var db = require('../../../lib/model/db');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.renderNormal('admin/index', {
		layout: 'admin/layout',
		title: 'Express'
	});
});

module.exports = router;