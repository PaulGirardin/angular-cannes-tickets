<!DOCTYPE html>
<html lang="en" ng-app="cannes-ticket">
<head>
	<meta charset="UTF-8">
	<title>CANNES</title>
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/angular-foundation-6/dist/angular-foundation.min.js"></script>
	<script src="bower_components/angular-touch/angular-touch.js"></script>
	<script src="bower_components/angular-route/angular-route.js"></script>
	<script src="bower_components/foundation-sites/dist/js/foundation.min.js"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<link rel="stylesheet" href="./app.css" />

	<script src="app.js"></script>
</head>
<body>
<div class="container">
	<div id="content"></div>
	<div ng-view></div>
</div>
</body>
</html>