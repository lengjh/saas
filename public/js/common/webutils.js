define(function() {
	return {
		slice: function(str, length, symbol) {
			var result = '',
				sym = symbol || '...';

			if (!str || typeof str !== 'string' || !length) {
				result = str;
			} else {
				if (str.length < length) {
					sym = '';
				}
				result = str.slice(0, length) + sym;
			}

			return result;
		},
		trimHtml: function(str) {
			var reg = /<(?:.|\s)*?>/ig;
			return str.replace(reg, '');
		}
	};
});