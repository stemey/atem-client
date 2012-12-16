define([ "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html", "dijit/layout/StackContainer"//
], function(declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer) {

	return declare("app.GroupPanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		_setTargetAttr : function(/* dojo/Stateful */value) {

			this.addChild(new StackContainer());
		}
	});

});