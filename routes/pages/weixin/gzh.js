var request = require('request');
var express = require('express');
var router = express.Router();
var config = require('../../../config');
var db = require('../../../lib/model/db');
var webutils = require('webutils');
var weixin = config.weixin;
var gzh = weixin.gzh;
var crypto = require('crypto');
var xml2js = require('xml2js');
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

router.get('/', function(req, res, next) {
	console.log(req.query, req.body);
	res.send(req.query);
});


router.post('/', function(req, res, next) {
	var body = '';
	req.on('data', function(chunk) {
		body += chunk;
	});
	req.on('end', function() {

		var parser = new xml2js.Parser();
		parser.parseString(body, function(err, result) {
			var xml = result.xml || {};
			var MsgType = xml.MsgType[0]; //类型			
			var Event = (xml.Event || {})[0]; //Event类型			
			var ScanCodeInfo = (xml.ScanCodeInfo || {})[0]; //Event类型			

			var ToUserName = result.xml.ToUserName[0];
			var FromUserName = result.xml.FromUserName[0];
			console.dir(result.xml);

			result.xml.ToUserName = [FromUserName];
			result.xml.FromUserName = [ToUserName];

			switch (MsgType) {
				case 'text':
					result.xml.Content = ['哈哈，您输入的是：' + result.xml.Content[0]];
					break;
				case 'event':
					console.log('event');
					switch (Event) {
						case 'scancode_waitmsg':
							var ScanResult = (ScanCodeInfo.ScanResult || {})[0] || '';
							console.log(ScanResult);
							result.xml.MsgType = ['Text'];
							result.xml.Content = ['哈哈，根据我分析，您要的结果是：' + ScanResult.substring(7)];
							break;
					}
					break;
				default:
					console.log('default');
					break;
			}
			console.dir(result.xml);

			var builder = new xml2js.Builder();
			var xml = builder.buildObject(result);

			res.send(xml);
		});

	});


});

router.get('/list', function(req, res, next) {
	res.send({});
});

function getAccessToken(callback) {
	if (getAccessToken.access_token) {
		callback(null, getAccessToken.access_token);
	} else {
		request(
			'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + gzh.appID + '&secret=' + gzh.appSecret,
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

router.get('/create-menu', function(req, res, next) {
	var id = req.query.id;
	if (id !== 'kingwell') {
		res.send('Error');
		return;
	}
	request(
		'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + gzh.appID + '&secret=' + gzh.appSecret,
		function(error, response, body) {

			try {
				body = JSON.parse(body);
			} catch (ev) {

			}
			var access_token = body.access_token;

			request.post({
				url: 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + access_token,
				form: JSON.stringify({
					"template_id_short": "TM00303"
				})
			}, function(err, response, body) {
				try {
					body = JSON.parse(body);
				} catch (ev) {

				}
				var data = {
					"touser": "ojxAK05HS64u-LIi1FLZnH4PtLTM",
					//"touser": "ojxAK06rqRsctSZSrS_mrOG6gWx4",
					"template_id": body.template_id,
					"url": "https://weixin.da-qianduan.cn/weixin/gzh/me",
					// "miniprogram": {
					// 	"appid": gzh.appID,
					// 	"pagepath": "index?foo=bar"
					// },
					"data": {
						"first": {
							"value": "凯爷,恭喜你购买成功！",
							"color": "#173177"
						},
						"delivername": {
							"value": "深圳托加电子商务有限公司",
							"color": "#173177"
						},
						"ordername": {
							"value": "20180128",
							"color": "#173177"
						},
						"remark": {
							"value": "欢迎再次购买！",
							"color": "#173177"
						}
					}
				};
				//send mesg
				request.post({
					url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token,
					form: JSON.stringify(data)
				}, function(err, response, body) {
					res.send(body);
				});

			});
			//获取模板
			// request('https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=' + body.access_token, function(err, response, body) {
			// 	res.send(body);
			// });

			//设置模板
			// request.post({
			// 		url: 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=' + body.access_token,
			// 		form: JSON.stringify({
			// 			"industry_id1": "1",
			// 			"industry_id2": "4"
			// 		})

			// 	},
			// 	function(err, response, body) {
			// 		res.send(body);
			// 	});
			console.log(body.access_token);
			return;
			var data = {
				"button": [

					{
						"name": "扫码",
						"type": "scancode_waitmsg",
						"key": "rselfmenu_0_0"
					},

					{
						"type": "miniprogram",
						"name": "小程序",
						"url": "https://weixin.da-qianduan.cn/weixin/gzh/account",
						"appid": "wx0f25617740677432",
						"pagepath": "pages/index/index"
					},


					{
						"name": "我的",
						"sub_button": [{
							"name": "个人中心",
							"type": "view",
							"url": "https://weixin.da-qianduan.cn/weixin/gzh/account"
						}, {
							"name": "资讯",
							"type": "view",
							"url": "https://weixin.da-qianduan.cn/weixin/gzh/list"
						}]

					}
				]
			};
			request.post({
				url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + body.access_token,
				form: JSON.stringify(data)
			}, function(err, response, body) {
				if (error) {
					res.send(error);
				} else {
					res.send(body);
				}
			});

		});

});
router.get('/me', function(req, res, next) {

	//通过code换取网页授权access_token
	request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + gzh.appID + '&secret=' + gzh.appSecret + '&code=' + req.query.code + '&grant_type=authorization_code', function(err, response, body) {

		try {
			body = JSON.parse(body);
		} catch (ev) {

		}
		webutils.info(err, body);
		if (!body.access_token) {
			res.redirect('account');
		} else {
			//拉取用户信息(需scope为 snsapi_userinfo)
			request('https://api.weixin.qq.com/sns/userinfo?access_token=' + body.access_token + '&openid=' + body.openid + '&lang=zh_CN', function(err, response, body) {
				var openid = '';
				try {
					body = JSON.parse(body);
				} catch (ev) {

				}
				openid = body.openid;
				console.log(body);
				db.find('user', {
					findType: 'findOne',
					query: {
						openid: openid
					}
				}, function(err, rs) {
					if (rs) {
						db.update('user', {
							query: {
								openid: openid
							},
							update: {
								loginTime: Date.now(),
								lastLoginTime: Date.now()
							}
						}, function(err, rs) {
							console.log(err, rs);
						});
					} else {
						db.save('user', {
							save: {
								type: 2,
								//userName: body.nickname,
								openid: openid,
								weixiInfo: body
							}
						}, function(err, rs) {
							console.log(err, rs);
						});
					}
				});

				res.renderNormal('weixin/gzh', {
					layout: 'layout/weixin-gzh-layout',
					user: body,
					name: '微信',
					title: '我'
				});

			});
		}

	});

});
/**
 * 跳转
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {String} next) {	var        url [description]
 * @return {[type]}       [description]
 */
router.get('/account', function(req, res, next) {

	var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + gzh.appID + '&redirect_uri=https://weixin.da-qianduan.cn/weixin/gzh/me&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

	res.redirect(url);

});
var ticket = '';



router.get('/signature', function(req, res, next) {

	var nonceStr = (Math.random().toString(32).substring(2) + Math.random().toString(32).substring(2)).substring(0, 16);
	var timestamp = (Date.now()).toString().slice(0, 10);
	var url = 'https://weixin.da-qianduan.cn/weixin/gzh/me';
	var getStr = function(jsapi_ticket) {


		//2. 将三个参数字符串拼接成一个字符串进行sha1加密
		var str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url;
		var sha1Code = crypto.createHash("sha1");
		var signature = sha1Code.update(str, 'utf-8').digest("hex");

		return {
			str: str,
			appId: gzh.appID,
			signature: signature,
			nonceStr: nonceStr,
			jsapi_ticket: jsapi_ticket,
			timestamp: timestamp,
			url: url
		};
	};
	getAccessToken(function(err, access_token) {
		if (ticket) {
			res.send(getStr(ticket));
		} else {
			request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi', function(err, response, body) {
				try {
					body = JSON.parse(body);
				} catch (ev) {

				}
				ticket = body.ticket;
				res.send(getStr(ticket));
			});
		}

	});


});

