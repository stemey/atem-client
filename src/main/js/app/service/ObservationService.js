define([ "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array",
		"dojox/cometd", 'dojo/io-query','dojo/_base/json' ],
		function(lang, declare, array, cometd, ioquery) {

			declare("service.ObservationService", null, {
				constructor: function() {
					cometd.init(new String(document.location).replace(/\/app\/.*$/, '') + "/cometd");
				},
				observe: function(topic,listener) {
					cometd.subscribe("/atem/entity/application/configuredBean2", listener);
				}
			});

			restService = new service.ObservationService();
			return restService;

		});
