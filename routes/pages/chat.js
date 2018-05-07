var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
	var user = req.session.user || '{userName:"kingwell"}';
	var id = req.params.id;
	res.renderNormal('chat/chat', {
		layout: false,
		id: id,
		user: JSON.stringify(user),
		name: req.query.name || '',
		title: 'chat'
	});
});

module.exports = router;