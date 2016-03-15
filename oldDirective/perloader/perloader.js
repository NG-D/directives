angular.module('app').directive("perloaderDir", function() {
    return {
        template: [
            '<div ng-class="\'perloader-dir \'+ myclass" ng-if="show">',
            '<div class="small-scale"><div ng-class="\'swiper-lazy-preloader swiper-lazy-preloader-\'+ colorClass"></div></div>',
            '</div>'
        ].join(''),
        restrict: "E",
        scope: {
            show: "=show",
            color: "=color",
            myclass: "=myclass"
        },
        controller: function($scope) {
            switch ($scope.color) {
                case 'white':
                    $scope.colorClass = 'white';
                    break;
                default:
                    $scope.colorClass = 'black';
            }
        }
    };
})
.factory('loading', function ($compile, $rootScope) {
    return {
        show: function (option) {
            option = option || {};
            var tmpl = '<perloader-dir show="show" color="color" myclass="myclass"></perloader-dir>';
            var target = option.element || angular.element('body');
            var eles = [];
            target.each(function (index, item) {
                var scope = $rootScope.$new(true);
                scope.show = true;
                scope.color = option.color;
                scope.myclass = option.class;
                var ele = $compile(tmpl)(scope);
                angular.element(item).append(ele);
                eles.push({element: ele, scope: scope});
            });
            return function () {
                eles.forEach(function (item) {
                    item.scope.$destroy();
                    item.element.remove();
                });
            };
        }
    };
});
