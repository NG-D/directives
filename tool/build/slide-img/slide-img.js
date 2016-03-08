if (!directive) {
    var directive = angular.module('directive', []);
}
directive.directive('slideImg', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '/slide-img/slide-img.html',
        scope: {
            imgs: '=',
            c: '='
        },
        controller: function($scope, $element, $rootElement, $timeout, $interval) {
            /*
            S=$scope
            c = 传入来的config
            d = default的数据
             */
            var S = $scope;
            if (!S.imgs || !angular.isArray(S.imgs)) {
                console.log('图片数据有误！');
                return;
            }
            S.init = function() {
                if (!S.c) {
                    S.c = {};
                }
                S.c.time = S.c.time || 1.5;
                S.c.stayTime = S.c.stayTime || 4;
                S.d = {};
                S.d.i = S.d.i || 0;
                S.d.len = S.imgs.length;
                S.d.width = $element[0].clientWidth;
                S.d.slideLeft = true;
                S.d.liStyle = {
                    '-webkit-animation-duration': S.c.time + 's',
                    '-moz-animation-duration': S.c.time + 's',
                    '-o-animation-duration': S.c.time + 's',
                    'animation-duration': S.c.time + 's'
                };
            };
            S.init();

            S.prev = function() {
                if (!$scope.nextClick) {
                    $scope.nextClick = true;
                    $timeout(function() { $scope.nextClick = false; }, S.c.time * 1000);
                    if (S.d.slideLeft) {
                        S.d.slideLeft = false;
                        S.slideLeft();
                    } else {
                        S.slideRight();
                    }
                }
            };
            S.next = function() {
                if (!$scope.nextClick) {
                    $scope.nextClick = true;
                    $timeout(function() { $scope.nextClick = false; }, S.c.time * 1000);
                    if (!S.d.slideLeft) {
                        S.d.slideLeft = true;
                        S.slideRight();
                    } else {
                        S.slideLeft();
                    }
                }
            };
            S.slideRight = function() {
                if (S.d.i === 0) {
                    S.d.i = S.d.len - 1;
                    return;
                } else {
                    S.d.i--;
                    return;
                }
            };
            S.slideLeft = function() {
                if (S.d.i === S.d.len - 1) {
                    S.d.i = 0;
                    return;
                } else {
                    S.d.i++;
                    return;
                }
            };
            S.autoPlay = function() {
                S.stop = $interval(function() {
                    S.next();
                }, S.c.stayTime * 1000);
            };
            //获取动画class
            S.getClass = function(argIndex) {
                var a = 0;
                var b = 1;
                var c = '';
                var name = 'slide-l-';
                if (!S.d.slideLeft) {
                    name = 'slide-r-';
                    if (S.d.i === 0) {
                        if (argIndex === S.d.len - 1) {
                            c = name + b;
                        }
                    }
                    if (argIndex === S.d.i - 1) {
                        c = name + b;
                    }
                } else {
                    if (S.d.i === S.d.len - 1) {
                        if (argIndex === 0) {
                            c = name + b;
                        }
                    }
                    if (argIndex === S.d.i + 1) {
                        c = name + b;
                    }
                }
                if (argIndex === S.d.i) {
                    c = name + a;
                }
                return c;
            };
            S.play = function(argType) {
                if (!argType) {
                    S.autoPlay();
                } else {
                    $interval.cancel(S.stop);
                }
            };
            S.autoPlay();
        }
    };
});
