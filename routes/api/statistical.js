//statistical
var db = require('../../lib/model/db');
var express = require('express');
var router = express.Router();
var restfulAipRouter = require('../../lib/common/restful-aip-router.js');

/**
 * API
 * @type {[type]}
 */
restfulAipRouter.call(router, {
	record: false,
	dbName: 'statistical',
	saveItems: function() {
		return ['location', 'userInfo', 'performance', 'userAgent'];
	},
	getPermissions: function(_dbName, method, req) {

		if (method === 'post') {
			return true;
		}
		if (req.body.id = 'kingwell') {
			return true;
		}
		return false;
	}
});

module.exports = router;