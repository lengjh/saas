 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var banner = new Schema({
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
 	link: {
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
 	who: {
 		type: String,
 		default: ''
 	},
 	like: {
 		type: Number,
 		default: 0
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

 module.exports = mongoose.model('Banner', banner);