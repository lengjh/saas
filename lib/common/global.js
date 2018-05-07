 var db = require('../../lib/model/db');
 var webutils = require('webutils');
 var config = require('../../config.js');
 /**
  * 获取全局对象
  * @return {[type]} [description]
  */
 var getGlobalInfo = function() {
 	function getContact() {
 		return new Promise(function(resolve, reject) {
 			db.find('contact', {
 				findType: 'findOne'
 			}, function(err, result) {
 				if (err) {
 					reject(err);
 				} else {
 					resolve(result);
 				}
 			});
 		});
 	}

 	function getSite() {
 		return new Promise(function(resolve, reject) {
 			db.find('site', {
 				findType: 'findOne'
 			}, function(err, result) {
 				if (err) {
 					reject(err);
 				} else {
 					resolve(result);
 				}
 			});
 		});
 	}

 	return new Promise(function(resolve, reject) {
 		Promise
 			.all([
 				getContact(),
 				getSite()
 			])
 			.then(function(result) {
 				resolve({
 					contact: result[0],
 					site: result[1]
 				});
 			})
 			.catch(function(err) {
 				reject(err);
 			});
 	});
 };

 var expandRouter = function(callback) {
 	var router = this;
 	if (getGlobalInfo.obj && getGlobalInfo.dev) {
 		callback.call(router, getGlobalInfo.obj);
 	} else {
 		getGlobalInfo()
 			.then(function(obj) {
 				obj.navList = config.navList;
 				getGlobalInfo.obj = obj;
 				callback.call(router, obj);
 			});
 	}

 };

 module.exports = {
 	globalInfo: getGlobalInfo,
 	expandRouter: expandRouter
 };