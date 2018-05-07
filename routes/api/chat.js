var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');

router.get('/:roomId', function(req, res, next) {
	var roomId = req.params.roomId;
	var user = req.session.user;

	db.find('Chat', {
		query: {
			roomId: roomId
		}
	}, function(err, docs) {
		if (err) {
			res.error(err);
		} else {
			res.renderResult(docs);
		}
	});

});

router.get('/', function(req, res, next) {
	db.find('Chat', {
		pageSize: ~~req.query.pageSize,
		pageIndex: ~~req.query.pageIndex,
		query: {
			roomId: req.query.roomId
		},
		list: ['nickname', 'message', 'createDate', 'roomId', 'createTime', 'userName']
	}, function(err, docs) {
		res.send(docs || []);
	});
});

router.post('/', function(req, res, next) {
	var body = req.body;
	var nickname = body.nickname;
	var userName = body.userName;
	var message = body.message;
	var roomId = body.roomId;
	var messageType = body.messageType;

	db.save('Chat', {
		save: {
			nickname: nickname,
			userName: userName,
			message: message,
			roomId: roomId
		}
	}, function(err, doc) {

		var newObject = {};
		if (!err && doc) {
			newObject.userName = doc.userName;
			newObject.nickname = doc.nickname;
			newObject.message = doc.message;
			newObject.roomId = doc.roomId;
			newObject.createTime = doc.createTime;
			res.send(newObject);
		} else {
			res.send({});
		}
	});
});
//router.get('', function(req, res, next) {});
module.exports = router;