define(
		[ "dojo/_base/array", //
		"dojo/_base/lang",//
		"dojo/_base/declare",//
		"dojox/mvc/at",//
		"./DecoratorWidget",//
		"dijit/form/NumberTextBox"//

		],
		function(array, lang, declare, at, DecoratorWidget, NumberTextBox) {

			return declare(
					"app.TextAttributeFactory",
					[],
					{
						handles : function(attribute) {
							return (attribute.type.code == "Integer" || attribute.type.code == "Long")
									&& !attribute.array;
						},
						create : function(attribute, modelHandle) {
							return new NumberTextBox({
								"value" : at(modelHandle, attribute.code)
							});

						}
					})
		});
