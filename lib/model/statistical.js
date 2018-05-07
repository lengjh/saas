 var webutils = require('webutils');

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var statistical = new Schema({
 	id: ObjectId,
 	userAgent: {
 		type: String,
 		default: ''
 	},
 	referrer: {
 		type: String
 	},
 	userInfo: {
 		type: Object
 	},
 	location: {
 		type: String
 	},
 	performance: {
 		type: String
 	},
 	createTime: {
 		type: Date
 	}
 });

 module.exports = mongoose.model('Statistical', statistical);