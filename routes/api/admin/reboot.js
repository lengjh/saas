var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

router.get('/', function(req, res, next) {
	//const ls = spawn('pm2', ['logs']);

	if (req.session.user) {

	} else {

	}
	res.renderResult('200');
	// ls.stdout.on('data', (data) => {
	// 	console.log(`stdout: ${data}`);
	// });

	// ls.stderr.on('data', (data) => {
	// 	console.log(`stderr: ${data}`);
	// });

	// ls.on('close', (code) => {

	// 	console.log(`-----------------------------------child process exited with code ${code}`);
	// });

});

module.exports = router;