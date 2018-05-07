 var express = require('express');
 var router = express.Router();
 var restfulAipRouter = require('../../lib/common/restful-aip-router.js');

 var getSaveItems = function() {
 	return ['name', 'content', 'imageUrl'];
 };
 var getupdateItems = getSaveItems;
 /**
  * API
  * @type {[type]}
  */
 restfulAipRouter.call(router, {
 	record: false,
 	list: ['name', 'content', 'imageUrl', 'createTime'],
 	saveItems: getSaveItems,
 	updateItems: getupdateItems
 });

 module.exports = router;