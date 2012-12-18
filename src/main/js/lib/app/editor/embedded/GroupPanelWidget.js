define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful",
		"../AttributeListWidget",//
		"dojox/mvc/Bind"//
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		AttributeListWidget,Bind) {

	return declare("app.GroupPanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		//_setMetaAttr : function(/* dojo/Stateful */attribute) {
		postCreate : function() {
			var attribute=this.get("meta");
			// move this to postCreate
			var validTypes = attribute.validTypes;

			if (validTypes != null && validTypes.length > 1) {
				var validTypeOptions = array.map(attribute.validTypes,
						function(validType) {
							return {
								value : validType.code,
								label : validType.label
							};
						});
				validTypeOptions.push({
					label : "null",
					value : "null"
				});
				var initialType = validTypeOptions[0].value
				var panelModel = new Stateful({
					title : "",// attribute.code,
					validTypes : validTypeOptions,
					type : initialType
				});

				var typeStack = new StackContainer();
				var typeToGroup = {};
				var me=this;
				var typeToModel={};
				var modelHandle = this.get("modelHandle");
				typeToModel[initialType]=modelHandle.get(attribute.code);	
				array.forEach(attribute.validTypes, function(type) {
					var editor = new app.Editor();
					//Bind.bind(this,"modelHandle",editor,"modelHandle");
					typeStack.addChild(editor);
					typeToGroup[type.code] = editor;
					if (type.code!=initialType) {	
						typeToModel[type.code]=new Stateful();
						typeToModel[type.code][attribute.type_property]=type.code;
						editor.set("modelHandle", typeToModel[type.code]);
					}else{
						editor.set("modelHandle", typeToModel[type.code]);
					}
					editor.set("meta", type);
				}, this);
				var nullWidget = new AttributeListWidget();
				typeStack.addChild(nullWidget);
				typeToGroup["null"] = nullWidget;
					
				panelModel.watch("type", function() {
					var type = panelModel.get("type");
					var modelHandle=me.get("modelHandle");
					if (type == "null") {
						modelHandle.set(attribute.code, null);
//						model.set(attribute.type_property, null);
						typeStack.selectChild(typeToGroup[type]);
					} else {
//						modelHandle
//								.set(attribute.code, me.get("modelHandle"));
						modelHandle.set(attribute.code, typeToModel[type]);
						typeStack.selectChild(typeToGroup[type]);
					}
				});
				this.addChild(typeStack);
				panelModel.set("type", validTypeOptions[0].value);
			} else {
				model.set(attribute.type.type_property, attribute.type.code)
				var panelModel = new dojo.Stateful();
				panelModel.set("empty", false);
				panelModel.set("title", "");
				var me=this;
				panelModel.watch("empty", function(e) {
					var modelHandle=me.get("modelHandle");
					if (panelModel.get("empty")) {
//						modelHandle.set(attribute.code, null);
					} else {
//						modelHandle
//								.set(attribute.code, me.get("modelHandle"));
					}
				});
				editor = new app.Editor();
				editor.set("meta", attribute.type);
				editor.set("modelHandle", this.get("modelHandle").get(attribute.code));
				panelWidget = editor;
			}
			this.set("target", panelModel);
		}

	});

});
