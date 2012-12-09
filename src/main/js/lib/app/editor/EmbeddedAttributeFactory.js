define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./GroupPanelWidget",//
"./SingleTypePanelWidget",//
"./TextAttributeFactory",//
"./SelectAttributeFactory",//
"./AccessTokenAttributeFactory",//
"./UserNameAttributeFactory",//
"./MappedSelectAttributeFactory",//
"dijit/layout/StackContainer",//
"./GroupFactory",//
"dojo/Stateful",//
"dijit/TitlePane",//
"./AttributeListWidget"//

], function(array, lang, declare, at, DecoratorWidget, GroupPanelWidget,
		SingleTypePanelWidget, TextAttributeFactory, SelectAttributeFactory,
		AccessTokenAttributeFactory, UserNameAttributeFactory,
		MappedSelectAttributeFactory, StackContainer, GroupFactory, Stateful,
		TitlePane, AttributeListWidget) {

	return declare("app.EmbeddedGroupFactory", GroupFactory,
			{
				handles : function(attribute, modelHandle) {
					return attribute != null && attribute.type.attributes && !attribute.array;
				},
				create : function(attribute, modelHandle) {

					var model = modelHandle.get(attribute.code);
					if (!model) {
						model = new Stateful();
						modelHandle.set(attribute.code, model);
					}

					var panelWidget;

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
						var panelWidget = new GroupPanelWidget({
							target : panelModel

						});

						var typeStack = new StackContainer();
						var typeToGroup = {};
						array.forEach(attribute.validTypes, function(type) {
							var listWidget = new AttributeListWidget();
							this.addChildren(listWidget, type.attributes,
									model);
							typeStack.addChild(listWidget);
							typeToGroup[type.code] = listWidget;
						}, this);
						var nullWidget = new AttributeListWidget();
						typeStack.addChild(nullWidget);
						typeToGroup["null"] = nullWidget;
						panelModel.watch("type", function() {
							var type = panelModel.get("type");
							if (type == "null") {
								modelHandle.set(attribute.code, null);
								model.set(attribute.type.type_property, null);
								typeStack.selectChild(typeToGroup[type]);
							} else {
								modelHandle.set(attribute.code, model);
								model.set(attribute.type.type_property, type);
								typeStack.selectChild(typeToGroup[type]);
							}
						});
						panelWidget.addChild(typeStack);
						panelModel.set("type", validTypeOptions[0].value);
					} else {
						model.set(attribute.type.type_property,
								attribute.type.code)
						var panelModel = new dojo.Stateful();
						panelModel.set("empty", false);
						panelModel.set("title", "");
						panelModel.watch("empty", function(e) {
							if (panelModel.get("empty")) {
								modelHandle.set(attribute.code, null);
							} else {
								modelHandle.set(attribute.code, model);
							}
						});
						panelWidget = new SingleTypePanelWidget({
							target : panelModel
						});
						this.addChildren(panelWidget,
								attribute.type.attributes, model);
					}

					return panelWidget;

				},
				addChildren : function(panelWidget, attributes, modelHandle) {
					array.forEach(attributes, function(embeddedAttribute) {
						var label = embeddedAttribute.label
								|| embeddedAttribute.code;
						var widget = new DecoratorWidget({
							label : label
						});
						var attributeEditor = this.createAttribute(
								embeddedAttribute, modelHandle);
						if (attributeEditor != null) {
							widget.addChild(attributeEditor);
							panelWidget.addChild(widget);
						}
					}, this);
				}
			})
});
