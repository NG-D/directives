try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lMusic', function() {
    return {
        templateUrl: '../../src/music-player/music-player.html',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            c: "=",
        },
        controller: function($scope, $element, $attrs, $http, $timeout, $interval) {
            //cssStart
 var cssTpl='<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mc-body,.mc-header{float:left;height:100%}.mc-player{height:100px}.mc-player:after{content:"";display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:150px;background-color:#9370db;color:#fff}.mc-body .fa{cursor:pointer}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}</style>';
if (!$("#tpl-music-player").length) {$("head").prepend(cssTpl);}
//cssEnd
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            if ($scope.c) {
                angular.forEach($scope.c, function(value, key) {
                    $scope[key] = value;
                });
            }
            $scope.f = {
                play: '播放暂停',
            };
            $scope.init = function() {
                //播放器ID 
                $scope.id = 'm-' + (+new Date);
                //播放对象
                $timeout(function() {
                    console.log($scope.id);
                    $scope.player = $('#' + $scope.id)[0];
                    $scope.m = {
                        name: '莫失莫忘',
                        play: $scope.player.play,
                        voice: 100,
                        duration: $scope.player.duration || 0,
                        currentTime: 0,
                    };

                    function updateTime() {
                        $scope.m.currentTime = $('#' + $scope.id)[0].currentTime * 1000;
                        $scope.m.duration = ($('#' + $scope.id)[0].duration || 0) * 1000;
                    }
                    $scope.interval = $interval(updateTime, 1000);
                }, 10);

            };

            $scope.f.play = function() {
                $scope.m.play = !$scope.m.play;
                if ($scope.m.play) {
                    $scope.player.play();
                } else {
                    $scope.player.pause();
                }
            };
            $scope.init();
        }
    };
});
