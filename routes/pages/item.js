var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');
var expandRouter = require('../../lib/common/global').expandRouter;

expandRouter.call(router, function(obj) {
	var router = this;

	router.get('/', function(req, res, next) {

		function getItem() {
			return new Promise(function(resolve, reject) {

				db.find('item', {
					pageSize: req.query.pageSize || 5
				}, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}

		function getTags() {
			return new Promise(function(resolve, reject) {
				db.find('tag', {
					pageSize: req.query.pageSize || 5
				}, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}

		Promise
			.all([
				getItem(),
				getTags()
			])
			.then(function(result) {

				res.renderNormal('./item/items.ejs',
					Object.assign({
						layout: './layout/layout.ejs',
						items: result[0],
						tags: result[1]
					}, obj));
			})
			.catch(function(err) {
				next(err);
			});

	});

	router.get('/:id', function(req, res, next) {
		var id = req.params.id;

		function getItem() {
			return new Promise(function(resolve, reject) {

				db.find('item', {
					findType: 'findOne',
					query: {
						_id: id
					}
				}, function(err, result) {
					if (err) {
						reject(err);
					} else {

						if (!req.session[id]) {
							//req.session[id] = id;
							db.update('item', {
								query: {
									_id: id
								},
								update: {
									read: result.read + 1
								}
							}, function(err, result) {});
						}
						resolve(result);
					}
				});
			});
		}

		Promise
			.all([
				getItem()
			])
			.then(function(result) {

				res.renderNormal('./item/item.ejs',
					Object.assign({
						layout: './layout/layout.ejs',
						item: result[0]
					}, obj));
			})
			.catch(function(err) {
				next(err);
			});

	});
});



module.exports = router;