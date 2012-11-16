define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dojox/mvc/sync",//
"app/service/RestService",//
"dojo/store/Memory",//
"dijit/form/ComboBox"//
], function(array, lang, declare, at, DecoratorWidget, sync, restService,
		Memory, ComboBox) {

	return declare("app.UserNameAttributeFactory", [], {

		getSelectables : function() {
			var userNames = restService.getUserNames();
			var data = array.map(userNames, function(userName) {
				return {
					id : userName,
					name : userName
				}
			})
			return new Memory({
				data : data
			});
		},
		create : function(attribute, modelHandle) {
			var store = this.getSelectables();
			var select = new ComboBox({
				"value" : at(modelHandle, attribute.code),
				store : store

			});
			var me = this;
			restService.watchUserNames(function() {
				select.set("store", me.getSelectables());
			}, this);

			return select;

		}
	})
});
