var crypto = require('crypto');
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		"Connection": "keep-alive"
	});

	setInterval(function() {
		res.write("data: " + Date.now() + "\n\n");
	}, 1000);
	// setTimeout(function() {
	// 	res.send('0');
	// }, 2000);

});
module.exports = router;