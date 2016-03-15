angular.module('app').directive('sideBar', function () {
    return {
        templateUrl: 'directive/side-bar/side-bar.html',
        restrict: 'E',
        scope: {
            show: '='
        },
        controller: function ($scope, $element, $state, currentUser, loading, config, connector) {
            var hide = loading.show({element: angular.element('.personal-center')});
            currentUser().then(function (user) {
                $scope.user = user;
                // $scope.coverBg = {
                //     'background-image': 'url("' + config.picRoot() + $scope.user.bg  +'")'
                // };
                hide();
            }, function (err){
                hide();
            });
            $scope.goToPage = function (page) {
                $state.go(page, {id: $scope.user.id});
                $scope.hide();
            };
            $scope.hide = function () {
                $scope.show = false;
                setTimeout(function () {
                    $scope.$destroy();
                    $element.remove();
                }, 300);
            };
            connector.refreshUserInfo();
        }
    };
}).factory('sideBar', function ($rootScope, $compile) {
    return {
        show: function () {
            if (angular.element('side-bar').length) {
                return;
            }
            var tmpl = '<side-bar show="show"></side-bar>';
            var scope = $rootScope.$new(true);
            scope.show = true;
            var ele = $compile(tmpl)(scope);
            angular.element('body').append(ele);
        }
    };
});