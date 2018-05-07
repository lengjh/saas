 var webutils = require('webutils');

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var logs = new Schema({
 	id: ObjectId,
 	timing: {
 		type: String,
 		default: ''
 	},
 	editType: {
 		type: String,
 		default: ''
 	},
 	dbName: {
 		type: String,
 		default: ''
 	},
 	dbID: {
 		type: String,
 		default: ''
 	},
 	who: {
 		type: String,
 		default: ''
 	},
 	result: {
 		type: String,
 		default: ''
 	},
 	location: {
 		type: String,
 		default: ''
 	},
 	createTime: {
 		type: Date,
 		default: Date.now()
 	}
 });

 module.exports = mongoose.model('Logs', logs);