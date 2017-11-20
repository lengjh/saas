 var webutils = require('webutils');

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var statistical = new Schema({
 	id: ObjectId,
 	timing: {
 		type: String,
 		default: ''
 	},
 	userAgent: {
 		type: String,
 		default: ''
 	},
 	referrer: {
 		type: String,
 		default: ''
 	},
 	location: {
 		type: String,
 		default: ''
 	},
 	createTime: {
 		type: Date,
 		default: Date.now
 	}
 });

 module.exports = mongoose.model('Statistical', statistical);