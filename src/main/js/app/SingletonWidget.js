define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singleton.html"//
], function(array, lang, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {

	return declare("app.SingletonWidget", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		update: function(e) {
			return this.controller.update(e);
		}
		
	})
});
