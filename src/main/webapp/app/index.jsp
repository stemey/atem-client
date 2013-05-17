<!DOCTYPE html>
<html>
<head>
<meta http-equiv="expires" content="0">
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
<meta http-equiv="PRAGMA" content="NO-CACHE">
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<title>Atem Rest Client</title>

<link rel="stylesheet" type="text/css"
	href="../dojo/dojo/resources/dojo.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/dijit/themes/claro/claro.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/gform/resources/gform.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/gridx/resources/claro/Gridx.css" />
<link rel="stylesheet" type="text/css"
	href="../extensions/css/restclient.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/dojox/highlight/resources/highlight.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/dojox/highlight/resources/pygments/default.css" />

<script>
	require = {
		parseOnLoad : 0,
		isDebug : 1,
		async : 1,
		mvc : {
			debugBindings : 1
		}
	};
</script>
<!-- the production app start -->
<script src="../dojo/dojo/dojo.js"   data-dojo-config="async: true, paths: { 
                'dojox/cometd': '../cometd-dojo/cometd' , 
                'org/cometd': '../cometd-dojo/org/cometd' 
            }" type="text/javascript">


</script>



<!-- required: dojo.js -->
<%-- 	<c:if test="${not appConfiguration.debugJs}"> --%>
<!-- 	 	<script src="../dojo/app/dependencies.js" 	type="text/javascript"></script>  -->
<!-- 		<script src="../dojo/app/restclient.js"type="text/javascript"></script> -->
<%-- 	</c:if> --%>


<script type="text/javascript">
	var basePath = window.location.href.match(/(.*)\/app/);
	window.restClientConfig = {
		basePath : basePath[1]
	};

	
	require([ "dojo/parser",// 
	          "dojo/domReady!",//
	          "dojox/mvc/_patches",//
	          "dojox/mvc/Group",//
	          	"dijit/layout/BorderContainer",//
	          	"dijit/layout/ContentPane",//
	          	"app/ServiceController",//
	          ], function(parser,ready
			) {
		parser.parse();
// 		window.serviceController = new ServiceController;
// 		serviceController.set("metaUrl","../../meta/");
// 		serviceController.start();
	});
</script>



</head>

<body class="claro">

	<div id="mainContent" style="height: 100%">
		<div id="appContainer" data-dojo-type="dijit.layout.BorderContainer"
			style="width: 100%; height: 100%">
			<div id="header" dojoType="dijit.layout.ContentPane" region="top">
				<img src="../extensions/images/xx_100_trans.png" width="100"
					height="31" alt="xx" class="logo" />
				<h1>Rest Client</h1>
			</div>
			<div id="center" data-dojo-type="dijit.layout.ContentPane" region="center">
				<div data-dojo-type="app.ServiceController" data-dojo-props="metaUrl:'../../meta/'" class="editor">
				</div>

			</div>
		</div>
</body>

</html>
