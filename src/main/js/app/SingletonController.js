define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "./SingletonWidget", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService", 'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'gform/getPlainValue', 'gform/EditorFactory',//
		"dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singleton.html"//
		], function(array, lang, declare, SingletonWidget, Stateful,
		metaService, restService, ItemFileReadStore, beautify, getPlainValue, EditorFactory,//
		_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template
		) {
	/**
	 * select service select id fromselctor (prefilled by getEntities)
	 * 
	 * 
	 * entity id : detail view: -> create detail
	 * 
	 * 
	 * 
	 */
	declare("app.SingletonController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		_relTargetProp : "target",
		templateString : template,
		meta : null,
		model : new Stateful({}),
		postCreate : function() {
			this.target = new Stateful({
				editorFactory : new EditorFactory(),
				modelHandle:new Stateful({}),
				meta:new Stateful({})
			});
		},
		loadData : function(singleton) {
			this.singleton = singleton;
			// this.editor.set("modelHandle", this.model);
			restService.loadSingleton({
				singleton : this.singleton,
				callback : lang.hitch(this, "onLoaded")
			});

		},
		onLoaded : function(entity) {
			this.model = new Stateful(entity);
			this.target.set("modelHandle", this.model);
			this.target.set("meta", this.singleton.resourceType);
		},
		update : function() {
			var entity = getPlainValue(this.model);
			restService.updateSingleton({
				singleton : this.singleton,
				entity : entity
			});
		}
	});

	return app.SingletonController;
});
