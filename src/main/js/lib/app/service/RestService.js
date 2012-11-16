define(
		[ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array",
				"dojox/mvc/getStateful", "dojox/mvc/getPlainValue",
				'dojo/io-query' ],
		function(lang, declare, array, getStateful, getPlainValue, ioquery) {

			declare(
					"service.RestService",
					null,
					{
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
						execute : function(request) {
							var me = this;
							var newUser = request.params.username;
							if (newUser
									&& array.indexOf(this.userNames, newUser) < 0) {
								this.userNames.push(newUser);
							}
							var url = "../../api"
									+ request.meta.uri_pattern
											.replace(
													/\{([^\}]+)\}/g,
													function(match, variable) {
														return request.variables[variable]
													});

							var xhrArgs = {
								url : url,
								// handleAs : "json",
								load : function(data) {
									var jsResponse = JSON.parse(data);
									if (jsResponse.entity.access_token) {
										me.tokens[request.params.username] = jsResponse.entity.access_token;
									}
									request.callback(data);
								},
								error : function(error) {
									console.log("error ", error)
									request.callback(error.response.text);
								}
							}
							if (request.meta.request_body == null) {
								xhrArgs.headers = {
									access_token : request.params.access_token
								}
								if (request.meta.verb == "GET") {
									xhrArgs.content = request.params;
									var deferred = dojo.xhrGet(xhrArgs);
								} else {
									var postData = ioquery
											.objectToQuery(request.params);
									xhrArgs.postData = postData;
									var deferred = dojo.xhrPost(xhrArgs);

								}
							} else {
								xhrArgs.postData = dojo
										.toJson(request.requestBody);
								xhrArgs.headers = {
									access_token : request.params.access_token
								}
								xhrArgs.contentType = 'application/json';
								var deferred = dojo.xhrPost(xhrArgs);
							}

						}
					});

			restService = new service.RestService();
			return restService;

		});