try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lTooltip', function($document) {
    return {
        templateUrl: '../../src/tooltip/tooltip.html',
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            c: "=",
        },
        controller: function($scope, $element, $attrs) {
            if ($scope.c) {
                angular.forEach($scope.c, function(value, key) {
                    $scope[key] = value;
                });
            }
        }
    };
});
