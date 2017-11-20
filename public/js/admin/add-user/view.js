define([
	'jquery',
	'underscore',
	'backbone',
	'admin-user-collection'
], function($, _, Backbone, UserList) {

	var UserView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#item-template').html()),
		events: {
			"dblclick td": "edit",
			"blur input,select": "close",
			"keydown input,select": "outEdit",
			"click .del": "clear",
		},
		initialize: function() {
			// 每次更新模型后重新渲染  
			this.model.bind('change', this.render, this);
			// 每次删除模型之后自动移除UI  
			this.model.bind('destroy', this.remove, this);
		},
		outEdit: function(ev) {
			if (13 === ev.which) {
				$(ev.currentTarget).blur();
			}
		},
		setText: function() {
			var model = this.model;
			this.input = $(this.el).find('input,select');
			this.input.each(function() {
				var input = $(this);
				input.val(model.get(input.attr("name")));
			});
		},
		close: function(e) {
			var input = $(e.currentTarget);
			var obj = {
				id: input.data('id')
			};
			obj[input.attr('name')] = input.val();
			this.model.save(obj, {
				type: 'put'
			});
			$(e.currentTarget).parent().parent().removeClass("editing");
		},
		edit: function(e) {
			// 给td加上editing样式  
			$(e.currentTarget).addClass('editing').find('input,select').focus();
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			// 把每个单元格的值赋予隐藏的输入框  
			this.setText();
			return this;
		},
		remove: function() {
			$(this.el).remove();
		},
		clear: function(e) {

			this.model.set({
				id: $(e.currentTarget).data('id')
			});
			this.model.destroy({
				success: function(model, response) {
					console.log(response);
				},
				error: function(model, error) {
					console.log(model, error);
				}
			});
		}
	});
	return UserView;
});