function getOpenId(callback) {

	getAccessToken(function(err, access_token) {

		request('https://api.weixin.qq.com/cgi-bin/user/get?access_token=' + access_token, function(err, response, body) {
			var data;
			var openid = [];
			try {
				body = JSON.parse(body);
			} catch (ev) {
				body = {};
			}
			data = body.data || {};
			openid = data.openid || [];

			if (err) {
				next();
			} else {
				callback(openid);
			}
		});
	});
}


function sendMessage(obj, callback) {

	getAccessToken(function(err, access_token) {

		request.post({
			url: 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=' + access_token,
			form: JSON.stringify({
				"template_id_short": "TM00303"
			})
		}, function(err, response, body) {
			try {
				body = JSON.parse(body);
			} catch (ev) {

			}
			console.log('body', body)
			var data = {
				"touser": "ojxAK0-EvDeo7fw0fzcvfcyIFl9A",
				//"touser": "ojxAK06rqRsctSZSrS_mrOG6gWx4",
				"template_id": body.template_id,
				"url": "https://weixin.da-qianduan.cn/weixin/gzh/me",
				// "miniprogram": {
				// 	"appid": gzh.appID,
				// 	"pagepath": "index?foo=bar"
				// },
				"data": {
					"first": {
						"value": "凯爷,恭喜你购买成功！",
						"color": "#173177"
					},
					"delivername": {
						"value": "深圳托加电子商务有限公司",
						"color": "#173177"
					},
					"ordername": {
						"value": "20180128",
						"color": "#173177"
					},
					"remark": {
						"value": "欢迎再次购买！",
						"color": "#173177"
					}
				}
			};
			//send mesg
			request.post({
				url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_token,
				form: JSON.stringify(data)
			}, function(err, response, body) {
				try {
					body = JSON.parse(body);
				} catch (ev) {

				}

				callback(body);
			});

		});
	});

}


router.get('/user-list', function(req, res, next) {


	sendMessage({}, function(body) {
		getOpenId(function(list) {
			res.send({
				body: body,
				list: list
			});
		});
	});
});

module.exports = router;