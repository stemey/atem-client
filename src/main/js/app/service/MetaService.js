define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array" ],
		function(lang, declare, array) {

			declare("service.MetaService", null, {
				convertError : function(errorResponse) {
					return JSON.parse(errorResponse.responseText).status;
				},
				loadMeta : function(url,callback) {

					var me = this;
					var xhrArgs = {
						url : url,
						handleAs : "json",
						load : function(data) {
							me.onLoaded(data);
							callback();
						},
						error : function(error) {
							console.log("error ", error)
						}
					}

					// Call the asynchronous xhrGet
					var deferred = dojo.xhrGet(xhrArgs);
				},
				onLoaded : function(data) {
					this.meta = data;
				},

				getServices : function() {
					var services = [];
					var methods = this.meta.services;
					for ( var key in methods) {
						services.push({
							id : key,
							name : key
						});
					}
					services = services.sort(function(a, b) {
						return a.name > b.name ? 1:-1;
					})
					return services;

				},
				getMeta : function(service) {
					return this.meta.services[service];
				}

			});

			metaService = new service.MetaService();
			return metaService;

		});
