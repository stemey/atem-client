define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./GroupFactory",//
"./DecoratorWidget",//
"./EmbeddedAttributeFactory",//
"dijit/form/TextBox"//
], function(array, lang, declare, at, GroupFactory, DecoratorWidget,
		EmbeddedAttributeFactory, TextBox) {

	return declare("app.EditorFactory", [], {
		constructor : function() {
			this.groupFactories["list"]
					.addFactory(new EmbeddedAttributeFactory());
		},
		groupFactories : {
			"list" : new GroupFactory()
		},
		create : function(editor, modelHandle) {
			if (!editor) {
				return null;
			}
			if (editor.group) {
				return this.find(editor.group)
						.create(editor.group, modelHandle);
			} else if (lang.isArray(editor.attributes)) {
				return this.groupFactories["list"].create({
					type : {
						attributes : editor.attributes
					}
				}, modelHandle);
			}
		},
		find : function(group) {
			return this.groupFactories[group.type];
		}

	})
});
