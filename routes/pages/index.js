var express = require('express');
var router = express.Router();
var webutils = require('webutils');
var db = require('../../lib/model/db');
var expandRouter = require('../../lib/common/global').expandRouter;

var crypto = require('crypto');
var token = 'kingwell';

// router.get('*', function(req, res, next) {
// 	var signature = req.query.signature;
// 	var timestamp = req.query.timestamp;
// 	var nonce = req.query.nonce;
// 	var echostr = req.query.echostr;

// 	/*  加密/校验流程如下： */
// 	//1. 将token、timestamp、nonce三个参数进行字典序排序
// 	var array = new Array(token, timestamp, nonce);
// 	array.sort();
// 	var str = array.toString().replace(/,/g, "");

// 	//2. 将三个参数字符串拼接成一个字符串进行sha1加密
// 	var sha1Code = crypto.createHash("sha1");
// 	var code = sha1Code.update(str, 'utf-8').digest("hex");

// 	//3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
// 	if (code === signature) {
// 		res.send(echostr)
// 	} else {
// 		res.send("error");
// 	}

// });
expandRouter.call(router, function(siteInfo) {
	var router = this;
	/* GET home page. */
	router.get('/', function(req, res, next) {


		function getNews() {
			return new Promise(function(resolve, reject) {
				db.find('news', {}, function(err, result) {

					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}

		function getTag() {
			return new Promise(function(resolve, reject) {
				db.find('tag', {
					pageSize: 20
				}, function(err, result) {

					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}

		function getBanner() {
			return new Promise(function(resolve, reject) {
				db.find('banner', {}, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}

				});
			});
		}

		function getItem() {
			return new Promise(function(resolve, reject) {
				db.find('item', {
					pageSize: 6
				}, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}

				});
			});
		}

		function getWedo() {
			return new Promise(function(resolve, reject) {
				db.find('wedo', {}, function(err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}

				});
			});
		}
		Promise.all([
				getBanner(),
				getNews(),
				getItem(),
				getTag()
			])
			.then(function(result) {
				if (req.query.debug) {
					res.send(result);
				} else {
					res.renderNormal('./home/index',
						Object.assign({
							layout: './layout/layout',
							currentNav: '/',
							title: '首页',
							banner: result[0],
							news: result[1],
							items: result[2],
							tag: result[3]
						}, siteInfo)
					);
				}

			});

	});
});


module.exports = router;