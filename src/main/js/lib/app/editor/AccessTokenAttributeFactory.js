define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"./DecoratorWidget",//
"dojox/mvc/sync",//
"app/service/RestService",//
"dijit/form/TextBox"//
], function(array, lang, declare, at, DecoratorWidget, sync, restService,
		TextBox) {

	return declare("app.TextAttributeFactory", [], {

		create : function(attribute, modelHandle) {
			sync(modelHandle, "username", modelHandle, "access_token", {
				bindDirection : sync.from,
				converter : {
					format : function(value) {
						try {
							var accessToken = restService.getAccessToken(value);
							if (accessToken) {
								return accessToken;
							} else {
								return "not logged in";
							}
						} catch (e) {
							console.log("cannot find access token for username",e);
							return "error";
						}
					},
					parse : function(value) {
						return null;
					}
				}
			});
			return new TextBox({
				"value" : at(modelHandle, attribute.code)
			});

		}
	})
});
