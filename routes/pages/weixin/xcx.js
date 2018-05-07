var request = require('request');
var express = require('express');
var router = express.Router();
var config = require('../../../config');
var db = require('../../../lib/model/db');
var webutils = require('webutils');
var weixin = config.weixin;
var xcx = weixin.xcx1;
var crypto = require('crypto');
var xml2js = require('xml2js');
var token = 'kingwell';

function getAccessToken(callback) {
	if (getAccessToken.access_token) {
		callback(null, getAccessToken.access_token);
	} else {
		request(
			'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + xcx.appID + '&secret=' + xcx.appSecret,
			function(error, response, body) {
				try {
					body = JSON.parse(body);
				} catch (ev) {

				}
				var access_token = body.access_token;
				getAccessToken.access_token = access_token;
				callback(error, access_token);
			});
	}

}
router.get('/msg', function(req, res, next) {
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;

	/*  加密/校验流程如下： */
	//1. 将token、timestamp、nonce三个参数进行字典序排序
	var array = new Array(token, timestamp, nonce);
	array.sort();
	var str = array.toString().replace(/,/g, "");

	//2. 将三个参数字符串拼接成一个字符串进行sha1加密
	var sha1Code = crypto.createHash("sha1");
	var code = sha1Code.update(str, 'utf-8').digest("hex");

	//3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
	if (code === signature) {
		res.send(echostr)
	} else {
		res.send("error");
	}

});
var rs = {
	'-1': '系统繁忙，此时请开发者稍候再试',
	'0': '请求成功',
	'40001': '获取 access_token 时 AppSecret 错误，或者 access_token 无效。请开发者认真比对 AppSecret 正确性，或查看是否正在为恰当的小程序调用接口',
	'40002': '不合法的凭证类型',
	'40003': '不合法的 OpenID，请开发者确认OpenID否是其他小程序的 OpenID',
	'45015': '回复时间超过限制',
	'45047': '客服接口下行条数超过上限',
	'48001': 'api功能未授权，请确认小程序已获得该接口'
};
/**
 * 如果启用了，则服务自动回复，否则消息推送到网页版客服工具
 */
router.post('/msg', function(req, res, next) {
	var body = req.body;
	console.log('body', body);
	var ToUserName = body.ToUserName;
	var FromUserName = body.FromUserName;
	getAccessToken(function(err, access_token) {
		request.post({
			url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + access_token,
			form: JSON.stringify({
				"access_token": access_token,
				"touser": FromUserName,
				"msgtype": "text",
				"text": {
					"content": body.Content || "Hello World"
				}
			})
		}, function(err, response, body) {
			var _body = JSON.parse(body);
			console.log(rs[_body.errcode]);
		});
	});
	res.send(body);
});
module.exports = router;