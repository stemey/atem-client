define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
  "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService",
		'dojo/data/ItemFileReadStore', 'app/lib/beautify',

		'app/SingletonController',"dijit/registry",//
"dijit/form/FilteringSelect",//
"dijit/layout/BorderContainer",//
"dijit/layout/ContentPane",//
"dojox/mvc/Group" ], function(array, lang, declare, 
		 Stateful, metaService, restService, ItemFileReadStore,
		beautify, SingletonController,registry) {

	declare("app.ServiceController", [ Stateful ], {
		editor : null,
		meta : null,
		metaUrl : null,
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
			
			metaService.loadMeta(this.metaUrl,lang.hitch(this, "metaLoaded")); 
			this.model.watch("selectedService", lang.hitch(this,
					"onServiceSelected"));

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
			registry.byId("service").set("store", store);
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
