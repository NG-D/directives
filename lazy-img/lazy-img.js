if (!directive) {
    var directive = angular.module('directive', []);
}
directive.directive('lazyImg', ['$document', function($document) {
    return {
        templateUrl: 'lazy-img/lazy-img.html',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            src: "="
        },
        controller: ['$scope', '$element', '$attrs', 'lazy', function($scope, $element, $attrs, lazy) {
            console.log($scope.src, 123456);
            if ($scope.conf) {
                angular.forEach(function(value, key) {
                    $scope[key] = value;
                });
            }
            $scope.style = {};
            $scope.url = 'demo/1.png';
            var visible;
            angular.element($element.find('img')).on({
                load: function() {
                    console.log($(this).offset().top);
                    if (visible) {
                        $scope.visible(this);
                    } else {
                        $scope.listener(this);
                    }
                },
                error: function() {
                    console.log('默认图片没有出来加载失败');
                    if (visible) {
                        $scope.error();
                    } else {
                        $scope.listener(this);
                    }
                }
            });
            $scope.listener = function(img) {
                lazy.listener({
                    node: img,
                    callback: function() {
                        visible = true;
                        if ($scope.src) {
                            $scope.url = $scope.src;
                        }
                    }
                });
            };
            $scope.visible = function() {
                $($element).addClass('visible');
            };
            $scope.error = function() {
                $($element).addClass('error');
            };
        }]
    };
}]);
directive.factory('lazy', ['$timeout', function($timeout) {
    var factory = {
        /**
         * 监听事件
         * @param  {Object} node       DOM节点
         * @param  {Object} callback   事件的回调函数
         */
        listener: function(args) {
            var lock;
            var timer;
            var win = $('.R');

            function handler() {
                var e = $(args.node);
                if (!e.length || lock || e.is(':hidden')) {
                    return;
                }
                var wt = win.scrollTop();
                var wb = wt + win.height();
                var et = e.offset().top;
                var eb = et + e.height();
                console.log(wt, wb, et, eb);
                var tf = et >= wt && et <= wb;
                var bf = et <= wt && eb >= wt;
                if (tf || bf) {
                    lock = !lock;
                    if (typeof args.callback === 'function') {
                        args.callback();
                        win.unbind('scroll', callback);
                        win.unbind('resize', callback);
                    }
                }
            }

            function callback() {
                $timeout.cancel(timer);
                timer = $timeout(handler, 200);
            }
            callback();
            win.bind('scroll', callback);
            win.bind('resize', callback);
        },
        /**
         * 实例
         * @param  {Object} json       这里的指放监听事件的参数
         */
        request: function(args) {
            var json = args.json;
            for (var member in json) {
                if (!json.hasOwnProperty(member)) {
                    continue;
                }
                this.listener({
                    node: json[member].node,
                    callback: json[member].callback
                });
            }
        }
    };
    return factory;
}]);
