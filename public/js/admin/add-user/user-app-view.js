define([
	'jquery',
	'underscore',
	'backbone',
	'admin-user-model',
	'admin-user-collection',
	'admin-user-view'
], function($, _, Backbone, User, UserList, UserView) {

	function success(a, b, c) {

	}

	var Users = new UserList();
	var AppView = Backbone.View.extend({
		el: $('#app'),
		events: {
			'click #add-btn': 'createOnEnter'
		},
		initialize: function() {
			Users.bind('add', this.addOne, this);
			Users.bind('reset', this.addAll, this);
			Users.fetch();
		},
		createOnEnter: function() {
			var user = new User();
			var attr = {};
			$('#emp-form input,#emp-form select').each(function() {
				var input = $(this);
				attr[input.attr('name')] = input.val();
			});
			user.bind('error', function(model, error) {
				console.error('createOnEnter', error);
			});
			if (user.set(attr)) {
				Users.create(user, {
					validate: true,
					wait: true,
					success: success
				});
			}
		},
		addOne: function(user) {
			user.set({
				'eid': user.get('_id') || Users.length
			});


			user.bind('error', function(model, error) {
				console.error('addOne', error);
			});
			var view = new UserView({
				model: user
			});

			$('.emp-table tbody').append(view.render().el);
		},
		addAll: function() {

			Users.each(this.addOne);
		}

	});
	return AppView;
});