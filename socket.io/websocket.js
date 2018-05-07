module.exports = function() {

	// const WebSocket = require('ws');

	// const wss = new WebSocket.Server({
	// 	port: 8080
	// });

	// // Broadcast to all. 
	// wss.broadcast = function broadcast(data) {
	// 	wss.clients.forEach(function each(client) {
	// 		if (client.readyState === WebSocket.OPEN) {
	// 			client.send(data);
	// 		}
	// 	});
	// };

	// wss.on('connection', function connection(ws) {
	// 	setInterval(function() {
	// 		ws.send('data');
	// 	}, 1000);
	// 	ws.on('message', function incoming(data) {
	// 		console.log('get data ',data);
	// 		// Broadcast to everyone else. 
	// 		wss.clients.forEach(function each(client) {
	// 			if (client !== ws && client.readyState === WebSocket.OPEN) {
	// 				console.log('201');
	// 				client.send(data);
	// 			}
	// 		});
	// 	});
	// });
	return {};
};