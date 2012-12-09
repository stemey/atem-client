<!DOCTYPE html>
<html>
<head>
<meta http-equiv="expires" content="0">
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
<meta http-equiv="PRAGMA" content="NO-CACHE">
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<title>simyo Rest Client</title>

<link rel="stylesheet" type="text/css"
	href="../dojo/dojo/resources/dojo.css" />
<link rel="stylesheet" type="text/css"
	href="../dojo/dijit/themes/claro/claro.css" />
<link rel="stylesheet" type="text/css"
	href="../extensions/css/restclient.css" />

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
<script src="../dojo/dojo/dojo.js" type="text/javascript">
	
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
	require([ "dojo/domReady!", "app/ServiceController" ], function(ready,
			serviceController) {

		window.serviceController = serviceController;
		serviceController.start();
	});
</script>



</head>

<body class="claro">

	<div id="mainContent" style="height: 100%">
		<div id="appContainer" dojoType="dijit.layout.BorderContainer"
			style="width: 100%; height: 100%">
			<div id="header" dojoType="dijit.layout.ContentPane" region="top">
				<img src="../extensions/images/simyo_100_trans.png" width="100"
					height="31" alt="simyo" class="logo" />
				<h1>Rest Client</h1>
			</div>
			<div id="center" dojoType="dijit.layout.ContentPane" region="center">
				<div data-dojo-type="dojox.mvc.Group" class="editor"
					data-dojo-props="target: at(serviceController, 'model')">
					<div class="row">
						<label for="service">Service:</label> <input
							id="service" data-dojo-type="dijit.form.FilteringSelect"
							data-dojo-props=' value: at("rel:", "selectedService")' />
					</div>
					<div id="form"></div>
				</div>

			</div>
		</div>
</body>

</html>
