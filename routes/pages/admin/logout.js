var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.user = null;
	res.redirect('/admin');
});

module.exports = router;