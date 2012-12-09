define([ "dojo/_base/array", //
"dojo/_base/lang",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"../DecoratorWidget",//
"dojo/store/Memory",//
"dojox/mvc/StatefulArray",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"dojox/mvc/WidgetList"//
], function(array, lang, Editor, declare, at, DecoratorWidget, Memory,
		StatefulArray, EmbeddedListWidget, sync, WidgetList) {

	return declare("app.RepeatedEmbeddedAttributeFactory", [], {

		handles : function(attribute) {
			return attribute != null && attribute.type.attributes
					&& attribute.array;
		},
		create : function(attribute, modelHandle) {

			var model = new dojo.Stateful();
			var items = new StatefulArray(modelHandle.get(attribute.code));
			model.set("items", items);

			var select = new EmbeddedListWidget({
				target : model
			});

			var childModel = modelHandle.get(attribute.code);

			var widgetList = new WidgetList();
			widgetList.set("partialrebuild", true);
			widgetList.set("children", items);
			widgetList.set("childClz", app.Editor);
			widgetList.set("childParams", {
				meta : attribute.type
			});
			select.addChild(widgetList);

			return select;

		}
	})
});
