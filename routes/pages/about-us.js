var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');
var expandRouter = require('../../lib/common/global').expandRouter;

expandRouter.call(router, function(siteInfo) {
	var router = this;

	router.get('/', function(req, res, next) {

		db.find(
			'about-us', {
				findType: 'findOne'
			},
			function(err, result) {
				console.log(result);
				if (err) {
					next();
				} else {
					res.renderNormal('about-us/index', Object.assign({
						data: result,
						layout: 'layout/layout'
					}, siteInfo));
				}

			});


	});
});

module.exports = router;