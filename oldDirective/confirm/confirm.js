angular.module('app').directive('confirm', function () {
    return {
        restrict: 'E',
        scope: {
            success: '=',
            cancel: '=',
            msg: '=',
            successText: '=',
            cancelText: '='
        },
        link: function (scope, element, attr) {

        },
        templateUrl: 'directive/confirm/confirm.html'
    };
}).factory('confirm', function ($compile, $rootScope) {
    var tmpl = '<confirm success-text="text.success" cancel-text="text.cancel" success="success" cancel="cancel" msg="msg"></confirm>';
    return function (option) {
        var scope = $rootScope.$new();
        scope = angular.extend(scope, option);
        var e = $compile(tmpl)(scope);
        angular.element('body').append(e);
        return function () {
            e.fadeOut(function () {
                e.remove();
                scope.$destroy();
            });
        };
    };
});