(function(window, $, undefined) {
	//菜单数据结构
	var menuList = [{
		id: '01',
		title: 'Admin 设置',
		children: [{
			title: '设置',
			url: '/admin/site'
		}, {
			title: '流程',
			url: '/admin/follow'
		}, {
			title: '联系',
			url: '/admin/contact'
		}, {
			title: '服务',
			url: '/admin/service'
		}, {
			title: '标签',
			url: '/admin/tag'
		}, {
			title: 'Banner',
			url: '/admin/banner'
		}, {
			title: '案例',
			url: '/admin/case'
		}, {
			title: '小程序',
			url: '/admin/weixin/xcx'
		}]
	}, {
		title: '微信',
		children: [{
			title: '小程序',
			url: '/admin/weixin/xcx'
		}]

	}];

	//参数设置
	var options = {
		debug: true, //调试，开发模式，日志信息
		//restore: true, //刷新后是否恢复还没实现
		menuList: menuList, //菜单

		event: function(ev) { //所有操作都会执行Event方法
			var status;
			return status; //如果此方法反回false，任何操作都无效，像新开，关闭，选中等，方法做务逻辑操作
		},
		menuContext: '#pageMenu', //菜单容器
		subMenuContext: '#subMenu', //子菜单容器
		tabContext: '#tabPageNav', //Tab容器
		iframeContent: '#tabPageIframe', //iframe容器
	};

	//start
	var tabPage = new Tagpage(options);

	//手手动操作
	// tabPage.open({
	// 	title: '模版文件',
	// 	url: '/html/admin/template.html',
	// 	close: false
	// });
	tabPage.open({
		title: '设置',
		url: '/admin/site'
	});



	// window.onbeforeunload = function(e) {
	// 	var text = '关闭提示';
	// 	e = e || window.event;
	// 	if (e) {
	// 		e.returnValue = text;
	// 	}
	// 	return text;
	// };

	$('body')
		//显示，隐藏一级目录
		.on('click', '#editMenu', function() {
			$('.page-menu').toggleClass('page-menu-fixed');
		})
		//显示隐藏二级目录
		.on('click', '#subMenuIcon', function() {
			$('#subMenu').toggleClass('page-sub-menu-fixed');
		});



	window.tabPage = tabPage;

})(window, window.jQuery);