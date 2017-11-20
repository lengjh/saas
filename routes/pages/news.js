var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');



router.get('/', function(req, res, next) {
	db.find('news', {
		//findType: 'findOne'
	}, function(err, result) {
		res.renderNormal('news', {
			title: 'news',
			data: result
		});
	});

});

module.exports = router;