define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"./ExpandableDecoratorWidget",//
"./AttributeListWidget",//
"../AttributeFactoryFinder"

], function(array, lang, declare, at, DecoratorWidget, ExpandableDecoratorWidget, AttributeListWidget,
		AttributeFactoryFinder) {

	return declare("app.Groupfactory", null, {
		constructor : function(kwArgs) {

		},
		createAttribute : function(attribute, modelHandle) {
			var factory = AttributeFactoryFinder.getFactory(attribute);
			if (factory != null) {
				return factory.create(attribute, modelHandle);
			} else {
				return null;
			}
		},
		create : function(group, modelHandle) {
			var listWidget = new AttributeListWidget();
			array.forEach(group.type.attributes, function(attribute) {
				var label = attribute.label;
				if (attribute.type.attributes || attribute.validTypes)
				{
					var widget = new ExpandableDecoratorWidget({
						label : label
					});
				}else{
					var widget = new DecoratorWidget({
						label : label
					});
				}
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
