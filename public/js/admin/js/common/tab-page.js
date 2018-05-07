(function(window, $) {
	'use strict';

	//选择二级菜单
	$.fn.selectMenu = $.fn.selectMenu || function(options) {
		var ops = $.extend({
			currentStyle: 'current-item',
			statusStyle: 'menu-status',
			selectByAttr: 'data-url'
		}, options);

		return this.each(function() {
			var $this = $(this);
			$this.on('click', 'a', function() {
				var $a = $(this);
				var attr = $(this).attr(ops.selectByAttr);
				var $subMenu = $(this).next('ul');
				$this.find('ul').stop(true);

				//隐藏，显示子级
				$(this).parent('li').children('ul').slideToggle(function() {

					if ($subMenu.is(':visible')) {
						$a.addClass(ops.statusStyle);
					} else {
						$a.removeClass(ops.statusStyle);
					}
				});

				//箭头状态
				if ($subMenu.length) {} else {}

				if (!attr) {
					//return;
				}
				//选中
				$this.find('a').removeClass(ops.currentStyle);
				$(this).addClass(ops.currentStyle);

			});
		});
	};

	/**
	 * [TagPage description]
	 * @ description
	 * @param {[type]} options [description]
	 */
	function TagPage(options) {
		this.ops = $.extend({
			el: 'body',
			menuContext: '',
			tabContext: '',
			iframeContent: ''
		}, options);

		//Events 
		this.event = this.ops.event || this.event;
		this.__event = function(event) {
			var ev = event || {};
			ev.timestamp = Date.now();
			ev.version = this.version;
			return this.event(ev);
		};
		try {
			var debug = localStorage.getItem('debug') === 'true';
		} catch (ev) {

		}
		this.debug = debug || this.ops.debug;

		if (this && this.constructor !== Tagpage) {
			return new Tagpage(options);
		}
		this.init();

	}
	TagPage.prototype = {
		version: '1.0.0',
		constructor: TagPage,
		name: 'tabPage',
		__id: '_T_P_', //String.fromCharCode(31),
		debug: false,
		className: {
			current: 'current-item'
		},
		defaults: {
			newTabTitle: '新开页面'
		},
		origin: ['*'], //允许的域名操作
		getString: function(num) {
			var result = [];
			var len = Math.ceil((undefined !== num ? num : 32) / 12);
			for (var i = 0; i < len; i++) {
				result.push(Math.random().toString(36).slice(2));
			};
			return result.join('').slice(0, num);
		},
		interface: function() {
			var status = true;
			if ($(this.ops.menuContext).length === 0) {

				throw '缺少参数menuContext';
			}
			if ($(this.ops.tabContext).length === 0) {
				throw '缺少参数tabContext';
			}
			if (!status) {
				this.__event({
					message: '缺少必要参数',
					eventType: 'error'
				});
			}
			return status;
		},
		init: function() {
			if (!this.interface()) {
				return;
			}
			this.el = $(this.ops.el);
			this.menu = $(this.ops.menuContext);
			this.subMenu = $(this.ops.subMenuContext);
			this.tab = $(this.ops.tabContext);
			this.iframe = $(this.ops.iframeContent);
			//this.__restore();
			//this.log();

			this.setMenu();
			this.setContextmenu();
			this.events();
			if (this.debug) {
				this.log('%cDEV MODE', 'color:#f00;height:100px; line-height:100px; font-size:100px; padding:10px;text-shadow:1px 1px 0 gray,2px 2px 0 gray,3px 3px 0 gray;,4px 4px 0 gray;background-image:url(http://img.huizecdn.com/com/huize-logo/100_100.png); background-repeat:no-repeat; background-position:center left; padding-left:120px');
			}
		},
		event: function(ev) {
			this.log(ev);
		},
		events: function() {
			var _this = this;

			this.el
				.on('click', '[rel]', function(ev) {
					var type = $(this).attr('rel');
					var id = $(this).data('id');
					var url = $(this).data('url');
					var title = $(this).data('title');
					var parentId = $(this).data('parentid');
					ev.stopPropagation();
					ev.preventDefault();

					if (undefined === id) {
						id = _this.__getRealIDStr();
						$(this).data('id', id).attr('data-id', id);

					}
					if (!type) {
						return;
					}

					if ('tab' === type || 'menu' === type) {

						if (_this.hasPage(id)) {
							_this.selectPage(id, parentId);
						} else {
							_this.open({
								title: title,
								url: url,
								parentId: parentId,
								id: id
							});
						}

					} else if ('close' === type) {
						_this.close(id);
					}


				});


			$(this.menu).selectMenu();

			//兼听Open
			window.addEventListener('message', function(ev) {
				var data = ev.data || {};
				if (data.originType === 'tabPage') {
					data.origin = ev.origin;

					if (false === _this.__event({
							data: data,
							eventType: 'open',
							message: '来自' + ev.origin + '打开页面',
							origin: ev.origin
						})) {
						return;
					}
					switch (data.type) {
						case 'open':
							_this.open(data);
							break;
						case 'close':
							_this.close(data.id);
							break;
						case 'select':
							_this.selectPage(data.id, data.parentId);
							break;
						case 'setTitle':
							_this.setTitleById(data.id, data.newTitle);
							break;
					}
				}
			}, false);

			window.addEventListener('hashchange', function(ev) {
				var newURL = ev.newURL || '';
				var hash = newURL.slice(newURL.indexOf('#'));
				var _hash = (hash || '').slice(1);
				//console.log(hash, location.hash);
				//console.log(ev.oldURL, ev.newURL);
				if (_this.hasPage(_hash)) {
					//_this.selectPage(_hash, null, true);
				} else {
					//_this.menu.find('a[data-id="' + _this.__getRealIDStr(hash) + '"]').click();
				}

			}, false);

			//console.log(_this.__getRealIDStr((location.hash || '').slice(1)));

			//_this.menu.find('a[data-id="' + _this.__getRealIDStr((location.hash || '').slice(1)) + '"]').click();


		},
		log: function() {
			if (this.debug) {
				try {
					console.log.apply(this, arguments);
				} catch (ev) {}
			}

		},
		setContextmenuStatus: function(a) {
			var _this = this;
			var disableStyle = 'admin-tab-contextmenu-disabled';
			var $close = _this.$contextmenu.find('[data-type="close"]');
			var $closeOther = _this.$contextmenu.find('[data-type="closeOther"]');
			var $closeAll = _this.$contextmenu.find('[data-type="closeAll"]');
			var closeLength = this.tab.find('[rel][data-close="true"]').length;
			var unCloseLength = this.tab.find('[rel][data-close="false"]').length;
			//console.log(closeLength, unCloseLength);
			if (_this.tab.find('a[rel]').length <= 1 || 0 === closeLength) {
				$close.addClass(disableStyle);
				$closeOther.addClass(disableStyle);
				$closeAll.addClass(disableStyle);
			} else {

				if ($(a).data('close')) {
					$close.removeClass(disableStyle);
				} else {
					$close.addClass(disableStyle);
				}

				$closeOther.removeClass(disableStyle);
				$closeAll.removeClass(disableStyle);

			}
			if (0 === unCloseLength) {

			}


		},
		contextmenu: function() {},
		setContextmenu: function() {
			var _this = this;
			var htmlResult = [
				'<div class="admin-tab-contextmenu" id="">',
				'	<ul>',
				'		<li data-type="refresh">刷新</li>',
				'		<li data-type="" class="admin-tab-contextmenu-line"></li>',
				'		<li data-type="close">关闭</li>',
				'		<li data-type="closeOther">关闭其它</li>',
				'		<li data-type="closeAll" class="admin-tab-contextmenu-disabled">关闭所有</li>',
				'		<li data-type="open" class=" ">地址栏打开</li>',
				'	</ul>',
				'</div>'
			].join('');

			this.$contextmenu = $(htmlResult);
			this.$contextmenu.appendTo('body');

			this.$contextmenu
				.on('contextmenu', function(ev) {
					ev.stopPropagation();
					ev.preventDefault();
				})
				.on('mouseenter', function() {
					clearTimeout(_this.contextmenuTimer);
				})
				.on('mouseleave', function() {
					_this.hideContextmenu();
				})
				.on('click', 'li', function() {
					var type = $(this).data('type');
					var url = $(this).data('url');
					var id = _this.$contextmenu.data('id');

					if ($(this).hasClass('admin-tab-contextmenu-disabled')) {
						return;
					}
					switch (type) {
						case 'refresh':
							_this.refresh(id);
							break;
						case 'close':
							_this.close(id);
							break;
						case 'closeOther':
							_this.closeOther(id);
							break;
						case 'closeAll':
							_this.closeAll(id);
							break;
						case 'open':
							_this.__open(_this.tab.find('a[rel="tab"][data-id="' + id + '"]').data('url'));
							break;
					}
					_this.$contextmenu.hide();
				});
		},
		__getMenuItem: function(title, attr, icon) {
			var attr = _this.getAttr(item);
			icon = icon || '<span class="menu-arrow"></span>';
			return '<li><a rel="menu" class="admin-menu-item level-1-menu-item" href="" ' + attr + '>' + icon + '<storng>' + title + '</storng></a></li>';
		},
		setMenu: function(menuList) {
			var _this = this;
			var list = menuList || this.ops.menuList || [];
			var html = [];
			var $ul;
			html.push('<ul class="level-1-menu">');

			$.each(list, function(index, item) {
				item.id = _this.__getRealIDStr(item.id);
				var attr;
				var children = item.children || [];
				var childrenHtml = [];
				//var parentId = item.id;
				item.parentId = _this.getString(10);
				attr = _this.getAttr(item);
				//var arrowHtml = children.length ? '<span class="menu-arrow"></span>' : '';
				var arrowHtml = '<span class="menu-arrow"></span>';
				$.each(children, function(index, subItem) {
					var subAttr;
					var iconHtml = subItem.icon || '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>';
					subItem.parentId = item.parentId + ',' + _this.getString(10);
					if (undefined === subItem.id) {
						subItem.id = _this.__getRealIDStr();
						//parentId = subItem.id;
					}
					subAttr = _this.getAttr(subItem);

					if (0 === index) {
						childrenHtml.push('<ul>');
					}
					childrenHtml.push('<li><a rel="menu" href="' + subItem.url + '" class="admin-menu-item admin-sub-menu" ' + subAttr + '>' + iconHtml + '<strong>' + subItem.title + '</strong></a></li>');
					if (index === children.length - 1) {
						childrenHtml.push('</ul>')
					}
				});

				html.push('<li><a rel="menu" class="admin-menu-item level-1-menu-item" href="" ' + attr + '>' + arrowHtml + '<storng>' + item.title + '</storng></a>' + childrenHtml.join('') + '</li>');
			});
			html.push('</ul>');
			$ul = $(html.join(''));
			$ul.on('click', '[rel].admin-sub-menu', function() {
				_this.setSubMenu(this);
			});
			this.menu.html($ul);

		},
		setSubMenu: function(a) {
			var _this = this;
			var obj = $(a).data();
			var html = [];
			var children = obj.children || [];
			var parentId = obj.parentid;


			if (children.length) {
				this.subMenu.removeClass('page-sub-menu-fixed');
			} else {
				this.subMenu.addClass('page-sub-menu-fixed');
			}

			$.each(children, function(index, item) {
				var attr;

				item.id = _this.__getRealIDStr(item.id);
				attr = _this.getAttr(item);

				if (0 === index) {
					html.push('<ul>');
				}
				html.push('<li><a class="submenu-item" rel="menu" href="" ' + attr + ' data-parentid="' + obj.parentid + '">' + item.title + '</a></li>');
				if (children.length - 1 === index) {
					html.push('</ul>');
				}
			});
			var $li = $(html.join(''));
			$li.on('click', '[rel]', function() {
				return;
				var id = $(this).data('id');
				var parentid = $(this).data('parentid');
				_this.selectPage(id, parentid);
				setTimeout(function() {
					//_this.menu.find('[data-parentid="' + parentid + '"]').addClass(_this.className.current);
				}, 0);
			});
			this.subMenu.find('dt').text(obj.title);
			this.subMenu.find('dd').html($li);
		},
		//设置属性
		getAttr: function(ops) {

			var html = [];
			for (var key in ops) {
				var item = (typeof ops[key] === 'string' ? ops[key] : JSON.stringify(ops[key]));
				var data = ' data-' + key + '=\'' + item + '\' ';
				var attr = (key === 'title' || key === 'src' || key === 'href') ? (key + '=\'' + item + '\'') : ' ';
				//console.log(attr, data);
				//html.push(' ' + key + '="' + item + '" data-' + key + '=\'' + item + '\' ');
				html.push(attr + ' ' + data);
			}
			return html.join(' ');
		},
		contextmenuTimer: undefined, //tab contexmenu timer;
		hideContextmenu: function() {
			var _this = this;
			clearTimeout(_this.contextmenuTimer);
			_this.contextmenuTimer = setTimeout(function() {
				_this.$contextmenu.hide();
			}, 500);
		},
		//设置TabHTML
		setTabHtml: function(options) {
			var _this = this;
			var ops = $.extend({}, options);
			var html = [];
			var title = ops.title;
			var attr;
			var $nav;
			if (this.debug) {
				ops.title = ops.title + '\n' + ops.url;
			}

			attr = this.getAttr(ops);

			html.push('<li rel="tab" class="admin-nav-item ' + this.className.current + '" ' + attr + '>');
			html.push('<a rel="tab" href="" ' + attr + '><span class="tab-icon"></span>' + title + '</a>');
			if (ops.close === true) {
				html.push('<i class="fa fa-times admin-nav-close" rel="close"  title="关闭页面" ' + attr + '></i>');
			}

			html.push('</li>');
			$nav = $(html.join(''));

			//events
			$nav
				.on('contextmenu', '[rel]', function(ev) {
					var pos = $(this).offset();
					var rel = $(this).attr('rel');
					var id = $(this).data('id');
					if (rel === 'close' || rel === "tab") {
						ev.stopPropagation();
						ev.preventDefault();
					}
					if (rel === "tab") {
						_this.$contextmenu
							.data('id', id)
							.hide().css({
								left: pos.left + ev.offsetX,
								top: pos.top + ev.offsetY
							})
							.show();
						_this.setContextmenuStatus(this);
					}
				})
				.on('click', '[rel]', function(ev) {
					if (ev.ctrlKey) {
						_this.__open($(this).data('url'));
					}
				})
				.on('dblclick', '[rel]', function() {
					var id = $(this).data('id');
					_this.refresh(id);
				})
				.on('mouseenter', '[rel]', function() {
					clearTimeout(_this.contextmenuTimer);
				})
				.on('mouseleave', '[rel]', function() {
					_this.hideContextmenu();
				});
			return $nav;
		},
		__getOriginalIDStr: function(id) {
			return (id || '').toString().replace(RegExp(this.__id, 'ig'), '');
		},
		__getRealIDStr: function(id) {
			return this.__id + this.__getOriginalIDStr(id || this.getString(10));
		},
		//设置IframeHTML
		setIframeHtml: function(ops) {
			var _this = this;
			var html = [];
			var attr;
			var id = this.__getOriginalIDStr(ops.id);
			ops.src = ops.url;
			attr = this.getAttr(ops);
			var $box = $('<div rel="iframe" class="admin-iframe-item" ' + attr + '></div>');
			var $iframe = $('<iframe frameborder="0" ' + attr + '></iframe>');
			$iframe.on('load', function() {
				_this.__event({
					eventType: 'onload',
					id: id
				});
			});
			$box.append($iframe);
			return $box;
		},
		//是否已经有页面存在
		hasPage: function(id) {
			return !!this.tab.find('[rel="tab"][data-id="' + this.__getRealIDStr(id) + '"]').length;
		},
		//选中当前项
		selectPage: function(id, parentId, isHash) {
			var _this = this;
			var $item;
			var _id = this.__getOriginalIDStr(id);
			id = this.__getRealIDStr(id);

			if (undefined === id) {
				return;
			}
			if (false === this.__event({
					eventType: 'selectBefore',
					id: _id
				})) {
				return;
			}
			$item = this.iframe.find('[rel="iframe"][data-id="' + id + '"]');

			if ($item.length) {
				//选中Tab
				this.tab.find('ul').find('li').removeClass(this.className.current);
				this.tab.find('ul').find('li[data-id="' + id + '"]').addClass(this.className.current);
				//选中iframe
				this.iframe.find('[rel="iframe"]').hide();
				$item.show();
			}
			this.menu.find('[rel="menu"]').removeClass(this.className.current);
			this.subMenu.find('[rel="menu"]').removeClass(this.className.current);
			this.menu.find(
				'[rel="menu"][data-id="' + id + '"]' +
				'[rel="menu"][data-parentid="' + id + '"]'
			).addClass(this.className.current);

			var $menuItem = this.menu.find('[data-parentid="' + parentId + '"]');
			if ($menuItem.length) {
				_this.menu.find('[rel="menu"]').removeClass(_this.className.current);
				$menuItem.addClass(_this.className.current);
				_this.setSubMenu($menuItem.eq(0));
			}

			this.subMenu.find(
				'[rel="menu"][data-id="' + id + '"]'
			).addClass(this.className.current);

			this.setLastItemStatus();

			//选中上一级菜单
			// this.subMenu.find(
			// 	'a[rel="menu"][data-id="' + id + '"]'
			// ).each(function(index, item) {
			// 	//_this.menu.find('[data-parentid="' + $(item).data('parentid') + '"]').addClass(_this.className.current);
			// });
			//设置Hash
			if (location.hash && id && (location.hash || '').slice(1) !== id && !isHash) {

			}
			if (!isHash) {
				//location.hash = id;
			}
			//console.clear('');
			this.__event({
				eventType: 'select',
				id: _id
			});


		},

		//新开页面
		open: function(ops) {
			var _id;
			var origin = null;
			ops = $.extend({
				title: this.defaults.newTabTitle,
				close: true,
				id: '',
				url: ''
			}, ops);
			origin = ops.origin || null;

			ops.id = this.__getOriginalIDStr(ops.id);
			ops.id = this.__getRealIDStr(ops.id);

			_id = this.__getOriginalIDStr(ops.id);

			if (!ops.url) {
				this.__event({
					eventType: 'error',
					id: _id,
					title: ops.title,
					message: '缺少必要参数 URL'
				});
				return;
			}
			if (false === this.__event({
					eventType: 'openBefore',
					id: _id,
					title: ops.title,
					origin: origin

				})) {
				return;
			}
			if (this.hasPage(ops.id)) {
				this.selectPage(ops.id, ops.parentId);
				return;
			}

			this.tab.find('ul')
				.find('li').removeClass(this.className.current)
				.end()
				.append(this.setTabHtml(ops));
			this.iframe.append(this.setIframeHtml(ops));
			this.iframe.find('[rel="iframe"]').hide();
			this.iframe.find('[rel="iframe"][data-id="' + ops.id + '"]').show();
			this.__event({
				eventType: 'open',
				id: _id,
				title: ops.title,
				origin: origin
			});
			this.setLastItemStatus();
			this.selectPage(ops.id, ops.parentId);

		},
		__open: function(url) {
			window.open(url);
		},
		//设置Close状态
		setLastItemStatus: function() {
			var $close = this.tab.find('[rel="close"]');
			if (this.tab.find('[rel="tab"]').length <= 2) {
				$close.hide();
			} else {
				$close.show();
			}
			this.__save();
		},
		//关闭页面 by id
		close: function(id) {

			var _id = this.__getOriginalIDStr(id);
			id = this.__getRealIDStr(id);
			var $current = this.tab.find(
				'[rel="tab"][data-id="' + id + '"]'
			);
			var $prev = $current.prev('[rel="tab"]').data('id');
			var $next = $current.next('[rel="tab"]').data('id');
			var nextId;
			nextId = $next || $prev;

			if (!$current.length || !nextId || !$current.data('close')) {
				return;
			}
			if (false === this.__event({
					eventType: 'closeBefore',
					id: _id
				})) {
				return;
			}
			this.tab.find(
				'[rel="tab"][data-id="' + id + '"]'
			).remove();
			this.iframe.find(
				'[rel="iframe"][data-id="' + id + '"]'
			).remove();

			this.selectPage(nextId, ($next && $next.data ? $next.data('parentid') : ''));
			this.setLastItemStatus();
			this.__event({
				eventType: 'close',
				id: _id
			});
		},
		closeOther: function(_id) {
			var _this = this;
			if (false === this.__event({
					eventType: 'closeOtherBefore',
					id: _id
				})) {
				return;
			}
			this.tab.find('a[rel="tab"]').each(function(index, item) {
				var id = $(this).data('id');
				var close = $(this).data('close');
				if (close && _id !== id) {
					_this.close(id);
				}
			});
			this.__event({
				eventType: 'closeOther',
				id: _id
			});
		},
		closeAll: function() {
			var _this = this;
			if (false === this.__event({
					eventType: 'closeAllBefore'
				})) {
				return;
			}
			this.tab
				.find('a[rel="tab"]')
				.each(function(index, item) {
					var id = $(this).data('id');
					var close = $(this).data('close');
					if (close) {
						_this.close(id);
					}
				});
			this.__event({
				eventType: 'closeAll'
			});
		},
		refresh: function(id) {
			id = this.__getRealIDStr(id);
			var $iframe = this.iframe.find('iframe[data-id="' + id + '"]');
			var _id = this.__getOriginalIDStr(id);
			var src = $iframe.attr('src');
			if (false === this.__event({
					eventType: 'refreshBefore',
					id: _id
				})) {
				return;
			}
			$iframe.attr('src', src);
			this.__event({
				eventType: 'refresh',
				id: _id
			});
		},
		setTitleById: function(id, text) {
			var _id = this.__getOriginalIDStr(id);
			id = this.__getRealIDStr(id);

			this.__event({
				eventType: 'setTitleBefore',
				id: _id
			});
			this.tab.find(
				'a[rel="tab"][data-id="' + id + '"]'
			).text(text).attr('title', text);
			this.__event({
				eventType: 'setTitle',
				id: _id
			});
		},
		__restore: function() {
			this.tab.html(localStorage.getItem('tab'));
		},
		__save: function() {

			//var tab = this.tab.html();
			//localStorage.setItem('tab', tab);
		}
	};

	window.Tagpage = TagPage;

})(window, window.jQuery);