define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "./SingletonWidget", "dojo/Stateful",
		"app/service/MetaService", "app/service/RestService", 'dojo/data/ItemFileReadStore', 'app/lib/beautify',
		'gform/getPlainValue', 'gform/createStandardEditorFactory',//
		"dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/text!./method.html", "dojo/query",//
		 "dojox/highlight", "dojox/highlight/languages/javascript", "dojox/highlight/widget/Code"
], function(array, lang, declare, SingletonWidget, Stateful, metaService, restService, ItemFileReadStore, beautify,
		getPlainValue, createStandardEditorFactory,//
		_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, query, highlight) {


	return declare("app.MethodController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString:template,
		editor : null,
		meta : null,
		constructor : function() {
		},
		postCreate : function() {

			var editorFactory = createStandardEditorFactory();

			this.editorVariables.set("editorFactory", editorFactory);
			this.editorParams.set("editorFactory", editorFactory);
			this.editorBody.set("editorFactory", editorFactory);

		},
		loadData : function(meta) {

			this.hideResponse();
			this.set("meta", meta);

			if (this.meta.params) {
				this.editorParams.domNode.style.display="initial";
				this.editorParams.setMetaAndPlainValue(this.meta.params,{});
			}else{
				this.editorParams.domNode.style.display="none";
			}

			if (this.meta.pathVariables) {
				this.editorVariables.domNode.style.display="initial";
				this.editorVariables.setMetaAndPlainValue(this.meta.pathVariables,{});
			}else{
				this.editorVariables.domNode.style.display="none";
			}

			if (this.meta.requestBody) {
				this.editorBody.domNode.style.display="initial";
				this.editorBody.setMetaAndPlainValue( this.meta.requestBody,{});
			}else{
				this.editorBody.domNode.style.display="none";
			}

		},
		onRestResponse : function(response) {
			this.displayArea.innerHTML="<pre class='response'><code class='javascript'></code></pre>";
			var nodes=query("pre > code",this.displayArea);
			var node=nodes[0];
			node.innerHTML=dojo.toJson(response,true);
			 highlight.init(node);
		},
		hideResponse : function(e) {
			this.displayArea.innerHTML="";
		},
		validate: function() {
			var totalErrorCount=0;
			if (this.meta.pathVariables) {
				totalErrorCount+=this.editorVariables.validate(true);
			}
			if (this.meta.params) {
				totalErrorCount+=this.editorParams.validate(true);
			}
			if (this.meta.requestBody) {
				totalErrorCount+=this.editorBody.validate(true);
			}
			return totalErrorCount==0;
		},
		submit : function() {
			var valid=this.validate();
			if (!valid) {
				return;
			}
			
			var callback = lang.hitch(this, "onRestResponse");
			var plainParams = this.editorParams.get("plainValue");
			this.hideResponse();

			if (this.meta.verb=="GET") {
				restService.executeGet({
					params : plainParams,
					variables : this.editorVariables.get("plainValue"),
					meta : this.meta,
					callback : callback
				});
			}else if (this.meta.verb=="POST") {
				restService.executePost({
					params : plainParams,
					variables : this.editorVariables.get("plainValue"),
					requestBody : this.editorBody.get("plainValue"),
					meta : this.meta,
					callback : callback
				});
			}else if (this.meta.verb=="PUT") {
				restService.executePut({
					params : plainParams,
					variables : this.editorVariables.get("plainValue"),
					requestBody : this.editorBody.get("plainValue"),
					meta : this.meta,
					callback : callback
				});
			}else if (this.meta.verb=="DELETE") {
				restService.executeDelete({
					params : plainParams,
					variables : this.editorVariables.get("plainValue"),
					requestBody : this.editorBody.get("plainValue"),
					meta : this.meta,
					callback : callback
				});
			}
		}
	});

});
