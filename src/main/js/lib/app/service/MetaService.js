define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array" ],
		function(lang, declare, array) {

			declare("service.MetaService", null, {
				convertError : function(errorResponse) {
					return JSON.parse(errorResponse.responseText).status;
				},
				getMeta : function(callback) {

					var me = this;
					var xhrArgs = {
						url : "../../api/meta/",
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
					this.meta = data.entity;
				},
				getVersions : function() {
					var versions = [];
					for ( var key in this.meta) {
						versions.push({
							id : key,
							name : key
						});
					}
					versions.sort(function(a, b) {
						return a.name > b.name ? 1:-1;
					})
					return versions;
				},
				getServices : function(version) {
					var services = [];
					var methods = this.meta[version].methods;
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
				getEditor : function(version, service) {
					return this.meta[version].methods[service];
				}

			});

			metaService = new service.MetaService();
			return metaService;

		});