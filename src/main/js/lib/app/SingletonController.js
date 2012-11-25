define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dijit/dijit-all", "app/editor/Editor", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService",
		'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'app/editor/getPlainValue' ], function(array, lang, declare, dijitall,
		Editor, Stateful, metaService, restService, ItemFileReadStore,
		beautify, getPlainValue) {
/**
 * select service
 * select id fromselctor (prefilled by getEntities)
 * 
 * 
 * entity id : detail view: -> create detail
 * 
 * 
 * 
 */
	declare("app.SingletonController", [ Stateful ], {
		meta : null,
		model : new Stateful({
		}),
		constructor : function() {
		},
		display : function(singleton) {
			this.editor.set("modelHandle", this.model);
			this.editor.set("meta", this.singleton.editor);
			restService.findSingleton(singleton,lang.hitch("onLoaded",this));

		},
		onLoaded : function(entity) {
			this.model = new Stateful(entity);
			}
	});

	return new app.SingletonController();
});
