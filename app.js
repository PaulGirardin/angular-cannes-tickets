var app = angular.module("cannes-ticket", ["ngTouch", "mm.foundation", "ngRoute"]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/', {
        templateUrl: 'templates/index.html',
        controller: "FrontController",
        controllerAs: 'ctrl',
        activetab: 'home'
      })
}]);

app.run(['$rootScope', '$route', function($rootScope, $route) {
	$rootScope.$route = $route;
	$rootScope.$on('$routeChangeSuccess', function () {
	});
}])

app.controller('FrontController', 
  ['$scope', '$http', '$q',
    function($scope, $http, $q){
    var ctrl= this;
    ctrl.data = null;
    ctrl.seances = ['08:30', '11:00', '13:30', '15:00', '18:30', '22:00'];
    ctrl.seanceFound = false;
    ctrl.credit = 7;
    
    var promListing = $http.get("raw-data.txt");
    promListing.then(function(response){
      var loadedData =  response.data.split("\r\n\r\n");
      var dataArray = [];

      loadedData.forEach(function (data) {
          var littleArray = data.split("\r\n");
          var finalArray = [];

          littleArray.forEach(function (d, index) {
            if (index > 2) {
              finalArray.push(d.split(',').map(elt => elt.trim()));
            } else {
              finalArray.push(d.trim());
            }
          });

          dataArray.push(finalArray);
      });

      ctrl.data = dataArray;
      // If you want to dl a json
      // var obj = JSON.parse(JSON.stringify(dataArray));
      // var blob = new Blob([obj], {type: "application/json"});
      // var url  = URL.createObjectURL(blob);
      // var a = document.createElement('a');
      // a.download    = "backup.json";
      // a.href        = url;
      // a.textContent = "Download backup.json";

      // document.getElementById('content').appendChild(a);
    });


    $q.all([promListing])
      .then(function(){
                console.log("everything is loaded !");
        }, function(){
                console.error("OOPS !")
            });


    ctrl.demand = function ($event) {

      var targeted = $(event.target);
      if (! targeted.hasClass('seance')) {
        targeted = targeted.parent();
      }

      if (targeted.hasClass('demanded')) {
        return;
      }

      if (targeted.children().first().children().hasClass('high-demand')) {
        if (ctrl.credit < 2) {
          alert('You haven\'t enough credit');
          return;
        }

        ctrl.credit -= 2;
      } else {
        if (ctrl.credit < 1) {
          alert('You haven\'t enough credit');
          return;
        }

        ctrl.credit -= 1;
      }

      targeted.addClass('demanded');
    }


    // ctrl.placeMarker = function(map, position){
    //   ctrl.marker.setPosition(position);
    //   ctrl.guess = position;
    // }
}]);