var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.renderNormal('index', {
		title: 'Express'
	});
});

module.exports = router;