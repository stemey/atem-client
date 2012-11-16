define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container","dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin", "dojo/text!./singletype_embedded_attribute.html",
		"dijit/form/TextBox"//
], function(declare, _WidgetBase, _Container,_TemplatedMixin, _WidgetsInTemplateMixin,
		template, TextBox) {

	return declare("app.SingleTypePanelWidget",[ _WidgetBase,_Container, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
	});

});