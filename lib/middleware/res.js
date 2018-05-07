'use strict';
var fs = require('fs');
var webutils = require('webutils');
var config = require('../../config.js');
var utils = JSON.stringify(webutils);

/**
 * 默认配置
 * @type {Object}
 */
var defaultOptions = {

	//标题，关键字
	title: 'web',
	keywords: '',
	description: '',
	//版本号
	version: '0.0.1',
	jsVersion: '',
	cssVersion: '',

	//环境变量
	env: process.env.NODE_ENV,

	setBreadBrumbs: function(breadBrumbs) {
		var result = ['<div class="bread-crumbs">'];
		result.push('<span class="m-r-10">位置：</span><a href="/">首页</a>');
		(breadBrumbs || []).forEach(function(item) {
			result.push('<span class="m-l-10 m-r-10">&gt;</span>');
			if (item.link) {
				result.push('<a href="' + item.link + '">' + item.name + '</a>');
			} else {
				result.push('<span>' + item.name + '</span>');
			}
		});
		result.push('</div>');
		return result.join('');
	},

	webutils: webutils,
	slice: webutils.slice,
	getDateString: webutils.getDateString,
	trimHtml: webutils.strimHtml || webutils.trimHtml

};
var getErrorCode = function(code) {
	return require('./error-code.js')[code || '0'];
};
/**
 * 重新定义渲染方法
 * @param  {[type]} jade    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */

var renderNormal = function(jadePath, options) {
	this.render(jadePath, Object.assign(defaultOptions, options));
};

var renderError = function(jadePath, options) {
	this.render(jadePath, Object.assign(defaultOptions, options));
};

var renderResult = function(data, options) {
	var obj = Object.assign({
		timestamp: Date.now(),
		message: '',
		data: data || null,
		errorCode: 0,
		status: true
	}, options);
	if (!obj.message) {
		obj.message = getErrorCode(obj.errorCode);
	}
	if (obj.errorCode !== 0) {
		obj.status = false;
	}
	this.send(obj);
};


var error = function(err) {
	this.send(err);
};

var goTo = function(url, options) {
	var _url = url || '/';
	var obj = Object.assign(defaultOptions, options);
	var strArr = [];
	for (var key in obj) {
		strArr.push(key + '=' + obj[key]);
	}
	this.redirect(_url);
};


module.exports = function(req, res, next) {
	res.renderNormal = renderNormal;
	res.renderError = renderError;
	res.renderResult = renderResult;
	res.goTo = goTo;
	res.error = error;
	next();
};