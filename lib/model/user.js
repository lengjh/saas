var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var user = new Schema({
	id: ObjectId,
	type: {
		type: Number,
		default: 0 //1注册用户，2微信用户，3QQ用户
	},
	permissions: {
		type: Number,
		default: -1
	},
	author: {
		type: String,
		default: ''
	},
	nickname: {
		type: String,
		default: ''
	},
	headImgUrl: {
		type: String,
		default: ''
	},
	userName: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	age: {
		type: Number,
		default: 0
	},
	email: {
		type: String,
		default: ''
	},
	sex: {
		type: Number,
		default: ''
	},
	avatarUrl: {
		type: String,
		default: ''
	},
	openid: {
		type: String,
		default: ''
	},
	weixiInfo: {
		type: Object,
		default: {}
	},
	lastLoginTime: {
		type: Date
	},
	createTime: {
		type: Date
	},
	loginTime: {
		type: Date
	},
	updateTime: {
		type: Date
	}
});

module.exports = mongoose.model('User', user);