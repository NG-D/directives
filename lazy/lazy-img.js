try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lLazyImg', ['$document', function($document) {
    return {
        template:'<div><style type="text/css">body{font-size:12px}</style><div class="light"></div><img ng-src="{{url}}" width="{{width}}" height="{{height}}" ng-style="style" ng-class="class" alt="暂无图片"></div>',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            src: "=",
            c: "=",
        },
        controller: ['$scope', '$element', '$attrs', 'lazy', function($scope, $element, $attrs, lazy) {
            if ($scope.c) {
                angular.forEach($scope.c, function(value, key) {
                    $scope[key] = value;
                });
            }
            $scope.url = $scope.url || 'data:image/png;base64,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';
            var visible;
            $element.find('img').on('load', function() {
                if (visible) {
                    $scope.visible(this);
                } else {
                    $scope.listener(this);
                }
            });
            $element.find('img').on('error', function() {
                if (visible) {
                    $scope.error();
                } else {
                    $scope.listener();
                }
            });
            $scope.listener = function(img) {
                lazy.listener({
                    id: $scope.id || '',
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
                $element.addClass('visible');
            };
            $scope.error = function() {
                $element.addClass('error');
            };
        }]
    };
}]);
directive.factory('lazy', ['$timeout', '$window', function($timeout, $window) {
    var factory = {
        /**
         * 监听事件
         * @param  {Object} id         监听滚动元素ID
         * @param  {Object} node       DOM节点
         * @param  {Object} callback   事件的回调函数
         */
        listener: function(args) {
            var lock;
            var timer;
            //监听滚动元素
            var w;
            if (args.id) {
                w = document.getElementById(args.id);
            } else {
                w = window;
            }

            function handler() {
                var e = args.node;
                if (!angular.element(e).length || lock) {
                    return;
                }
                var wt = w.scrollTop;
                var wh = wt + w.offsetHeight;
                var et = e.offsetTop;
                var eh = et + e.offsetHeight;
                var tf = et >= wt && et <= wh;
                var bf = et <= wt && eh >= wt;
                if (tf || bf) {
                    lock = !lock;
                    if (typeof args.callback === 'function') {
                        args.callback();
                        angular.element(w).unbind('scroll', callback);
                        angular.element(w).unbind('resize', callback);
                    }
                }
            }

            function callback() {
                $timeout.cancel(timer);
                timer = $timeout(handler, 200);
            }
            callback();
            angular.element(w).bind('scroll', callback);
            angular.element(w).bind('resize', callback);
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
