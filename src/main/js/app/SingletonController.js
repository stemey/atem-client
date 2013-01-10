define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "./SingletonWidget", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService", 'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'gform/getPlainValue', 'gform/EditorFactory' ], function(array, lang, declare, SingletonWidget, Stateful,
		metaService, restService, ItemFileReadStore, beautify, getPlainValue, EditorFactory) {
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
			var targetModel = new Stateful({
				editorFactory : new EditorFactory()
			});
			this.singletonWidget = new SingletonWidget({
				target : targetModel,
				controller:this
			});
		},
		getWidget : function() {
			return this.singletonWidget;
		},
		getTargetModel : function() {
			return this.singletonWidget.get("target");
		},
		display : function(singleton) {
			this.singleton = singleton;
			// this.editor.set("modelHandle", this.model);
			restService.loadSingleton({
				singleton : this.singleton,
				callback : lang.hitch(this, "onLoaded")
			});

		},
		onLoaded : function(entity) {
			this.model = new Stateful(entity);
			this.getTargetModel().get("modelHandle", this.model);
			this.getTargetModel().set("meta", this.singleton.resourceType);
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
