define(['backbone'], function(Backbone) {
	return function(obj) {
	 
		return Backbone.Model.extend({
			defaults: {
				_id: '',
				id: '',
				name: '',
				content: '',
				link: '',
				afterContent: '',
				imageUrl: '',
				imagesUrl: []
			},
			initialize: function() {

				this.bind('invalid', function(model, err) {
					///alert(err);
					console.warn('Invalid ' + err);
				});
				this.bind('error', function(model, err) {
					alert(err);
					//console.error('Error ' + err);
				});

			},
			validate: function(attrs) {
				for (var key in attrs) {
					if (_.indexOf(obj.validates, key) !== -1) {
						if ('' === attrs[key]) {
							return key + ' 不能为空';
						}
					}
				}
			}
		})
	};
});