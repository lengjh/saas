define([
	'backbone',
	'underscore',
	'app-model',
	'app-view',
	'app-collection',
	'upload-view'
], function(Backbone, _, model, view, collection, Webuploader) {

	return function(obj) {
		 
		var Model = model(obj);
		var View = view({
			template: obj.template
		});
		var Collection = collection({
			url: obj.url
		});
		var collections = new Collection();
		window.collections = collections;


		return Backbone.View.extend({
			el: obj.el,
			initialize: function(options) {

				this.options = options;
				this.createAdd();
				collections.bind('add', this.addOne, this);
				collections.bind('reset', this.addAll, this);
				collections.fetch();

			},
			events: {
				'click .add-item': 'createOnEnter'
			},
			createAdd: function() {
				var parent = this;
				var model = new Model();
				var View = Backbone.View.extend({
					tagName: 'tr',
					template: _.template(obj.addTemplate),
					initialize: function() {
						var _this = this;
						setTimeout(function() {
							_this.bindEdit();
						}, 0);
					},
					bindEdit: function() {

						parent.editor = KindEditor.create($(this.el).find('textarea'), {
							uploadJson: '/api/file/upload',
						});
					},
					events: {
						//'click .btn-1': 'addItem'
					},
					addItem: function() {},
					render: function() {
						$(this.el).html(this.template(this.model.toJSON()));
						return this;
					}
				});
				var _view = new View({
					model: model
				});

				$(this.el)
					.find('tbody')
					.html(_view.render().el)
					.find('.img')
					.html((new Webuploader({
						multiple: false
					})).el);


			},

			createOnEnter: function(ev) {
				var _this = this;
				var model = new Model();
				var $form = $(this.el).find('tbody').find('input,select');
				var attr = {
					id: $(ev.currentTarget).data('id'),
					imageUrl: $(this.el).find('tbody').find('img').data('url'),
					link: '',
					content: ''
				};
				try {
					attr.content = _this.editor.html();
				} catch (ev) {}
				var success = function(a, b, c) {
					$(_this.el).find('.webuploader-file-list').html('');

					try {
						_this.editor.html('');
					} catch (ev) {}
					$form.val('');
				};

				model.bind("invalid", function(model, error) {
					console.log(error);
				});
				$form.each(function() {
					var name = $(this).attr('name');
					if (name) {
						attr[name] = $(this).val();
					}
				});

				if (model.set(attr)) {
					collections.create(model, {
						type: 'POST',
						validate: true,
						wait: true,
						success: success
					});
				}

			},
			addOne: function(model) {
				model.set({
					'eid': model.get('_id') || collections.length
				});
				var view = new View({
					model: model
				});

				$(obj.el).find('tfoot').append(view.render().el);
			},
			addAll: function() {
				collections.each(this.addOne);
			}

		})
	};
});