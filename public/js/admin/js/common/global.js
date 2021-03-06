 ;
 (function(window, $, undefined) {
 	'use strict';

 	/**
 	 * [Tips description]
 	 */
 	function Tips(options) {
 		for (var key in options) {
 			this[key] = options[key];
 		}
 		this.init();
 	}
 	Tips.prototype = {
 		constructor: Tips,
 		name: '_TPS',
 		init: function() {
 			this.create();
 		},
 		create: function() {
 			this.box = document.getElementById(this.name);
 			if (this.box) {} else {
 				this.box = document.createElement('div');
 				this.box.className = 'tips-box';
 				document.body.appendChild(this.box);
 			}
 			this.box.style.display = 'none';

 		},
 		show: function(msg, type) {
 			var _this = this;
 			var style = '';
 			var random = Math.random().toString(32).slice(3);

 			var item = document.createElement('div');
 			var icon = document.createElement('div');
 			var close = document.createElement('div');
 			var content = document.createElement('div');

 			switch (type) {
 				case 'success':
 					style = ' tips-success';
 					break;
 				case 'error':
 					style = ' tips-error';
 					break;
 				case 'warning':
 					style = ' tips-warning';
 					break;
 			}

 			icon.className = 'tips-icon';
 			close.className = 'tips-close';


 			content.className = 'tips-content ' + style;
 			content.innerHTML = msg || '';

 			item.className = 'fadeInDownBig animated tips-item';

 			item.appendChild(icon);
 			item.appendChild(content);
 			item.appendChild(close);
 			_this.box.appendChild(item);

 			_this.box.style.display = 'block';

 			close.onclick = function() {
 				_this.remove(icon);
 				_this.remove(content);
 				_this.remove(close);
 			};
 			if (this.timeOut) {

 				setTimeout(function() {
 					item.className = 'fadeOutUp animated tips-item';
 				}, this.timeOut);
 				setTimeout(function() {
 					_this.remove(icon);
 					_this.remove(content);
 					_this.remove(close);
 				}, this.timeOut + 1000);
 			}

 		},
 		remove: function(node) {
 			try {
 				if (node && node.parentNode) {
 					node.parentNode.removeChild(node);
 					node = null;
 				} else if (node) {
 					node = null;
 				}

 			} catch (ev) {
 				console.log(ev);
 			}
 		},
 		clear: function() {
 			while (this.box.firstChild) {
 				this.remove(this.box.firstChild);
 			}
 			return this;
 		},
 		hide: function() {
 			this.box.style.display = 'none';
 		}
 	};

 	var tips = new Tips({
 		timeOut: 3000
 	});
 	window.tips = tips;

 	function Message(options) {
 		var ops = options || {};
 		this.event = ops.event || this.event;
 		this.dev = ops.dev === true ? true : false;
 	}
 	Message.prototype = {
 		dev: false,
 		name: 'kw-msg',
 		constructor: Message,
 		timeOut: 1000,
 		event: function(ev) {
 			console.log(ev);
 		},
 		__setPos: function(node) {
 			if (!node) {
 				throw '缺少target属性';
 			}
 			//node = node || document.body;
 			var pos = {
 				width: node.offsetWidth,
 				height: node.offsetHeight,
 				left: node.offsetLeft || 0,
 				top: node.offsetTop || 0
 			};
 			var size = {
 				width: this.box.offsetWidth,
 				height: this.box.offsetHeight
 			};
 			this.target = node;
 			this.box.style.cssText = ';  z-index: 1000; left:' + ((pos.left + pos.width / 2) - size.width / 2) + 'px; top:' + (pos.top - size.height - 30) + 'px;';
 		},
 		getID: function(str) {
 			return typeof str === 'string' ? document.getElementById(str) : str;
 		},
 		remove: function(node) {

 			if (node) {
 				if (node.parentNode) {
 					node.parentNode.removeChild(node);
 				} else {
 					node = null;
 				}
 				this.event({
 					eventType: 'remove',
 					node: node,
 					target: this.target
 				});
 			}
 		},
 		warning: function(msg, options) {
 			var _this = this;
 			var ops = options || {};
 			ops.type = null;
 			ops.className = this.name + '-warning';
 			//ops.icon = '<span class="icon-positive-icon"></span>';
 			this.create(msg, ops);
 		},
 		success: function(msg, options) {
 			var _this = this;
 			var ops = options || {};
 			ops.className = this.name + '-success';
 			ops.type = null;
 			//ops.icon = '<span class="icon-positive-icon"></span>';
 			this.create(msg, ops);
 		},
 		error: function(msg, options) {
 			var _this = this;
 			var ops = options || {};
 			ops.type = null;
 			ops.className = this.name + '-error';
 			//ops.icon = '<span class="icon-error-icon-02"></span>';
 			this.create(msg, ops);
 		},
 		create: function(msg, options) {
 			var _this = this;
 			var ops = options || {};
 			var type = ops.type;
 			var icon = ops.icon || '';
 			var timeOut = undefined !== ops.timeOut ? ops.timeOut : (_this.timeOut || 1000);
 			switch (type) {
 				case 'success':
 					this.success(msg, ops);
 					break;
 				case 'error':
 					this.error(msg, ops);
 					break;
 				case 'warning':
 					this.warning(msg, ops);
 					break;
 				default:

 					type = 'default';
 					this.box = document.createElement('div');
 					this.box.innerHTML = '<span>' + msg + '</span>' + icon;
 					this.box.className = this.name + ' ' + ops.className;
 					this.box.onclick = function() {
 						_this.remove(this);
 					};
 					document.body.appendChild(this.box);
 					this.__setPos(this.getID(ops.target));
 					setTimeout(function() {
 						_this.remove(_this.box);
 					}, timeOut);

 			}
 			this.event({
 				eventType: 'create',
 				type: type,
 				timeOut: timeOut,
 				icon: ops.icon
 			});

 		}
 	};

 	window.msg = new Message({
 		dev: true
 	});

 	function _U() {}
 	_U.prototype = {
 		getString: function(num) {
 			var result = [];
 			var len = Math.ceil((undefined !== num ? num : 32) / 12);
 			for (var i = 0; i < len; i++) {
 				result.push(Math.random().toString(36).slice(2));
 			};
 			return result.join('').slice(0, num);
 		},
 		getRange: function(start, end) {
 			return Math.round(Math.random() * (end - start)) + start;
 		},
 		getTimes: function() {
 			return new Date().getTime();
 		},
 		getQueryValue: function(name, win) {
 			win = win || window;
 			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
 			var r = win.location.search.substr(1).match(reg);
 			if (r !== null) {
 				return unescape(r[2]);
 			}
 			return null;
 		},
 		fixNumber: function(number, length) {
 			var len = length || 0;
 			var maxNum = Math.pow(10, len);
 			var str = [];
 			for (var i = number.toString().length; i < maxNum.toString().length - 1; i++) {
 				str.push('0');
 			}
 			return str.join('') + number;
 		},
 		forEach: function(object, callback) {
 			var list;
 			var templ;
 			if (_is.isArray(object)) {
 				list = [];
 				for (var i = 0; i < object.length; i++) {
 					var templ = callback(object[i], i, object);
 					if (undefined !== templ) {
 						list.push(templ);
 					}

 				}
 			} else {
 				for (var key in object) {
 					list = {};
 					templ = callback(object[key], key, object);
 					if (undefined !== templ) {
 						list[key] = templ;
 					}
 				}
 			}
 			return list;
 		}
 	};
 	var _u = new _U();

 	function _Time() {}
 	_Time.prototype = {
 		__colors: ['#000', 'green', 'blue', 'orange', 'red'],
 		start: function(id, keep) {
 			id = undefined === id ? '__time__' : id;
 			this.time = this.time || {};
 			this.time[id] = new Date().getTime();
 			this.time[id + 'keep'] = keep === true ? true : false;
 		},
 		end: function(id, isMs) {
 			var result;
 			var val = 0;
 			var color = 0;
 			var _unit = isMs === true ? 1000 : 1;
 			id = undefined === id ? '__time__' : id;

 			val = (new Date().getTime() - this.time[id]) / _unit;
 			result = '【' + id + 'Run time】➤ ' + val + (isMs === true ? 's' : 'ms') + '';
 			if (!this.time[id + 'keep']) {
 				delete this.time[id];
 			}
 			if (val < 500) {
 				color = 0;
 			} else if (val >= 500 && val < 1000) {
 				color = 1;
 			} else if (val >= 1000 && val < 1500) {
 				color = 2;
 			} else if (val >= 1500 && val < 2000) {
 				color = 3;
 			} else if (val >= 2000) {
 				color = 4;
 			}
 			try {
 				console.log('%c' + result, 'color:' + this.__colors[color] + '; font-family:Microsoft YaHei');
 			} catch (ev) {}
 			return result;
 		}
 	};
 	var _time = new _Time();

 	function _DEV() {
 		this.init();
 	}
 	_DEV.prototype = {
 		debug: false,
 		log: function() {
 			try {
 				console.log.apply(console, arguments);
 			} catch (ev) {}
 		},
 		time: _time
 	};


 	function _Is() {}
 	_Is.prototype = {
 		__is: function(object, type) {
 			return Object.prototype.toString.call(object).slice(8, -1) === type;
 		},
 		isArray: function(object) {
 			return this.__is(object, 'Array');
 		},
 		isFunction: function(object) {
 			return this.__is(object, 'Function');
 		},
 		isObject: function(object) {
 			return this.__is(object, 'Object');
 		},
 		isString: function(object) {
 			return this.__is(object, 'String');
 		},
 		isNumber: function(object) {
 			return this.__is(object, 'Number');
 		},
 		isDate: function(object) {
 			return this.__is(object, 'Date');
 		},
 		isElement: function(object) {
 			return object && undefined !== object.nodeType && undefined !== object.nodeName;
 		}
 	};

 	var _is = new _Is();

 	function _Fn() {};
 	_Fn.prototype = {

 		/**
 		 * 深度复制
 		 * @param  {Object Or Other type} source [source object]
 		 * @return {Object}        [new object]
 		 */
 		deepCopy: function(source) {
 			var newObject = {};
 			if (typeof source !== 'object') {
 				newObject = source;
 			} else {
 				for (var key in source) {
 					newObject[key] = Object.prototype.toString.call(source[key]) === '[object Array]' ? [] : {};
 					newObject[key] = this.deepCopy(source[key]);
 				}
 			}
 			return newObject;
 		},

 		/**
 		 * [assign description]
 		 * @return {[type]} [description]
 		 */
 		assign: function() {
 			var newObject = {};
 			for (var i = 0, len = arguments.length; i < len; i++) {
 				var obj = arguments[i];
 				for (var key in obj) {
 					if (undefined !== obj[key]) {
 						newObject[key] = this.isElement(obj[key]) ? obj[key] : this.deepCopy(obj[key]);
 					}
 				}
 			}
 			return newObject;
 		},
 		merge: function() {
 			var newObject = {};
 			for (var i = 0, len = arguments.length; i < len; i++) {
 				var obj = arguments[i];
 				for (var key in obj) {
 					//if (undefined !== obj[key]) {
 					newObject[key] = obj[key];
 					//}
 				}
 			}
 			return newObject;
 		},
 		inherit: function() {
 			return this.extend.apply(this, arguments);
 		},

 		extend: function(Child, Parent) {
 			var F = function() {};
 			var obj;
 			if (arguments.length !== 2) {
 				//throw 'Missing build function.';
 				throw Error('Missing build function.')
 			}
 			F.prototype = Parent.prototype;　
 			obj = new F();
 			for (var key in obj) {
 				if (undefined === Child.prototype[key]) {
 					Child.prototype[key] = obj[key];
 				}
 			}　　　　　　　　
 			Child.uber = Parent.prototype;
 			return Child;
 		},

 		create: function() {
 			var F = function() {};
 			F.prototype = this.assign.apply(this, arguments);
 			return new F;
 		},

 		keys: function() {
 			var keys = [];
 			for (var i = 0, len = arguments.length; i < len; i++) {
 				for (var key in arguments[i]) {
 					keys.push(key);
 				}
 			}
 			keys.sort(function(a, b) {
 				return a > b;
 			});
 			return keys;
 		},

 		inArray: function(item, arr, boolean) {
 			var index = -1;
 			if (!this.isArray(arr) || arguments.length < 2) {
 				return;
 			}
 			for (var i = 0, len = arr.length; i < len; i++) {
 				if (arr[i] === item) {
 					index = i;
 				}
 			}
 			if (true === boolean) {
 				index = index === -1 ? false : true;
 			}
 			return index;
 		},

 		normal: function(object) {
 			var newObject = {};
 			if (Object.prototype.toString.call(object) === '[object Array]') {
 				newObject = [];
 				for (var i = 0, len = object.length; i < len; i++) {
 					if (undefined !== object[i]) {
 						newObject.push(object[i]);
 					}
 				}
 			} else {
 				for (var key in object) {
 					if (undefined !== object[key]) {
 						newObject[key] = object[key];
 					}
 				}
 			}
 			return newObject;
 		},

 		delDuplicate: function(arr) {
 			var result = [];
 			for (var i = 0; i < arr.length; i++) {
 				var status = true;
 				for (var j = 0; j < i; j++) {
 					if (arr[i] === arr[j]) {
 						status = false;
 					}
 				}
 				if (status) {
 					result.push(arr[i]);
 				}
 			}
 			return result;
 		}
 	};

 	var _fn = new _Fn();

 	var $_$ = function() {
 		this.init();
 	};
 	$_$.prototype = {
 		init: function() {
 			try {
 				if (localStorage.getItem('dev') === 'true') {
 					this.debug = true;
 				}
 			} catch (ev) {}
 			if (this.getQueryValue('dev') === 'true') {
 				this.debug = true;
 			}
 			if (this.debug) {
 				this.log('%cDEV MODE', 'color:#f00;height:100px; line-height:100px; font-size:100px; padding:10px;text-shadow:1px 1px 0 gray,2px 2px 0 gray,3px 3px 0 gray;,4px 4px 0 gray;');
 			}

 		},
 		constructor: $_$,
 		name: ''
 	};
 	_fn.extend($_$, _DEV);
 	_fn.extend($_$, _Fn);
 	_fn.extend($_$, _Is);
 	_fn.extend($_$, _U);

 	var __ = new $_$();

 	window.__ = __;

 })(this);
 /**
  * name:Admin UI 
  * author:
  * date: 2017-10-24;
  * home: 
  */

 (function(window, $, undefined) {
 	'use strict';
 	if (!$) {
 		throw '缺少必要库jQuery CDN地址: https://static.huizecdn.com/js/libs/jquery/1.8.0/jquery.min.js';
 	}
 	$.fn.showList = $.fn.showList || function(options) {
 		var ops = $.extend({
 			delay: 100
 		}, options);
 		return this.each(function() {
 			var $this = $(this);
 			var timer;
 			if ($this.data('lock')) {
 				return;
 			}
 			$this.data('lock', true);

 			function show() {
 				clearTimeout(timer);
 				$this.find('.drop-down-menu')
 					.hide()
 					.stop();

 				$(this).find('.drop-down-menu').slideDown('fast');
 			}

 			function hide() {
 				var _this = this;
 				timer = setTimeout(function() {
 					$(_this).find('.drop-down-menu').slideUp('fast');
 				}, ops.delay);
 			}

 			$this
 				.on('mouseenter', function() {
 					show.call(this);
 				})
 				.on('mouseleave', function() {
 					hide.call(this);
 				})
 		});
 	};

 	//Ajax
 	function Ajax(ops) {
 		var ops = ops || {};
 		var _this = this;
 		this.url = '';
 		this.method = 'GET';
 		this.data = null;
 		this.header = {};

 		for (var key in ops) {
 			this[key] = ops[key];
 		}
 		var dataList = [];
 		for (var d in this.data) {
 			dataList.push(d + '=' + this.data[d]);
 		}
 		this.method = this.method.toUpperCase();

 		if (this.method === 'GET') {
 			this.url = this.url + (this.url.indexOf('?') == -1 ? '?' : '&') + dataList.join('&');
 		}
 		this.xhr = this.XHR();
 		this.xhr.open(this.method, this.url, false);
 		for (var name in this.header) {
 			this.xhr.setRequestHeader(name, this.header[name]);
 		}
 		this.xhr.onreadystatechange = function(ev) {
 			var res;

 			if (_this.xhr.readyState === 4) {
 				if (_this.xhr.status === 200) {
 					res = _this.xhr.responseText || _this.xhr.responseXML
 					try {
 						res = JSON.parse(res);
 					} catch (ev) {}
 					_this.success.call(_this.xhr, res);
 				} else {
 					_this.error.call(_this.xhr, _this.xhr.statusText);
 				}
 			}
 			_this.complete.call(_this.xhr, res);
 		};

 		this.xhr.onerror = function() {};
 		this.xhr.onabort = function() {};

 		this.xhr.onprogress = function(event) {

 			if (event.lengthComputable) {
 				var percentComplete = event.loaded / event.total;
 				_this.progress(percentComplete);
 			}

 		};
 		this.xhr.send(this.data);
 	}
 	Ajax.prototype = {
 		constructor: Ajax,
 		success: function(res) {
 			console.log(res);
 		},
 		error: function(ev) {
 			console.error(ev);
 		},
 		progress: function(ev) {
 			console.log(ev);
 		},
 		complete: function(res) {
 			//console.log(res);
 		},
 		XHR: function() {
 			var xmlHttp = window.XMLHttpRequest;
 			var aVersions = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
 			if (!xmlHttp) {
 				for (var i = 0; i < aVersions.length; i++) {
 					try {
 						xmlHttp = ActiveXObject(aVersions[i]);
 						return xmlHttp;
 					} catch (err) {

 					}
 				}
 			}
 			return new xmlHttp();
 		}
 	};

 	function Loading(options) {
 		this.ops = options || {};
 		this.msg = this.ops.msg || this.msg;
 		if (this.ops.event) {
 			this.event = this.ops.event;
 		}
 		this.__event = function(ev) {
 			ev.name = 'loading';
 			ev.timestamp = Date.now();
 			ev.version = this.version;
 			this.event(ev);
 		};
 		this.init();
 	}
 	Loading.prototype = {
 		constructor: Loading,
 		version: '1.0.1',
 		msg: ['正在', '...'],
 		msgArr: ['加载', '努力加载', '拼命加载', '玩命加载'],
 		msgIndex: 0,
 		timer: undefined,
 		event: function(ev) {},
 		init: function() {
 			this.create();
 		},
 		create: function() {
 			this.layer = document.createElement('div');
 			this.layer.className = 'loading-layer';
 			this.layer.style.display = 'none';
 			this.content = document.createElement('div');
 			this.content.className = 'loading-content';
 			this.content = document.createElement('span');
 			this.content.className = 'loading-content';

 			this.span = document.createElement('span');
 			this.msgText = document.createTextNode(this.msg[0] + this.msgArr[0] + this.msg[1]);
 			this.icon = document.createElement('i');
 			this.icon.className = 'fa fa-spinner fa-spin fa-2x fa-fw margin-bottom';
 			//this.content.innerHTML = '<i class="fa fa-spinner fa-spin fa-2x fa-fw margin-bottom"></i><span>' + this.msg + '</span>';
 			this.content.appendChild(this.icon);
 			this.span.appendChild(this.msgText);
 			this.content.appendChild(this.span);

 			this.layer.appendChild(this.content);
 			document.body.appendChild(this.layer);
 			this.__event({
 				eventType: 'create'
 			});
 		},
 		__timer: function() {
 			clearInterval(this.timer);
 		},
 		show: function() {
 			var _this = this;
 			this.layer.style.display = 'block';
 			this.__timer();
 			this.__event({
 				eventType: 'show'
 			});
 			this.timer = setInterval(function() {
 				if (_this.msgIndex >= _this.msgArr.length) {
 					_this.msgIndex = _this.msgArr.length - 1;
 					clearInterval(_this.timer);
 				}
 				_this.msgText.textContent = _this.msg[0] + _this.msgArr[_this.msgIndex] + _this.msg[1];
 				_this.msgIndex++;
 				_this.__event({
 					eventType: 'update'
 				});
 			}, 1000);
 			if (!isNaN(++this.ops.timeOut)) {
 				setTimeout(function() {
 					_this.hide();
 				}, this.ops.timeOut);
 			}
 		},
 		hide: function() {
 			this.__timer();
 			this.layer.style.display = 'none';
 			this.__event({
 				eventType: 'hide'
 			});
 		}
 	};
 	var __loading = new Loading();

 	window.__loading = __loading;

 	function loading(isShow) {
 		try {
 			if (false === isShow) {
 				__loading.hide();
 			} else {
 				__loading.show();
 			}
 		} catch (ev) {
 			console.log(ev);
 			top.postMessage(__.assign({
 				type: 'loading'
 			}, ops), '*');
 		}
 	}

 	//$('.js-admin-menu-item').showList();
 	try {
 		window.addEventListener('message', function(ev) {
 			var data = ev.data || {};
 			var code = data.code || '';

 			if (
 				data.originType === 'tabPage' &&
 				data.type === 'code' &&
 				code.length
 			) {
 				eval(code);
 			}
 			if (data.type === 'loading') {
 				loading();
 			}
 		}, false);
 	} catch (ev) {

 	}



 	function postMessage(id, msg) {
 		console.log(msg);
 		console.log($('iframe[data-id="' + tabPage.__id + id + '"]').length);
 		//$('iframe[data-id="' + tabPage.__id + id + '"]')[0].postMessage(msg, '*');
 		frames[0].postMessage(msg, '*');
 	}
 	var ops = {
 		originType: 'tabPage',
 		close: true
 	};
 	/**
	 HZ.ajax({
		url: '/adsfas',
		method: 'get',
		data: {},
		header: {}
		success: function(res) {
			alert(res);
		},
		error: function(err) {
			alert(err);
		},
		complete: function() {
			alert('完成');
		}
	});
 */
 	var HZ = window.HZ || {

 		eval: function(code) {
 			console.log(code);
 			top.postMessage(__.assign({
 				code: code,
 				type: 'code'
 			}, ops), '*');
 		},
 		ajax: function(options) {
 			return new Ajax(options);
 		},
 		//分页
 		paging: function(options) {
 			var _this = this;
 			var ops = $.extend({
 				id: 'pagingContent',
 				data: {
 					pageIndex: 1
 				},
 				callback: function() {}
 			}, options);
 			var pageIndex = (ops.data || {}).pageIndex || 1;
 			//http://techdoc.oa.com/web/Public/wikis/接口规范   *前后端接口规范*			 
 			kkpager.inited = false;

 			function paging(index) {
 				var index = (index && index < 1) ? 1 : index;
 				ops.data['pageIndex'] = index;
 				loading();
 				var ajax = _this.ajax({
 					url: ops.url,
 					data: ops.data,
 					success: function(res) {
 						var result = (res || {}).result || {};
 						var data = result.data || {};
 						var total = result.total;
 						var pageSize = 10 || result.pageSize; //固定
 						ops.callback(res);
 						loading(false);

 						//生成分页控件  
 						kkpager.generPageHtml({
 							pagerid: ops.id,
 							pno: index,
 							mode: 'click', //可选，默认就是link
 							//总页码  
 							total: Math.ceil(total / pageSize),
 							//总数据条数  
 							totalRecords: total,
 							lang: {
 								firstPageText: '&nbsp;&nbsp;首页&nbsp;&nbsp;',
 								firstPageTipText: '首页',
 								lastPageText: '&nbsp;&nbsp;尾页&nbsp;&nbsp;',
 								lastPageTipText: '尾页',
 								prePageText: '&nbsp;&nbsp;上一页&nbsp;&nbsp;',
 								prePageTipText: '&nbsp;&nbsp;上一页&nbsp;&nbsp;',
 								nextPageText: '&nbsp;&nbsp;下一页&nbsp;&nbsp;',
 								nextPageTipText: '&nbsp;&nbsp;下一页&nbsp;&nbsp;',
 								totalPageBeforeText: '共',
 								totalPageAfterText: '页',
 								currPageBeforeText: '当前第',
 								currPageAfterText: '页',
 								totalInfoSplitStr: '/',
 								totalRecordsBeforeText: '共',
 								totalRecordsAfterText: '条数据',
 								gopageBeforeText: ' 转到',
 								gopageButtonOkText: '确定',
 								gopageAfterText: '页',
 								buttonTipBeforeText: '第',
 								buttonTipAfterText: '页'
 							},
 							click: function(n) {
 								this.selectPage(n);
 								paging(n);
 								return false;
 							}
 						});
 					},
 					error: function() {
 						loading(false);
 					}
 				});


 			}
 			paging(pageIndex);
 		},

 		alert: function(msg, callack) {

 		},
 		selectPage: function(id) {
 			top.postMessage(__.assign({
 				type: 'select',
 				id: id
 			}, ops), '*');
 		},
 		closePage: function(id) {
 			top.postMessage(__.assign({
 				type: 'close',
 				id: id
 			}, ops), '*');
 		},
 		setTitle: function(id, newTitle) {
 			top.postMessage(__.assign({
 				newTitle: newTitle,
 				type: 'setTitle',
 				id: id
 			}, ops), '*');
 		},
 		//新开Tab窗口
 		openPage: function(data) {
 			top.postMessage(__.assign(data, {
 				type: 'open'
 			}, ops), '*');
 		}
 	};
 	HZ = __.merge(HZ, __, {
 		loading: __loading
 	});
 	window.HZ = HZ;
 })(window, window.jQuery);