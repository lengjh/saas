var webutils = require('webutils');

var referer;

module.exports = function(req, res, next) {
	var user = req.session.user;
	//要登录的页面
	var pathArr = ['/chat', '/sadmin'];
	//登录注册页面
	var loginArr = ['/login', '/sign-up'];

	var isExist = function(item, arr) {
		var status = false;
		arr.forEach(function(_item) {
			if (item.indexOf(_item) !== -1) {
				status = true;
			}
		});
		return status;
	};
	var status = isExist(req.url, pathArr);

	res.user = user;


	if (req.url.indexOf('/api') !== -1) {
		// if (!user) {
		// 	res.renderResult(null, {
		// 		status: -1,
		// 		message: '没有权限操作'
		// 	});
		// 	return;
		// }
	}

	if (isExist(req.url, loginArr) && user) {
		res.redirect('/');
		return;
	}
	referer = req.headers['referer'];

	if (status) {

		if (user) {
			webutils.info('已登录:' + JSON.stringify(user));
		} else {
			res.redirect('/login?backUrl=' + encodeURIComponent(req.url));
			webutils.error('未登录');
			return;
		}
		//console.log('要登录的');
	} else {
		//console.log('不要登录的');
	}
	next();

};