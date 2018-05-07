define(['jquery'], function($) {

	$('body').on('keydown', function(ev) {
		if (ev.which === 13) {
			login();
		}
	});

	var $userName = $('[name="userName"]');
	var $password = $('[name="password"]');

	$('#loginBtn').on('click', function(ev) {
		ev.preventDefault();
		login();
	});

	function login() {
		var userName = $userName.val();
		var password = $password.val();


		if (!userName) {
			$userName.focus();
			return;
		}
		if (!password) {
			$password.focus();
			return;
		}
		console.log(userName, password);
		$.post('/api/user/login', {
			userName: userName,
			password: password
		}, function(res) {
			console.log(res);
			if (res.data) {
				location.reload();
			} else {
				alert(res.message);
			}
		});
	}
});