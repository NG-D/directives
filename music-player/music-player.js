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
        template:'<div><audio controls><source src="/music/纯/莫失莫忘.mp3" type="audio/mpeg"><span>你的浏览器不支持</span></audio><div class="mc-player"><div class="mc-header"><div class="face-img"><img ng-src="" alt=""></div></div><div class="mc-body p-r"><div class="title text-of">莫失莫忘</div><div class="ctrl"><div class="ctrl-a"><i class="fa fa-step-backward" aria-hidden="true"></i><div class="play" ng-click="play()"><i class="fa fa-play" aria-hidden="true" ng-hide="m.play"></i> <i class="fa fa-pause" aria-hidden="true" ng-show="m.play"></i></div><i class="fa fa-step-forward" aria-hidden="true"></i></div><div class="ctrl-b"><i class="fa fa-heart-o" aria-hidden="true"></i><div class="play" ng-click="play()"><i class="fa fa-volume-off" aria-hidden="true" ng-show="m.voice===0"></i> <i class="fa fa-volume-up" aria-hidden="true" ng-show="m.voice>0"></i></div><i class="fa fa-list-ul" aria-hidden="true"></i></div></div><div class="close"><i class="fa fa-times" aria-hidden="true"></i></div></div></div></div>',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            c: "="
        },
        controller: ['$scope', '$element', '$attrs', '$http', function ($scope, $element, $attrs, $http) {
            //cssStart
            var cssTpl = '<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mc-body,.mc-header{float:left;height:100%}.mc-player{height:100px}.mc-player:after{content:"";display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:100px;background-color:#9370db;color:#fff}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}</style>';
            if (!$("#tpl-music-player").length) {
                $("body").prepend(cssTpl);
            }
            //cssEnd
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            if ($scope.c) {
                angular.forEach($scope.c, function (value, key) {
                    $scope[key] = value;
                });
            }
            var init = function init() {
                $scope.m = {
                    play: true,
                    voice: 100
                };
            };
            // $scope.play = function() {
            //     $scope.m.play = !$scope.m.play;
            // };
            // loadSound("/music/纯/莫失莫忘.mp3"); //调用
            // 定义加载音频文件的函数
            function loadSound(url) {
                var request = new XMLHttpRequest(); //建立一个请求
                request.open('GET', url, true); //配置好请求类型，文件路径等
                request.responseType = 'arraybuffer'; //配置数据返回类型
                // 一旦获取完成，对音频进行进一步操作，比如解码
                request.onload = function () {
                    var arraybuffer = request.response;
                    console.log(arraybuffer);
                };
                request.send();
            }

            $scope.musicUrl = "/music/纯/莫失莫忘.mp3";
            $scope.info = "Click 'fetch' to fetch an image";
            $scope.play = function () {
                $http.get($scope.musicUrl, { responseType: "arraybuffer" }).success(function (data) {
                    console.log("Read '" + $scope.musicUrl + "' with " + data.byteLength + " bytes in a variable of type '" + (typeof data === 'undefined' ? 'undefined' : _typeof(data)) + "'", data);
                }).error(function (data, status) {
                    console.log("Request failed with status: " + status);
                });
            };
            try {
                var audioContext = new window.AudioContext();
                init();
            } catch (e) {
                Console.log('!Your browser does not support AudioContext');
            }
        }]
    };
});