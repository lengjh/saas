/**
 * jQuery插件
 * @param  {[type]} window    [description]
 * @param  {[type]} $         [description]
 * @param  {[type]} undefined [description]
 * @return {[type]}           [description]
 */
(function(window, $, undefined) {

	/**
	 * jqTips
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	$.fn.jqTips = function(options) {
		var ops = $.extend({
			showType: '',
			eventType: 'mouseenter',
			event: function() {}
		}, options);
		//$iframe = $('.jq-tips-iframe').hide();
		return this.each(function() {
			var $this = $(this),
				//$iframe = '',
				$content = $('<div class="jq-tips-body"></div>'),
				$box = $('<div class="jq-tips"></div>'),
				$arrowBottomUp = $('<span class="jq-tips-arrow jq-tips-arrow-bottom-up"></span>'),
				$arrowBottomDown = $('<span class="jq-tips-arrow jq-tips-arrow-bottom-down"></span>'),
				$arrowTopUp = $('<span class="jq-tips-arrow jq-tips-arrow-top-up"></span>'),
				$arrowTopDown = $('<span class="jq-tips-arrow jq-tips-arrow-top-down"></span>'),
				$arrowLeftUp = $('<span class="jq-tips-arrow jq-tips-arrow-left-up"></span>'),
				$arrowLeftDown = $('<span class="jq-tips-arrow jq-tips-arrow-left-down"></span>'),
				$arrowRightUp = $('<span class="jq-tips-arrow jq-tips-arrow-right-up"></span>'),
				$arrowRightDown = $('<span class="jq-tips-arrow jq-tips-arrow-right-down"></span>'),
				html = ops.html || $this.data('html') || '',
				arrowSize = ops.arrowSize || $this.data('tips-arrow-size') || 7,
				borderColor,
				backgroundColor,
				borderWidth = 1,
				delay = ops.delay || $this.data('tips-delay') || 300,
				delayTimeout,
				width = ops.width || $this.data('tips-width') || '',
				height = ops.height || $this.data('tips-height') || '',
				onShow = ops.onShow || function() {},
				onHide = ops.onHide || function() {},
				showArrow = ops.showArrow === undefined ? (($this.data('tips-show-arrow') === false ? false : true)) : (ops.showArrow === true ? true : false),
				align = ops.align || $this.data('tips-align') || 'center',
				confirmText = ops.confirmText || $this.data('tips-confirm-text') || '',
				position = ops.position || $this.data('tips-position') || 'top',
				addClass = ops.addClass || $this.data('tips-class') || '',
				maxWidth = ops.maxWidth || $this.data('tips-max-width') || '',
				timeOut = 150,
				arrowLeft = 0,
				arrowTop = 0,
				css, boxCss = {},
				size, timeout,
				setLeft = ops.left || 0,
				setTop = ops.top || 0,
				setArrowLeft = ops.arrowLeft || 0,
				boxLeft = 0,
				boxTop = 0,
				boxRight = 0,
				boxBottom = 0,
				appendLock = true;

			if (!$this.data('lock')) {
				$this.data('lock', true);

			} else {
				return;
			}
			//$this.attr('tabIndex', 0);
			$content.html(html);
			$box.addClass(addClass);
			//$iframe.addClass(addClass);

			function getSize() {
				var pos = $this.offset();
				return {
					body: {
						width: Math.max($('body').outerWidth(), $(window).width()),
						height: Math.max($('body').outerHeight(), $(window).height())
					},
					box: {
						width: $box.outerWidth(),
						height: $box.outerHeight()
					},
					myself: {
						width: $this.outerWidth(),
						height: $this.outerHeight(),
						left: pos.left,
						top: pos.top
					}
				};
			}
			css = {
				width: width,
				height: height
			};
			$box.css(css);
			//$iframe.css(css);
			$box.append($content);

			function setPos() {
				size = getSize();
				borderColor = $box.css('borderColor');
				backgroundColor = $box.css('backgroundColor');
				// $iframe.css({
				// 	height: size.box.height
				// });
				if (!showArrow) {
					$('.jq-tips-arrow').hide();
				}
				if (align === 'center' || size.myself.width >= size.box.width) {
					left = -size.box.width / 2 + size.myself.width / 2;
					arrowLeft = size.box.width / 2 - arrowSize - borderWidth * 2;
				} else if (align === 'left') {
					arrowLeft = size.myself.width / 2 - arrowSize - borderWidth * 2;
				} else if (align === 'right') {
					arrowLeft = (size.box.width - size.myself.width) / 2 + size.box.width / 2 - arrowSize - borderWidth * 2;
				}
				arrowTop = size.box.height / 2 - arrowSize - borderWidth;
				//console.log(size);
				switch (align) {
					case 'left':
						boxLeft = size.myself.left;
						break;
					case 'right':
						boxLeft = size.myself.left + size.myself.width - size.box.width;
						break;
					case 'center':
						boxLeft = size.myself.left - size.box.width / 2 + size.myself.width / 2;
						break;
				}
				switch (position) {
					case 'left':
						boxLeft = size.myself.left - size.box.width - arrowSize;
						boxTop = (size.myself.top + (size.myself.height - size.box.height) / 2);
						$arrowLeftUp.css({
							borderWidth: arrowSize,
							right: -arrowSize + borderWidth,
							borderColor: 'transparent transparent transparent ' + backgroundColor
						});
						$arrowLeftDown.css({
							borderWidth: arrowSize,
							right: -arrowSize,
							borderColor: 'transparent transparent transparent ' + borderColor
						});
						boxCss = {
							left: boxLeft + setLeft,
							top: boxTop + setTop
						};
						$box.css(boxCss);
						//$iframe.css(boxCss);
						$box.append($arrowLeftDown);
						$box.append($arrowLeftUp);
						break;
					case 'top':
						boxBottom = size.myself.top - size.box.height - arrowSize;
						$arrowTopUp.css({
							borderWidth: arrowSize,
							bottom: -arrowSize + borderWidth,
							borderColor: backgroundColor + ' transparent transparent transparent'
						});
						$arrowTopDown.css({
							borderWidth: arrowSize,
							bottom: -arrowSize + 0,
							borderColor: borderColor + ' transparent transparent transparent'
						});
						boxCss = {
							left: boxLeft + setLeft,
							top: boxBottom + setTop
						};
						$box.css(boxCss);
						//$iframe.css(boxCss);
						$box.append($arrowTopDown);
						$box.append($arrowTopUp);
						break;
					case 'right':
						boxLeft = size.myself.left + size.myself.width + arrowSize;
						boxTop = (size.myself.top + (size.myself.height - size.box.height) / 2);
						$arrowRightUp.css({
							borderWidth: arrowSize,
							left: -arrowSize + borderWidth,
							borderColor: 'transparent ' + backgroundColor + ' transparent transparent'
						});
						$arrowRightDown.css({
							borderWidth: arrowSize,
							left: -arrowSize,
							borderColor: 'transparent ' + borderColor + ' transparent transparent'
						});
						boxCss = {
							left: boxLeft + setLeft,
							top: boxTop + setTop
						};
						$box.css(boxCss);
						//$iframe.css(boxCss);
						$box.append($arrowRightDown);
						$box.append($arrowRightUp);
						break;
					case 'bottom':
						boxTop = size.myself.top + size.myself.height;
						boxCss = {
							left: boxLeft + setLeft,
							top: boxTop + arrowSize + setTop
						};
						$box.css(boxCss);
						//$iframe.css(boxCss);
						$arrowBottomUp.css({
							borderWidth: arrowSize,
							top: -arrowSize,
							borderColor: 'transparent transparent ' + backgroundColor + ' transparent'

						});
						$arrowBottomDown.css({
							borderWidth: arrowSize,
							top: -arrowSize - borderWidth,
							borderColor: 'transparent transparent ' + borderColor + ' transparent'
						});
						$box.append($arrowBottomDown);
						$box.append($arrowBottomUp);
						break;
					default:
						//alert(0);
				}
				//Content
				//Arrow
				if (position === 'top' || position === 'bottom') {
					$arrowBottomUp.css({
						left: arrowLeft + setArrowLeft
					});
					$arrowBottomDown.css({
						left: arrowLeft + setArrowLeft
					});
					$arrowTopUp.css({
						left: arrowLeft + setArrowLeft
					});
					$arrowTopDown.css({
						left: arrowLeft + setArrowLeft
					});
				} else if (position === 'left' || position === 'right') {
					$arrowLeftUp.css({
						top: arrowTop
					});
					$arrowLeftDown.css({
						top: arrowTop
					});
					$arrowRightUp.css({
						top: arrowTop
					});
					$arrowRightDown.css({
						top: arrowTop
					});
				}
			}
			var obj = {
				target: $this,
				body: $content,
				context: $box,
				title: html,
				url: $this.data('url'),
				reset: reset
			};

			function reset(html) {
				$content.html(html);
				setPos();
			}

			function _show() {
				if (appendLock) {
					appendLock = false;
					//$('body').append($iframe);
					$('body').append($box);
				}
				clearTimeout(timeout);
				$box.show();
				setPos();
				ops.event($.extend(true, obj, {
					eventType: 'show'
				}));
				onShow.call($this, $box, setPos);
			}

			function _hide() {
				timeout = setTimeout(function() {
					$box.hide();
					//$iframe.hide();
					onHide.call($this, $box);

					ops.event($.extend(true, obj, {
						eventType: 'hide'
					}));
				}, timeOut);
			}
			$this

				.on(ops.eventType, function() {
					clearTimeout(timeout);
					ops.event($.extend(true, obj, {
						eventType: ops.eventType
					}));
					_show();
					if (ops.showType === 'confirm') {
						reset('<div class="jq-tips-confirm-content">' + html + '</div><div class="jq-tips-confirm-btn"><span class="jq-tips-confirm-btn-2">取消</span><span class="jq-tips-confirm-btn-1">确定</span></div>');
					}


				})
				.on('mouseleave', function() {

					timeout = setTimeout(function() {
						_hide();
						ops.event($.extend(true, obj, {
							eventType: 'mouseleave'
						}));
					}, delay);


				});
			$box
				.on('click', '.jq-tips-confirm-btn-1', function() {

					ops.event($.extend(true, obj, {
						eventType: 'ok'
					}));
					_hide();

				})
				.on('click', '.jq-tips-confirm-btn-2', function() {
					ops.event($.extend(true, obj, {
						eventType: 'cancel'
					}));
					_hide();
				})
				.on('mouseenter', function() {
					clearTimeout(timeout);
					//delayTimeout = setTimeout(_show, delay);

				})
				.on('mouseleave', function() {
					timeout = setTimeout(_hide, delay);
				});

		});
	};


	/**
	 * [validateForm description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	$.fn.validateForm = function(options) {

		var ops = $.extend({
			debug: true,
			errorText: '',
			successText: '',
			returnTips: function() {
				return '<div class="form-tips"></div>'; //提示结构
			},
			validate: function() {}
		}, options);
		return this.each(function() {
			var $this = $(this);


			var validate = function() {
				var $this = $(this);
				var $parent = $this.parent();
				//var $parent = $this.parents('.form-item-wrap');
				var val = $this.val();
				var id = $this.attr('id');
				var name = $this.attr('name');
				var reg = $this.data('reg') || '';
				var successText = $this.data('success-text') || ''; //成功后提示文字，可选
				var errorText = $this.data('error-text') || ops.errorText || ''; //错误提示文字，可选
				var require = $this.data('require'); //1：必须；0：
				var _reg = new RegExp(reg, 'ig'); //正则规则
				var status = _reg.test(val);
				var $tips = $parent.find('.form-tips');
				var pos = $this.position();
				var typeStr = '';

				$tips.css({
					top: $this.parents('.form-item-wrap').height() + pos.top,
					marginLeft: 0,
					left: pos.left
				});

				function error() {
					$parent.addClass('form-error').removeClass('form-success');
					$tips.html(errorText).show();
					if (errorText) {}
				}

				function success() {
					$parent.removeClass('form-error');//.addClass('form-success');
					if (successText) {
						//$tips.html(successText).show();
						$tips.html('').hide();
					} else {
						$tips.html('').hide();
					}
				}

				if ($this.is(':disabled') || (0 === require && !val)) {
					status = true;
					//success();
				} else {
					if (!require && (val.length && status || !val.length)) {
						$parent.removeClass('form-error');//.addClass('form-success');
						success();
						status = true;
					} else {
						if (status) {
							success();
						} else {
							error();
						}
					}
					if (!val && require) {
						status = false;
						error();
					}
				}

				if (!status && ops.debug && window.console) {
					if ($this.is('input')) {
						typeStr = 'input';
					} else if ($this.is('select')) {
						typeStr = 'select';
					} else if ($this.is('textarea')) {
						typeStr = 'textarea';
					} else {
						typeStr = '表单';
					}

					console.log('<' + typeStr + ' id="' + id + '" name="' + name + '" />', '未通过校验' || errorText);
				}
				return status;

			};
			$this.find('input,select,textarea').each(function() {
				var errorText = $(this).data('error-text') || ops.errorText;
				var successText = $(this).data('success-text') || ops.successText;

				if (errorText || successText) {
					$(this).parents('.form-item-wrap').append(ops.returnTips());
				}
			});
			$this
				.on('submit', function() {
					var status = true;
					var data = [];
					var objData = [];
					var formIndex = 0;
					var formStatus = true;
					var radioObj = {};
					$this.find('input,select,textarea').each(function(index) {
						var name = $(this).attr('name') || '';
						var val = $(this).val();
						var obj = {};
						var isCheckbox = $(this).is(':checkbox');
						var isRadio = $(this).is(':radio');
						var isChecked = $(this).is(':checked');
						var formRadioChecked = '';
						if (isRadio) {
							formRadioChecked = $(this).parent().hasClass('form-radio-checked');
							if (!isChecked) {
								isChecked = formRadioChecked;
							}
							if (undefined === radioObj[name]) {
								radioObj[name] = '';
							}
						}


						if ($(this).is(':disabled')) {
							return;
						}
						if (!validate.call(this)) {
							status = false;
						}
						if (name) {
							if (isRadio && isChecked) {
								radioObj[name] = val;
							}
							if (isCheckbox) {
								if (!isChecked) {
									val = '';
								}
							}
							if (!isRadio) {
								data.push(name + '=' + val);
								obj[name] = val;
								objData.push(obj);
							}

						}
						if (!status && formStatus) {
							formStatus = false;
							formIndex = index;
							$(this).select();
						}
					});
					$.each(radioObj, function(name, val) {
						var obj = {};
						data.push(name + '=' + val);
						obj[name] = val;
						objData.push(obj);
					});
					if (status) {
						ops.validate(data.join('&'), objData);
					}

				})
				.on('click', 'input,select', function() {
					$(this).parent().remove('form-error').remove('form-success');
				})
				.on('blur', 'input,select', function() {
					validate.call(this);
				});
		});
	};

	//jQuery tab
	$.fn.tab = function(options) {
		var ops = $.extend({
			index: 0,
			tabItemName: '.tab-item',
			tabContentName: '.tab-content',
			tabItemActiveName: 'tab-active',
			event: function() {}
		}, options);

		return this.each(function() {
			var $this = $(this);

			$this.find(ops.tabItemName).removeClass(ops.tabItemActiveName);
			$this.find(ops.tabItemName).eq(ops.index).addClass(ops.tabItemActiveName);

			$this.find(ops.tabContentName).hide();
			$this.find(ops.tabContentName).eq(ops.index).show();



			$this.on('click', ops.tabItemName, function() {
				var tab = $(this).data('tab');

				if (undefined === tab) {
					return;
				}
				$this.find(ops.tabItemName).removeClass(ops.tabItemActiveName);
				$(this).addClass(ops.tabItemActiveName);
				$this.find(ops.tabContentName).hide();
				$this.find(ops.tabContentName + '[data-tab="' + tab + '"]').show();
				ops.event({
					eventType: 'click',
					tab: tab,
					name: $(this).text(),
					context: $this,
					options: ops
				});
			});
		});
	};

	$.checkbox = function() {

		if ($('body').data('form-lock')) {
			return;
		}
		$('body')
			.data('form-lock', true)
			.on('click', '.form-checkbox,.form-radio', function(ev) {
				var name = $(this).find('input').attr('name');
				var $parents;
				var $thisInput;
				if ($(this).hasClass('form-checkbox')) {
					$(this).toggleClass('form-checkbox-checked');
					if ($(this).hasClass('form-checkbox-checked')) {
						$(this).find('input').attr('checked', true).change();
					} else {
						$(this).find('input').attr('checked', false).change();
					}

				} else if ($(this).hasClass('form-radio')) {

					$parents = $('input[type="radio"][name="' + name + '"]').parents('.form-radio');
					$parents.find('input[type="radio"][name="' + name + '"]').attr('checked', false);
					$parents.removeClass('form-radio-checked');

					$(this).toggleClass('form-radio-checked');
					$thisInput = $(this).find('input[name="' + name + '"]');
					if ($(this).hasClass('form-radio-checked')) {
						$thisInput.attr('checked', true);
					} else {
						$thisInput.attr('checked', false);
					}

					$thisInput.change();

				}
				ev.preventDefault();
			});
	};
	$.checkbox();
})(window, jQuery);