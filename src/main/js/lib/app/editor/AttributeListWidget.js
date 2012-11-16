define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./attribute_list.html",
		"dijit/form/TextBox"//
], function(declare, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template) {

	return declare("app.AttributeListWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
	});

});