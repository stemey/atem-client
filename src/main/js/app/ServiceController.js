define(
		[ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
				"dojo/Stateful", "app/service/MetaService",
				"app/service/RestService", 'dojo/data/ItemFileReadStore',
				'app/lib/beautify','./ObservationController','./MethodController',
				'./resource/GridController',//
				"dijit/registry",//
				"dijit/form/FilteringSelect",//
				"dojox/mvc/Group",//
				"dijit/_WidgetBase", "dijit/_TemplatedMixin",
				"dijit/_WidgetsInTemplateMixin", //
				"dojo/text!./service.html",//
				"gform/EditorFactory",
				"gform/layout/_InvisibleMixin",
				"./resource/AtemStoreRegistry",
				"./resource/AtemSchemaRegistry",
				"dojo/on",
				"dijit/MenuBar",
				"dijit/PopupMenuBarItem",	
				"dijit/DropDownMenu",
				"dijit/MenuItem",

		],
		function(array, lang, declare, Stateful, metaService, restService,
				ItemFileReadStore, beautify, ObservationController,MethodController,
				GridController,//
				registry, //
				FilteringSelect,//
				Group,//
				_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template,EditorFactory, _InvisibleMixin, AtemStoreRegistry, AtemSchemaRegistry, on) {

			return declare(
					"app.ServiceController",
					[ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _InvisibleMixin ],
					{
						isLayoutContainer:true,		
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
						startup: function() {
							this.inherited(arguments);
							array.forEach(this.menuBar.getChildren(), function(menuItem){
								array.forEach(menuItem.popup.getChildren(), function(navItem){
									navItem.onClick = lang.hitch(this, "onNavClicked", navItem);
								}, this)	
							}, this)
						},
						onNavClicked: function(navItem) {
							this.selectService(navItem.service);
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
						},
						selectService: function(service) {
							var meta = metaService.getMeta(service);
							if (meta) {
								this.target.set("selectedService", service);
							} else {
								var serviceId = "org.atemsource.atem.adminclient."+service;
								this.target.set("selectedService", serviceId);
							}
						},
						selectShortService: function(name) {
							this.target.set("selectedService", name);
						},
						findCars:function() {
							this.selectShortService("findCar");
						},
						createCar:function() {
							this.selectShortService("addCar");
						},
						updateCar:function() {
							this.selectShortService("updateCar");
						},
						deleteCar:function() {
							this.selectShortService("deleteCar");
						},
						showCategory:function() {
							this.selectService("jpa.Category");
						},
						showCar:function() {
							this.selectService("jpa.Car");
						},
						showExample1:function() {
							this.selectService("jpa.Car");
						},
						showExample2:function() {
							this.selectService("jpa.Car");
						},
					});

		});
