define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./TextAttributeFactory",//
"./BooleanAttributeFactory",//
"./SelectAttributeFactory",//
"./AccessTokenAttributeFactory",//
"./UserNameAttributeFactory",//
"./MappedSelectAttributeFactory",//
"./IntegerAttributeFactory",//
"./SelectArrayAttributeFactory",//
"./CurrencyAmountAttributeFactory",//
"./AttributeListWidget"

], function(array, lang, declare, at, DecoratorWidget, TextAttributeFactory,
		BooleanAttributeFactory, SelectAttributeFactory,
		AccessTokenAttributeFactory, UserNameAttributeFactory,
		MappedSelectAttributeFactory, IntegerAttributeFactory,
		SelectArrayAttributeFactory, CurrencyAmountAttributeFactory,
		AttributeListWidget) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {

		},
		attributeFactoryMap : {
			"text" : new TextAttributeFactory(),
			"Integer" : new TextAttributeFactory(),
			"DateTime" : new TextAttributeFactory(),
			"Email" : new TextAttributeFactory(),
			"Phone" : new TextAttributeFactory(),
			"access-token" : new AccessTokenAttributeFactory(),
			"username" : new UserNameAttributeFactory(),
			"select" : new SelectAttributeFactory(),
			"mapped-select" : new MappedSelectAttributeFactory(),
			"String" : new TextAttributeFactory()
		},

		attributeFactories : [ //
		new SelectArrayAttributeFactory(),//
		new IntegerAttributeFactory(),//
		new CurrencyAmountAttributeFactory(),//
		new SelectAttributeFactory(), // 
		new BooleanAttributeFactory(), // 
		new TextAttributeFactory() //
		],
		addFactory : function(factory) {
			this.attributeFactories.push(factory);
		},
		createAttribute : function(attribute, modelHandle) {
			var factory = this.attributeFactoryMap[attribute.editor];
			// if (factory == null) {
			// factory = this.attributeFactoryMap[attribute.type.code];
			// }
			if (factory == null) {
				var factories = array.filter(this.attributeFactories, function(
						af) {
					return af.handles && af.handles(attribute);
				});
				if (factories == null || factories.length == 0) {
					if (attribute.type.attributes) {
						return this;
					} else {
						console.log("no factory found for "
								+ JSON.stringify(attribute));
						return null;
					}
				} else {
					factory = factories[0];
				}
			}
			return factory.create(attribute, modelHandle);
		},
		create : function(group, modelHandle) {
			var listWidget = new AttributeListWidget();
			array.forEach(group.type.attributes, function(attribute) {
				var label = attribute.label;
				var widget = new DecoratorWidget({
					label : label
				});
				var attributeEditor = this.createAttribute(attribute,
						modelHandle);
				if (attributeEditor != null) {
					widget.addChild(attributeEditor);
					listWidget.addChild(widget);
				}
			}, this);
			return listWidget;

		}
	})
});
