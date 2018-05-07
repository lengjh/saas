 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var item = new Schema({
 	id: ObjectId,
 	title: {
 		type: String,
 		default: ''
 	},
 	name: {
 		type: String,
 		default: ''
 	},
 	content: {
 		type: String,
 		default: ''
 	},
 	imageUrl: {
 		type: String,
 		default: ''
 	},
 	imagesUrl: {
 		type: Array,
 		default: []
 	},
 	tags: {
 		type: Array,
 		default: []
 	},
 	who: {
 		type: String,
 		default: ''
 	},
 	like: {
 		type: Number,
 		default: 0
 	},
 	read: {
 		type: Number,
 		default: 1
 	},
 	type: {
 		type: Number,
 		default: 0
 	},
 	updateTime: {
 		type: Date,
 		default: Date.now()
 	},
 	createTime: {
 		type: Date,
 		default: Date.now()
 	}
 });

 module.exports = mongoose.model('Item', item);