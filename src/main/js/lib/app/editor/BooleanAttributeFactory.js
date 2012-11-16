define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dijit/form/CheckBox"//
], function(array, lang, declare, at, DecoratorWidget, TextBox) {

	return declare("app.BooleanAttributeFactory", [], {
		handles : function(attribute) {
			return attribute.type.code == "boolean";
		},
		create : function(attribute, modelHandle) {
			return new TextBox({
				"checked" : at(modelHandle, attribute.code)
			});

		}
	})
});
