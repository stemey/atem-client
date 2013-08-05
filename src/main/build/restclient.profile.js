dependencies = {

	layers: [{
		name: "../app/restclient.js",
		dependencies: [
		                "app/ServiceController"
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
        [ 'org/cometd', './cometd-dojo/org/cometd'],
		[ 'dojox/cometd', './cometd-dojo/cometd'] , 
		[ "dijit", "../dijit" ],
		[ "gridx", "../gridx" ],
		[ "dojox", "../dojox" ],
		[ "gform", "../gform" ],
        [ "app", "../app" ]
	]

};