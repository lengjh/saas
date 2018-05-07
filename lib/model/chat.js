var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var chat = new Schema({
	id: ObjectId,
	userId: {
		type: String,
		default: ''
	},
	userName: {
		type: String,
		default: ''
	},
	roomId: {
		type: String,
		default: ''
	},
	who: {
		type: String,
		default: ''
	},
	message: {
		type: String,
		default: ''
	},
	ip: {
		type: String,
		default: ''
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	createTime: {
		type: Date,
		default: Date.now
	}
});
var Chat = mongoose.model('Chat', chat);

module.exports = Chat;