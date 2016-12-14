'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

try {
    if ((typeof directive === 'undefined' ? 'undefined' : _typeof(directive)) !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lSlideImg', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template:'<div class="slide-img" ng-class="c.class" ng-style="c.style"><button type="button" ng-mouseenter="play(1)" ng-mouseleave="play()" class="prev" ng-click="prev()"><span class="u"></span> <span class="d"></span></button> <button type="button" ng-mouseenter="play(1)" ng-mouseleave="play()" class="next" ng-click="next()"><span class="u"></span> <span class="d"></span></button><ul ng-style="d.ulStyle"><li ng-repeat="i in imgs track by $index" ng-class="getClass($index)" ng-style="d.liStyle"><img ng-src="{{i}}" alt="$index" ng-style="c.imgStyle"></li></ul></div>',
        scope: {
            imgs: '=',
            c: '='
        },
        controller: ['$scope', '$element', '$rootElement', '$timeout', '$interval', function ($scope, $element, $rootElement, $timeout, $interval) {
            //cssStart
            var cssTpl = '<style type="text/css" id="tpl-slide-img">.slide-img,.slide-img ul{list-style:none;margin:0;padding:0}.slide-img .next:focus,.slide-img .prev:focus{outline:0}.slide-img .slide-l-0,.slide-img .slide-l-1,.slide-img .slide-r-0,.slide-img .slide-r-1{-webkit-animation-duration:1.5s;-moz-animation-duration:1.5s;-o-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-fill-mode:forwards;-moz-animation-fill-mode:forwards;-o-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-img{position:relative;width:640px;height:360px;border-radius:5px;overflow:hidden;border:1px solid #f5f5f5}.slide-img:hover .prev{left:5%;-o-transition:left .5s ease-in;-moz-transition:left .5s ease-in;transition:left .5s ease-in}.slide-img:hover .next{right:5%;-o-transition:right .5s ease-in;-moz-transition:right .5s ease-in;transition:right .5s ease-in}.slide-img ul{height:100%}.slide-img li{position:absolute;width:100%;left:-100%;top:0;margin:auto}.slide-img li img{max-width:100%;max-height:100%}.slide-img>button{padding:0;margin:0;border:none;position:absolute;z-index:1000;font-size:30px;background-color:rgba(0,0,0,.4);width:40px;height:40px;line-height:40px;border-radius:20px;text-align:center}.slide-img>button:active,.slide-img>button:hover{background-color:rgba(0,0,0,.6)}.slide-img .next,.slide-img .prev{position:absolute;z-index:10;width:40px;height:40px}.slide-img .next .d,.slide-img .next .u,.slide-img .prev .d,.slide-img .prev .u{left:12px;display:inline-block;height:3px;width:15px;background-color:#fff;position:absolute}.slide-img .next .u,.slide-img .prev .u{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);top:15px}.slide-img .next .d,.slide-img .prev .d{-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);top:24px}.slide-img .next,.slide-img .prev{top:50%;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%)}.slide-img .prev{left:-20%;-o-transition:left .5s ease-out;-moz-transition:left .5s ease-out;transition:left .5s ease-out}.slide-img .next{right:-20%;-o-transition:right .5s ease-out;-moz-transition:right .5s ease-out;transition:right .5s ease-out}.slide-img .next .u{left:15px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.slide-img .next .d{left:15px;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.slide-img .slide-l-0{-webkit-animation-name:slide-l;-moz-animation-name:slide-l;-o-animation-name:slide-l;animation-name:slide-l}.slide-img .slide-l-1{-webkit-animation-name:slide-r;-moz-animation-name:slide-r;-o-animation-name:slide-r;animation-name:slide-r}.slide-img .slide-r-0{-webkit-animation-name:slide-l1;-moz-animation-name:slide-l1;-o-animation-name:slide-l1;animation-name:slide-l1}.slide-img .slide-r-1{-webkit-animation-name:slide-r1;-moz-animation-name:slide-r1;-o-animation-name:slide-r1;animation-name:slide-r1}@-webkit-keyframes slide-l{0%{left:0}100%{left:-100%}}@-moz-keyframes slide-l{0%{left:0}100%{left:-100%}}@-o-keyframes slide-l{0%{left:0}100%{left:-100%}}@keyframes slide-l{0%{left:0}100%{left:-100%}}@-webkit-keyframes slide-r{0%{left:100%}100%{left:0}}@-moz-keyframes slide-r{0%{left:100%}100%{left:0}}@-o-keyframes slide-r{0%{left:100%}100%{left:0}}@keyframes slide-r{0%{left:100%}100%{left:0}}@-webkit-keyframes slide-l1{0%{left:0}100%{left:100%}}@-moz-keyframes slide-l1{0%{left:0}100%{left:100%}}@-o-keyframes slide-l1{0%{left:0}100%{left:100%}}@keyframes slide-l1{0%{left:0}100%{left:100%}}@-webkit-keyframes slide-r1{0%{left:-100%}100%{left:0}}@-moz-keyframes slide-r1{0%{left:-100%}100%{left:0}}@-o-keyframes slide-r1{0%{left:-100%}100%{left:0}}@keyframes slide-r1{0%{left:-100%}100%{left:0}}</style>';
            if (!$("#tpl-slide-img").length) {
                $("body").prepend(cssTpl);
            }
            //cssEnd
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
            S.init = function () {
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

            S.prev = function () {
                if (!$scope.nextClick) {
                    $scope.nextClick = true;
                    $timeout(function () {
                        $scope.nextClick = false;
                    }, S.c.time * 1000);
                    if (S.d.slideLeft) {
                        S.d.slideLeft = false;
                        S.slideLeft();
                    } else {
                        S.slideRight();
                    }
                }
            };
            S.next = function () {
                if (!$scope.nextClick) {
                    $scope.nextClick = true;
                    $timeout(function () {
                        $scope.nextClick = false;
                    }, S.c.time * 1000);
                    if (!S.d.slideLeft) {
                        S.d.slideLeft = true;
                        S.slideRight();
                    } else {
                        S.slideLeft();
                    }
                }
            };
            S.slideRight = function () {
                if (S.d.i === 0) {
                    S.d.i = S.d.len - 1;
                    return;
                } else {
                    S.d.i--;
                    return;
                }
            };
            S.slideLeft = function () {
                if (S.d.i === S.d.len - 1) {
                    S.d.i = 0;
                    return;
                } else {
                    S.d.i++;
                    return;
                }
            };
            S.autoPlay = function () {
                S.stop = $interval(function () {
                    S.next();
                }, S.c.stayTime * 1000);
            };
            //获取动画class
            S.getClass = function (argIndex) {
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
            S.play = function (argType) {
                if (!argType) {
                    S.autoPlay();
                } else {
                    $interval.cancel(S.stop);
                }
            };
            S.autoPlay();
        }]
    };
});