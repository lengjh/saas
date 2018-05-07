var express = require('express');
var webutils = require('webutils');
var router = express.Router();
var db = require('../../../lib/model/db');

//add 
router.get('/', function(req, res, next) {

	function getProductCount() {
		return new Promise(function(resolve, reject) {
			db.count('product', {}, function(err, count) {
				resolve(count);
			});
		});
	}

	function getNewsCount() {
		return new Promise(function(resolve, reject) {
			db.count('news', {}, function(err, count) {
				resolve(count);
			});
		});
	}

	function getTagCount() {
		return new Promise(function(resolve, reject) {
			db.count('tag', {}, function(err, count) {
				resolve(count);
			});
		});
	}

	Promise
		.all([
			getProductCount(),
			getNewsCount(),
			getTagCount()
		])
		.then(function(result) {
			res.renderResult(result);
		});

});



module.exports = router;