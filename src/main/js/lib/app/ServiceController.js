define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dijit/dijit-all", "app/editor/Editor", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService",
		'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'app/editor/getPlainValue','app/SingletonController' ], function(array, lang, declare, dijitall,
		Editor, Stateful, metaService, restService, ItemFileReadStore,
		beautify, getPlainValue, SingletonController) {

	declare("app.ServiceController", [ Stateful ], {
		editor : null,
		meta : null,
		model : new Stateful({
			selectedService : null,
			params : null,
			variables : null,
			requestBody : null
		}),
		constructor : function() {
		},
		start : function() {
			this.model = new Stateful({
				selectedService : null
			});
			dojo.parser.parse();
			this.controller=new SingletonController();
			var formDiv = dojo.byId("form");
			this.controller.getWidget().placeAt(formDiv);
			
			
//			this.displayArea = dijit.byId("displayArea");
//			var center = dijit.byId("center");
//			var formVariables = document.createElement("div");
//
//			this.editorVariables = new Editor({
//				srcNodeRef : formVariables
//			});
//			var variablesDiv = dojo.byId("variables");
//			this.editorVariables.placeAt(variablesDiv);
//
//			var form = document.createElement("div");
//			this.editor = new Editor({
//				srcNodeRef : form
//			});
//			var paramsDiv = dojo.byId("params");
//			this.editor.placeAt(paramsDiv);
//
//			this.editorBody = new Editor();
//			var requestBodyDiv = dojo.byId("requestBody");
//			this.editorBody.placeAt(requestBodyDiv);

			metaService.loadMeta(lang.hitch(this, "metaLoaded")); 
			this.model.watch("selectedService", lang.hitch(this,
					"onServiceSelected"));

//			dijit.byId("submit").set("onClick", lang.hitch(this, "submit"));
		},
		metaLoaded : function(resp) {
			var selectableServices = metaService.getServices();
			var store = new ItemFileReadStore({
				data : {
					identifier : 'id',
					label : 'name',
					items : selectableServices
				}
			});
			dijit.byId("service").set("store", store);
			// var currentServiceId = this.model.get("selectedService").id;
			// var newService = array.filter(selectableServices, function(
			// selectableService) {
			// return selectableService.id == currentServiceId;
			// });
			// if (newService.length == 0) {
			// newService = selectableServices[0];
			// } else {
			// newService = newService[0];
			// }
			var oldService = this.model.get("selectedService");
			if (oldService != null) {
				this.onServiceSelected();
				// this.model.set("selectedService", "");
				// this.model.set("selectedService", oldService);
			}
		},
		onServiceSelected : function() {
			var service = this.model.get("selectedService");
			this.controller.display(metaService.getMeta( service));

		},
		onRestResponse : function(response) {
			this.displayArea.set("value", beautify(response));
		},
		submit : function() {
			var callback = lang.hitch(this, "onRestResponse");
			var plainParams = {};
			for ( var key in this.meta.params) {
				var param = this.meta.params[key].code;
				var value = this.model.params[param];
				plainParams[param] = getPlainValue(value);
			}
			restService.execute({
				params : plainParams,
				variables : this.model.variables,
				requestBody : getPlainValue(this.model.requestBody),
				meta : this.meta,
				callback : callback
			});
		},
		onMetaChanged : function() {
			// clear response
		}
	});

	return new app.ServiceController();
});
