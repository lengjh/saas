var webutils = require('webutils');
var Chat = require('../lib/model/chat');

module.exports = function(server) {

	var rooms = [];
	var showRooms = function() {
		webutils.info('聊天室', rooms);
	};
	var showAllRooms = function(socket, rooms) {
		rooms.forEach(function(item) {
			socket.to(item).emit('change', {
				numUsers: numUsers
			});
		});
	};
	// Chatroom
	var io = require('socket.io')(server);
	io.use(function(socket, next) {
		var roomId = socket.handshake.query.roomId;

		if (undefined === roomId) {
			socket.send('链接错误');
			return;
		} else {
			next();
		}

	});

	function log(roomId, data, info) {
		webutils.info(roomId, data, info || '');
	}
	var numUsers = 0;
	var currentRoomUsers = {};

	function getDateTime() {
		return new Date().toLocaleTimeString();
	}

	io.on('connection', function(socket) {
		var addedUser;
		var roomId = socket.handshake.query.roomId;
		var rd;

		webutils.success('聊天室【' + roomId + '】连接成功');

		if (!socket[roomId]) {
			socket[roomId] = {};
		}
		rd = socket[roomId];

		if (!addedUser) {
			addedUser = {};
		}
		addedUser[roomId] = false;

		if (-1 === rooms.indexOf(roomId)) {
			rooms.push(roomId);
		}
		showRooms();


		if (undefined === currentRoomUsers[roomId]) {
			currentRoomUsers[roomId] = 0;
		}

		// when the client emits 'new message', this listens and executes
		socket.on('new message', function(data) {
			log(roomId, data);
			// we tell the client to execute 'new message'
			socket.to(roomId).emit('new message', {
				dateTime: getDateTime(),
				username: rd.username,
				message: data
			});
			var chat = new Chat({
				roomId: roomId,
				who: rd.username,
				message: data
			});
			chat.save(function(err, result) {});

		});

		// when the client emits 'add user', this listens and executes
		socket.on('add user', function(username) {

			if (addedUser[roomId]) {
				return
			};
			log(roomId, username);
			// we store the username in the socket session for this client
			rd.username = username;
			++numUsers;
			++currentRoomUsers[roomId];
			addedUser[roomId] = true;
			socket.join(roomId);
			socket.emit('login', {
				dateTime: getDateTime(),
				numUsers: numUsers,
				currentRoomUsers: currentRoomUsers[roomId]
			});

			// echo globally (all clients) that a person has connected
			socket.to(roomId).emit('user joined', {
				dateTime: getDateTime(),
				username: rd.username,
				numUsers: numUsers,
				currentRoomUsers: currentRoomUsers[roomId]
			});
			webutils.info('总人数：' + numUsers);

			showAllRooms(socket, rooms);

		});

		// when the client emits 'typing', we broadcast it to others
		socket.on('typing', function() {
			log(roomId, rd.username, 'typing');
			socket.to(roomId).emit('typing', {
				dateTime: getDateTime(),
				username: rd.username
			});
		});

		// when the client emits 'stop typing', we broadcast it to others
		socket.on('stop typing', function() {
			log(roomId, rd.username, 'stop typing');
			socket.to(roomId).emit('stop typing', {
				dateTime: getDateTime(),
				username: rd.username
			});
		});


		// when the user disconnects.. perform this
		socket.on('disconnect', function(data) {

			webutils.error('聊天室【' + roomId + '】丢失连接');

			if (addedUser[roomId]) {

				log(roomId, rd.username, 'disconnect');
				--numUsers;
				--currentRoomUsers[roomId];

				if (currentRoomUsers[roomId] <= 0) {
					rooms.splice(rooms.indexOf(roomId), 1);
					showRooms();
				}
				// echo globally that this client has left
				socket.to(roomId).emit('user left', {
					dateTime: getDateTime(),
					username: rd.username,
					numUsers: numUsers,
					currentRoomUsers: currentRoomUsers[roomId]
				});
			}
			showAllRooms(socket, rooms);

		});
	});

};