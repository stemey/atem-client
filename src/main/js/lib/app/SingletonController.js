define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"app/editor/Editor", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService",
		'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'app/editor/getPlainValue' ], function(array, lang, declare, 
		Editor, Stateful, metaService, restService, ItemFileReadStore,
		beautify, getPlainValue) {
	/**
	 * select service select id fromselctor (prefilled by getEntities)
	 * 
	 * 
	 * entity id : detail view: -> create detail
	 * 
	 * 
	 * 
	 */
	declare("app.SingletonController", [ Stateful ], {
		meta : null,
		model : new Stateful({}),
		constructor : function() {
			this.editor = new Editor();
		},
		getWidget : function() {
			return this.editor;
		},
		display : function(singleton) {
			this.singleton = singleton;
			//this.editor.set("modelHandle", this.model);
			restService.loadSingleton({
				singleton : this.singleton,
				callback : lang.hitch(this,"onLoaded")
			});

		},
		onLoaded : function(entity) {
			this.model = new Stateful(entity);
			this.editor.set("modelHandle", this.model);
			this.editor.set("meta", this.singleton.resourceType);
		}
	});

	return app.SingletonController;
});
