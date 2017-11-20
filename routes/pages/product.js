var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');



router.get('/', function(req, res, next) {
	db.find('product', {
		//findType: 'findOne'
	}, function(err, result) {
		
		res.renderNormal('product', {
			title: 'Product',
			data: result
		});
	});

});

module.exports = router;