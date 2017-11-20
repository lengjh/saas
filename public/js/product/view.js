define([
	'backbone',
	'/js/product/model.js'
], function(Backbone, Model) {
	var htmlResult = [
		'<td class="w-p-10"><%=name%></td>',
		'<td class=""><%=content%></td>',
		'<td class="w-p-10"><%=createTime%></td>',
		'<td class="w-p-10">编辑删除</td>'
	].join('');
	return Backbone.View.extend({
		tagName: 'tr',
		initialize: function() {

		},
		template: _.template(htmlResult),
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
});