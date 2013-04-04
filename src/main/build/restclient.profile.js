dependencies = {

	layers: [{
		name: "../app/restclient.js",
		dependencies: [
		                "app/ApplicationController"
		]
	}
	,
	{
		name: "../app/dependencies.js",
		dependencies: [
		                "dojo/_base/declare",
		                "dojo/require",
			        	"dojo/parser"
			]
	}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "gform", "../gform" ],
		['dojox/cometd', '../cometd-dojo/cometd'] , 
        ['org/cometd', '../cometd-dojo/org/cometd'],
        [ "app", "../app" ]
	]

};