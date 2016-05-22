try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lTooltip', ['$document', function($document) {
    return {
        template:'',
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            c: "=",
        },
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            if ($scope.c) {
                angular.forEach($scope.c, function(value, key) {
                    $scope[key] = value;
                });
            }
        }]
    };
}]);
