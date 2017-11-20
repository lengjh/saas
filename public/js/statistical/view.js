define([
	'jquery',
	'underscore',
	'backbone',
	'admin-statistical-collection'
], function($, _, Backbone, StatisticalList) {

	return Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#statisticalTpl').html()),
		events: {
			'click .del': 'clear'
		},
		initialize: function() {
			// 每次更新模型后重新渲染  
			//this.model.bind('change', this.render, this);
			// 每次删除模型之后自动移除UI  
			this.model.bind('destroy', this.remove, this);
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		remove: function(ev) {
			$(this.el).remove();
		},
		clear: function(ev) {

			if (confirm('确定要删除吗？')) {
				this.model.set({
					id: $(ev.currentTarget).data('id')
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

		}
	});
});