'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

try {
    if ((typeof directive === 'undefined' ? 'undefined' : _typeof(directive)) !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lMusic', function () {
    return {
        template:'<div><audio id="{{id}}"><source src="https://linjielinlin.github.io/static/music/%E7%BA%AF/%E8%8E%AB%E5%A4%B1%E8%8E%AB%E5%BF%98.mp3" type="audio/mpeg"><span>你的浏览器不支持</span></audio><div class="mc-player"><div class="mc-header"><div class="face-img"><img ng-src="" alt=""></div></div><div class="mc-body p-r"><div class="title text-of"><span ng-bind="m.name"></span><span ng-bind="m.currentTime|date:\'mm:ss\'"></span><span ng-bind="m.duration|date:\'mm:ss\'"></span></div><div class="ctrl"><div class="ctrl-a"><i class="fa fa-step-backward" aria-hidden="true"></i><div class="play" ng-click="f.play()"><i class="fa fa-play" aria-hidden="true" ng-hide="m.play"></i> <i class="fa fa-pause" aria-hidden="true" ng-show="m.play"></i></div><i class="fa fa-step-forward" aria-hidden="true"></i></div><div class="ctrl-b"><i class="fa fa-heart-o" aria-hidden="true"></i><div class="play" ng-click="play()"><i class="fa fa-volume-off" aria-hidden="true" ng-show="m.voice===0"></i> <i class="fa fa-volume-up" aria-hidden="true" ng-show="m.voice>0"></i></div><i class="fa fa-list-ul" aria-hidden="true"></i></div></div><div class="close"><i class="fa fa-times" aria-hidden="true"></i></div></div></div></div>',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            c: "="
        },
        controller: ['$scope', '$element', '$attrs', '$http', '$timeout', '$interval', function ($scope, $element, $attrs, $http, $timeout, $interval) {
            //cssStart
            var cssTpl = '<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mc-body,.mc-header{float:left;height:100%}.mc-player{height:100px}.mc-player:after{content:"";display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:150px;background-color:#9370db;color:#fff}.mc-body .fa{cursor:pointer}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}</style>';
            if (!$("#tpl-music-player").length) {
                $("head").prepend(cssTpl);
            }
            //cssEnd
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            if ($scope.c) {
                angular.forEach($scope.c, function (value, key) {
                    $scope[key] = value;
                });
            }
            $scope.f = {
                play: '播放暂停'
            };
            $scope.init = function () {
                //播放器ID 
                $scope.id = 'm-' + +new Date();
                //播放对象
                $timeout(function () {
                    console.log($scope.id);
                    $scope.player = $('#' + $scope.id)[0];
                    $scope.m = {
                        name: '莫失莫忘',
                        play: $scope.player.play,
                        voice: 100,
                        duration: $scope.player.duration || 0,
                        currentTime: 0
                    };

                    function updateTime() {
                        $scope.m.currentTime = $('#' + $scope.id)[0].currentTime * 1000;
                        $scope.m.duration = ($('#' + $scope.id)[0].duration || 0) * 1000;
                    }
                    $scope.interval = $interval(updateTime, 1000);
                }, 10);
            };

            $scope.f.play = function () {
                $scope.m.play = !$scope.m.play;
                if ($scope.m.play) {
                    $scope.player.play();
                } else {
                    $scope.player.pause();
                }
            };
            $scope.init();
        }]
    };
});