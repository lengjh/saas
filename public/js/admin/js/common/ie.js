 (function(window, $) {
 	var $subMenu = $('#subMenu');
 	var $pageWrap = $('.layout-page-body');
 	var $pageContent = $('.page-content');
 	var $pageMenu = $('.page-menu');
 	var $layoutPageTopHeight = $('.layout-page-top');
 	var $pageContentBody = $('.page-content-body');
 	var $tabPageNav = $('#tabPageNav');
 	var $pageContentFooter = $('.page-content-footer');
 	var $layoutPageBodyMain = $('.layout-page-body-main');

 	function setSize() {

 		var windowWidth = $(window).width();
 		var windowHeight = $(window).height();

 		var menuWidth = $pageMenu.outerWidth();

 		var pageContentBodyWidth = $pageContentBody.outerWidth();

 		var layoutPageTopHeight = $layoutPageTopHeight.outerHeight();
 		var tabPageNavHeight = $tabPageNav.outerHeight();
 		var pageContentFooterHeight = $pageContentFooter.outerHeight();
 		var layoutPageBodyMainWidth = $layoutPageBodyMain.outerWidth();

 		var fixdWidth = 180;
 		$pageWrap.height(windowHeight);


 		//width
 		$pageContent.width(layoutPageBodyMainWidth - $pageMenu.outerWidth() - $subMenu.width() - 5);

 		$pageContentBody.height(windowHeight - tabPageNavHeight - pageContentFooterHeight - layoutPageTopHeight);

 		console.log(windowWidth, ' ', windowHeight);
 	}

 	var timer;
 	$(window).resize(function() {
 		clearTimeout(timer);
 		timer = setTimeout(function() {
 			setSize();
 		}, 20);
 	});
 	$('body').on('click', 'a', function() {
 		setSize();
 	});
 	setSize();

 })(window, jQuery);