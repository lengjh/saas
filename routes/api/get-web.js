var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();
var db = require('../../lib/model/db');
var i = 1000;
var timer = setInterval(function() {
	i++;
	if (i > 124) {
		clearInterval(timer);
	}

	(function(i) {
		request('http://www.css88.com/page/' + i, function(error, response, body) {

			if (!body) {
				return;
			}
			console.log('i', i);
			var $ = cheerio.load(body);

			$('.read-more a').each(function() {

				var url = $(this).attr('href');
				if (!url) {
					return;
				}
				request(url, function(error, response, body) {
					if (!body) {
						return;
					}
					var $ = cheerio.load(body);
					var save = {
						name: $('.entry-title').text(),
						content: $('.entry-content').html(),
						imageUrl: $('.entry-content img').attr('src')
					};

					if (save.name && save.content && save.imageUrl) {
						db.save('item', {
							save: save
						}, function(err, rs) {
							console.log(err, rs);
						});
					}

				});


			});

		});
	})(i);


}, 1000);

router.get('/', function(req, res, next) {


	res.send({});
});

module.exports = router;