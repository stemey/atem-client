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
		[ "app", "../app" ]
	]

};