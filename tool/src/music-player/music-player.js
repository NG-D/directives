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
 var cssTpl='<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mc-body .fa,.mp-progress{cursor:pointer}.mc-body,.mc-header{float:left;height:100%}.mc-player{height:100px}.mc-player:after{content:"";display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:150px;background-color:#9370db;color:#fff}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}.mp{width:400px;position:fixed;z-index:1000;left:0;top:50%;background-color:#12232E;height:50px;color:#fff;padding-left:15px;padding-right:30px}.mp .hide{display:none}.mp-body{height:30px;margin-top:10px;margin-bottom:10px;padding-left:40px;padding-right:80px;position:relative}.mp-face{position:absolute;left:0;top:0;z-index:0;width:30px;height:100%}.mp-face>img{width:100%;height:100%}.mp-content{position:relative;height:100%}.mp-title{padding-right:90px;position:relative;font-size:14px}.mp-time{position:absolute;right:0;top:0;z-index:0;font-size:14px;color:#576168}.mp-progress{position:absolute;bottom:0;left:0;z-index:0;border-radius:2px;width:100%;height:4px;background-color:#595959}.mp-progress>div:first-child{position:absolute;left:0;z-index:1;height:100%;width:0;background-color:#00BFB8}.mp-progress>div:first-child:before{position:absolute;right:-5px;top:50%;z-index:1;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);height:10px;width:10px;border-radius:100%;background-color:#00BFB8;content:""}.mp-close,.mp-progress .load{position:absolute;height:100%}.mp-progress .load{left:0;z-index:0;width:0;background-color:#9c9c9c}.mp-close,.mp-volume .volume{cursor:pointer;width:20px;background-color:#03080B}.mp-toolbar{position:absolute;right:0;top:0;z-index:0}.mp-toolbar>div{float:left;line-height:30px}.mp-toolbar i{cursor:pointer;display:inline-block;min-width:30px}.mp-close{color:#fff;right:0;top:50%;z-index:100;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);font-size:20px;text-align:center;line-height:50px}.mp-volume{position:relative}.mp-volume .volume{display:none;position:absolute;bottom:30px;left:0;z-index:0;height:110px;padding-top:10px;padding-bottom:10px}.mp-volume .volume:hover,.mp-volume:hover .volume{display:block}.mp-volume .volume-progress{position:absolute;top:50%;left:0;z-index:0;width:100%;height:100px;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%)}.mp-volume .volume-progress>div,.mp-volume .volume-progress>div:before{position:absolute;left:50%;-webkit-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0);background-color:#00BFB8}.mp-volume .volume-progress>div{bottom:0;z-index:0;height:100%;width:4px;margin:auto}.mp-volume .volume-progress>div:before{top:-5px;z-index:1;height:10px;width:10px;border-radius:100%;content:""}.text-of{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}</style>';
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
