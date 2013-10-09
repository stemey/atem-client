define(
		[ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
				"dojo/Stateful", "app/service/MetaService",
				"app/service/RestService", 'dojo/data/ItemFileReadStore',
				'app/lib/beautify', './SingletonController','./ObservationController','./MethodController',
				'./resource/GridController',//
				"dijit/registry",//
				"dijit/form/FilteringSelect",//
				"dojox/mvc/Group",//
				"dijit/_WidgetBase", "dijit/_TemplatedMixin",
				"dijit/_WidgetsInTemplateMixin", //
				"dojo/text!./service.html",//
				"gform/EditorFactory",
				"./resource/AtemStoreRegistry",
				"./resource/AtemSchemaRegistry",


		],
		function(array, lang, declare, Stateful, metaService, restService,
				ItemFileReadStore, beautify, SingletonController,ObservationController,MethodController,
				GridController,//
				registry, //
				FilteringSelect,//
				Group,//
				_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,EditorFactory, AtemStoreRegistry, AtemSchemaRegistry) {

			return declare(
					"app.ServiceController",
					[ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ],
					{
						_relTargetProp : "target",
						templateString : template,
						editor : null,
						meta : null,
						metaUrl : null,
						target : new Stateful({
							selectedService : "",
							store:null
						}),
						controllers : {

						},
						postCreate : function() {

							var store = new ItemFileReadStore({
								data : {
									identifier : 'id',
									label : 'name',
									items : []
								}
							});
							this.target.set("store",store);
							metaService.loadMeta(this.metaUrl, lang.hitch(this,
									"metaLoaded"));
							this.target.watch("selectedService", lang.hitch(
									this, "onServiceSelected"));

						},
						metaLoaded : function(resp) {
							this.storeRegistry= new AtemStoreRegistry(metaService.getAllMeta());
							this.schemaRegistry= new AtemSchemaRegistry(metaService.getAllMeta());
							var selectableServices = metaService.getServices();
							var store = new ItemFileReadStore({
								data : {
									identifier : 'id',
									label : 'name',
									items : selectableServices
								}
							});
							this.target.set("store",store);

							var oldService = this.target.get("selectedService");
							if (oldService != null) {
								this.onServiceSelected();

							}
						},
						onServiceSelected : function() {
							var service = this.target.get("selectedService");
							var meta = metaService.getMeta(service);
							if (meta) {
								var controller=this[meta.type];
								this.serviceStack.selectChild(controller);
								controller.loadData(meta, this.storeRegistry, this.schemaRegistry);
							}

						},
						onRestResponse : function(response) {
							this.displayArea.set("value", beautify(response));
						},
						onMetaChanged : function() {
							// clear response
						}
					});

		});
