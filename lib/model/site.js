 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

 var site = new Schema({
 	id: ObjectId,
 	name: {
 		type: String,
 		default: ''
 	},
 	title: {
 		type: String,
 		default: ''
 	},
 	subTitle: {
 		type: String,
 		default: ''
 	},
 	description: {
 		type: String,
 		default: ''
 	},
 	keywords: {
 		type: String,
 		default: ''
 	},
 	who: {
 		type: String,
 		default: ''
 	},
 	content: {
 		type: String,
 		default: ''
 	},
 	logo: {
 		type: String,
 		default: ''
 	},
 	imagesUrl: {
 		type: Array,
 		default: []
 	},
 	type: {
 		type: Number,
 		default: 0
 	},
 	permissions: {
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

 module.exports = mongoose.model('Site', site);