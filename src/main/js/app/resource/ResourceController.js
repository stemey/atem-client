define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		 "dojo/Stateful", "app/service/MetaService",
		"app/service/RestService", 'dojo/data/ItemFileReadStore',
		'app/lib/beautify', 'gform/getPlainValue', 'gform/EditorFactory',//
		"dijit/_WidgetBase", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./resource.html"//
], function(array, lang, declare, Stateful, metaService,
		restService, ItemFileReadStore, beautify, getPlainValue, EditorFactory,//
		_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
	/**
	 * select service select id fromselctor (prefilled by getEntities)
	 * 
	 * 
	 * entity id : detail view: -> create detail
	 * 
	 * 
	 * 
	 */
	declare("app.ResourceController", [ _WidgetBase, _TemplatedMixin,
			_WidgetsInTemplateMixin ], {
		_relTargetProp : "target",
		templateString : template,
		postCreate : function() {
		},
		loadData : function(resource) {
			// this.editor.set("modelHandle", this.model);
			this.meta = resource
			restService.loadCollection({
				resource : this.resource,
				callback : lang.hitch(this, "onLoaded")
			});
			this.fixLayout();
			this.grid.set("structure",this.meta.collection.columns);

		},
		onLoaded : function(entities) {
			this.store = new dojox.data.AndOrReadStore({
				data : {
					identifier : this.meta.id_property,
					items : entities
				}
			});

			var filter = null;

			// this.dataGrid.setStore(this.store);
			this.grid._setStore(this.store);
		},
		fixLayout: function() {
			dojo.forEach(this.meta.collection.columns, function(col) {
				if (!col.width) {
					col.width = "100px";
				}
				if (typeof col.formatter == 'string') {
					var formatter = window[col.formatter];
					if (formatter) {
						col.formatter = formatter;
					}
				}
				if (col.datatype == 'number') {
					if (!col.styles) {
						col.styles = '';
					}
					col.styles += 'text-align:right;';
				}
			});

		}
	});

	return app.ResourceController;
});
