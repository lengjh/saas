'use strict';
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
	env: process.env.NODE_ENV

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
	this.send(Object.assign({
		time: Date.now(),
		message: '',
		data: data || '',
		status: '00000'
	}, options));
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