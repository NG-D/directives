'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

try {
    if ((typeof directive === 'undefined' ? 'undefined' : _typeof(directive)) !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lTooltip', ['$document', function ($document) {
    return {
        template:'',
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            c: "="
        },
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            //cssStart
            var cssTpl = '<style type="text/css" id="tpl-tooltip"></style>';
            if (!$("#tpl-tooltip").length) {
                $("head").prepend(cssTpl);
            }
            //cssEnd
            if ($scope.c) {
                angular.forEach($scope.c, function (value, key) {
                    $scope[key] = value;
                });
            }
        }]
    };
}]);