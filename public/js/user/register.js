define(['jquery'], function($) {

	$('body').on('keydown', function(ev) {

		if (ev.which === 13) {
			register();
		}
	});

	var $userName = $('[name="userName"]');
	var $password = $('[name="password"]');
	var $code = $('[name="code"]');

	$('#registerBtn').on('click', function(ev) {
		ev.preventDefault();
		register();
	});

	function register() {
		var userName = $userName.val();
		var password = $password.val();
		var code = $code.val();


		if (!userName.length) {
			$userName.focus();
			return;
		}
		if (!password.length) {
			$password.focus();
			return;
		}
		if (!code.length) {
			$code.focus();
			return;
		}
		console.log(userName, password, code);
		$.post('/api/user/register', {
			code: code,
			userName: userName,
			password: password
		}, function(res) {
			console.log(res);
			if (res.data) {
				alert('注册成功');
				location.href = '/login';
			} else {
				alert(res.message);
			}
		});
	}
});