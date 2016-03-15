angular.module('app').directive('location', function () {
    return {
        restrict: 'E',
        scope: {
            done: '='
        },
        controller: function ($scope, $element, locationList) {
            locationList.then(function (data) {
                $scope.locationList = data;
                $scope.province = Object.keys($scope.locationList)[0];
                $scope.changeProvince();
            });

            $scope.changeProvince = function () {
                $scope.selectedProvince = $scope.locationList[$scope.province];
                $scope.city = Object.keys($scope.selectedProvince.child || {})[0];
                $scope.changeCity();
            };

            $scope.changeCity = function () {
                $scope.selectedCity = $scope.selectedProvince.child[$scope.city] || {};
                $scope.state = Object.keys($scope.selectedCity.child || {})[0];
                $scope.changeState();
            };

            $scope.changeState = function () {
                $scope.selectedState = ($scope.selectedCity.child || {})[$scope.state] || {};
            };
            $scope.hide = function (done) {
                if (done) {
                    $scope.done({
                        province: $scope.selectedProvince,
                        city: $scope.selectedCity,
                        state: $scope.selectedState
                    });
                }
                $element.remove();
            };
        },
        templateUrl: 'directive/location/location.html'
    };
}).factory('location', function ($rootScope, $compile) {
    var tmpl = '<location done="done"></location>';
    return function (cb) {
        var scope = $rootScope.$new(true);
        scope.done = cb;
        var e = $compile(tmpl)(scope);
        angular.element('body').append(e);
    };
});