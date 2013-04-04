define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array",
		"dojox/mvc/getStateful", "dojox/mvc/getPlainValue", 'dojo/io-query','dojo/_base/json' ],
		function(lang, declare, array, getStateful, getPlainValue, ioquery) {

			declare("service.RestService", null, {
				convertError : function(errorResponse) {
					return JSON.parse(errorResponse.responseText).status;
				},
				executeGet : function(request) {
					var me = this;
					var url = request.meta.uriPattern;
					url= lang.replace(url,request.variables);
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

				},
				executeDelete : function(request) {
					var me = this;
					var url = request.meta.uriPattern;
					url= lang.replace(url,request.variables);
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
					var deferred = dojo.xhrDelete(xhrArgs);

				},
				executePost : function(request) {
					var me = this;
					var url = request.meta.uriPattern;
					url= lang.replace(url,request.variables);
					var xhrArgs = {
						url : url,
						handleAs : "json",
						headers: { "Content-Type": "application/json"},
						load : function(data) {
							request.callback(data);
						},
						error : function(error) {
							console.log("error ", error)
							request.callback(error.response.text);
						}
					}
					if (request.requestBody) {
						xhrArgs.postData=dojo.toJson(request.requestBody);
					}else{
						xhrArgs.request.params;
					}

					var deferred = dojo.xhrPost(xhrArgs);

				},				
				executePut : function(request) {
					var me = this;
					var url = request.meta.uriPattern;
					url= lang.replace(url,request.variables);
					var xhrArgs = {
						url : url,
						handleAs : "json",
						headers: { "Content-Type": "application/json"},
						load : function(data) {
							request.callback(data);
						},
						error : function(error) {
							console.log("error ", error)
							request.callback(error.response.text);
						}
					}
					if (request.requestBody) {
						xhrArgs.postData=dojo.toJson(request.requestBody);
					}else{
						xhrArgs.request.params;
					}

					var deferred = dojo.xhrPut(xhrArgs);

				},				
				loadSingleton : function(request) {
					var me = this;
					var url = request.singleton.uriPath;
					url= lang.replace(url,request.variables);
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

				},
				updateSingleton : function(request) {
					var me = this;
					var url = request.singleton.uriPath;
					var xhrArgs = {
						url : url,
						putData: dojo.toJson(request.entity),
						headers:{"Content-Type":"application/json"},
						handleAs : "json",
						load : function(data) {
							request.callback(data);
						},
						error : function(error) {
							console.log("error ", error)
							request.callback(error.response.text);
						}
					}

					var deferred = dojo.xhrPut(xhrArgs);

				}
			});

			restService = new service.RestService();
			return restService;

		});
