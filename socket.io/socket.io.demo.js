const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const path = require('path');
const webutils = require('webutils');
var port = '';
app.listen(8001, function() {
	port = this._connectionKey.slice(5);
	webutils.success(`${new Date().toLocaleString()} The sockit.io's Server is runing... \nuse var socket = io.connect('http://locals:${port}/') \n`);
});

function handler(req, res, next) {
	res.write('Good The sockit.io\'s Server is runing...');
	res.end();
}

io.on('connection', function(socket) {
	console.log('con');
	socket.on('my other event', function(data) {
		console.log(data);
		socket.emit('message', {
			welcome: data.message
		});
	});
});