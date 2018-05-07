$(function() {
	$('body').on('click', 'a', function(ev) {
		var url = $(this).attr('href');

		if (url !== '#' || !url) {
			ev.preventDefault();
			HZ.openPage({
				id: 'hz',
				title: $(this).text(),
				url: url
			});
		}

	});

});

//分页demo
$(function() {
	if (!window.kkpager) {
		return;
	}

	function paging(index) {
		var index = (index && index < 1) ? 1 : index;
		var total = 100;
		var pageSize = 10;
		//生成分页控件  
		kkpager.generPageHtml({
			pagerid: 'pagingContent',
			pno: index,
			mode: 'click', //可选，默认就是link
			//总页码  
			total: Math.ceil(total / pageSize),
			//总数据条数  
			totalRecords: total,
			click: function(n) {
				this.selectPage(n);
				paging(n);
				return false;
			}
		});
	}

	paging(1);

});


