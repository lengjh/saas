var express = require('express');
var router = express.Router();
var restfulAipRouter = require('../../lib/common/restful-aip-router.js');


/**
 * 过滤返回
 * @param  {[type]} dbName [description]
 * @return {[type]}        [description]
 */
var getList = function(dbName) {
	var list = [];
	if (dbName === 'site') {
		//list = ['name', 'keywords', 'description'];
	}

	return list;
};

var getSaveItems = function(dbName) {
	return ['name', 'content', 'imageUrl', 'logo', 'keywords', 'description'];
};

var getupdateItems = function(dbName) {
	return ['name', 'content', 'imageUrl', 'logo', 'keywords', 'description'];
};

/**
 * API
 * @type {[type]}
 */
restfulAipRouter.call(router, {
	list: getList,
	saveItems: getSaveItems,
	updateItems: getupdateItems
});

module.exports = router;