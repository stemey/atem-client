define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array",
		"dojox/mvc/getStateful", "dojox/mvc/getPlainValue", 'dojo/io-query' ],
		function(lang, declare, array, getStateful, getPlainValue, ioquery) {

			declare("service.RestService", null, {
				tokens : [],
				userNames : getStateful([]),
				watchUserNames : function(cb) {
					this.userNames.watchElements(cb);
				},
				convertError : function(errorResponse) {
					return JSON.parse(errorResponse.responseText).status;
				},
				getAccessToken : function(username) {
					return this.tokens[username];
				},
				getUserNames : function() {
					return getPlainValue(this.userNames);
				},
				loadSingleton : function(request) {
					var me = this;
					var url = request.singleton.uriPath;
					var xhrArgs = {
						url : url,
						handleAs : "json",
						load : function(data) {
							request.callback(data);
						},
						error : function(error) {
							console.log("error ", error)
							request.callback(error.response.text);
						}
					}

					xhrArgs.content = request.params;
					var deferred = dojo.xhrGet(xhrArgs);

				}
			});

			restService = new service.RestService();
			return restService;

		});
