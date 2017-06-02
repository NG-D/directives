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
 var cssTpl='<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mp,.mp-face{z-index:0;left:0}.mc-player:after,.mp-progress>div:before{content:""}.mc-body,.mc-header{float:left;height:100%}.mc-body .fa,.mp-close,.mp-progress{cursor:pointer}.mc-player{height:100px}.mc-player:after{display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:150px;background-color:#9370db;color:#fff}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}.mp{width:400px;position:fixed;top:0;background-color:#12232E;height:50px;color:#fff;padding-left:15px;padding-right:30px}.mp .hide{display:none}.mp-body{height:30px;margin-top:10px;margin-bottom:10px;padding-left:35px;padding-right:80px;position:relative}.mp-face{position:absolute;top:0;width:30px;height:100%}.mp-face>img{width:100%;height:100%}.mp-content{position:relative;height:100%}.mp-title{padding-right:90px;position:relative;font-size:14px}.mp-progress,.mp-time{position:absolute;z-index:0}.mp-time{right:0;top:0;font-size:14px;color:#576168}.mp-progress{bottom:0;left:0;border-radius:2px;width:100%;height:4px;background-color:#595959}.mp-progress>div,.mp-progress>div:before{width:10px;background-color:#00BFB8;position:absolute}.mp-progress>div{left:0;z-index:0;height:100%}.mp-progress>div:before{right:0;top:50%;z-index:1;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);height:10px;border-radius:100%}.mp-toolbar{position:absolute;right:0;top:0;z-index:0}.mp-toolbar>div{float:left;line-height:30px}.mp-toolbar i{padding:0 5px}.mp-close{color:#fff;position:absolute;right:0;top:50%;z-index:100;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);font-size:20px;width:20px;text-align:center;background-color:#03080B;height:100%;line-height:50px}.text-of{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}</style>';
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
(function(arg$) {
    arg$.linMusic = function() {
        var re = {
            //id
            id: 'mpMusicPlayer',
            // player obj
            obj: null,
            // 标题
            name: '莫失莫忘',
            // 声音
            voice: 100,
            // 总时长
            duration: 0,
            // 播放进度
            currentTime: 0,
            // 计算进度定时器
            countTime: 0,
            // 是否正在播放
            isPaly: false,
        };
        //获取播放器实例
        function getPlayer(argId) {
            return $('#' + argId)[0];
        }
        /**
         * 更新播放时间
         * @return {[type]} [description]
         */
        function updateTime() {
            re.currentTime = getPlayer(re.id).currentTime;
            console.log(re.currentTime);
            $('#linPlayer .mp-time .currentTime').html(countTime(re.currentTime));
            if (re.duration === 0) {
                re.duration = getPlayer(re.id).duration || 0;
                $('#linPlayer .mp-time .duration').html(countTime(re.duration));
            } else {
                var showWidth = Math.round(re.progress.width() * re.currentTime / re.duration);
                if (showWidth < 10) {
                    showWidth = 10;
                }
                $(re.progress.children()[0]).width(showWidth);
            }
        }
        /**
         * 计算音乐时长
         * @param  {[type]} argTime [description]
         * @return {[type]}         [description]
         */
        function countTime(argTime) {
            var time = '',
                m = Math.floor(argTime / 60),
                s = Math.round(argTime - m * 60);
            if (m < 10) {
                time = '0';
            }
            time += m + ':';
            if (s < 10) {
                time += '0';
            }
            time += s;
            return time;
        }
        //监听事件
        var on = {
            /**
             * 播放/暂停事件
             * @return {[type]} [description]
             */
            play: function() {
                re.isPlay = !re.isPlay;
                if (!re.duration) {
                    return;
                }
                console.log(re.obj.readyState);
                if (re.obj.readyState <= 2) {
                    getPlayer(re.id).load();
                    console.log('reload');
                }
                if (re.isPlay) {
                    getPlayer(re.id).play();
                    $(re.toolbar.find('.mp-play').children().hide()[0]).show();
                    console.log('play');
                } else {
                    getPlayer(re.id).pause();
                    $(re.toolbar.find('.mp-play').children().hide()[1]).show();
                    console.log('pause');
                }
            },
            dragClick: function(e) {
                if (!0) {
                    var offsetLeft = re.progress.offset().left,
                        showWidth = e.pageX - offsetLeft,
                        progressWidth = re.progress.width();

                    console.log(re.progress.width(), offsetLeft, showWidth);
                    if (showWidth < 0) {
                        showWidth = 0;
                    }
                    if (showWidth > progressWidth) {
                        showWidth = progressWidth;
                    }
                    re.currentTime = re.duration * (showWidth / progressWidth);
                    //设置播放时间
                    re.obj.currentTime = re.currentTime;
                    //设置进度条
                    if (showWidth < 10) {
                        showWidth = 10;
                    }
                    $(re.progress.children()[0]).width(showWidth);
                }
            },
        };
        re.obj = getPlayer(re.id);
        re.duration = re.obj.duration || 0;
        re.countTime = setInterval(updateTime, 1000);
        re.progress = $('#linPlayer .mp-progress');
        re.title = $('#linPlayer .mp-title .title');
        re.toolbar = $('#linPlayer .mp-toolbar');
        re.title.html(re.name);
        $('#linPlayer .mp-toolbar .mp-play').off('click', on.play).on('click', on.play);
        re.progress.off('click', on.dragClick).on('click', on.dragClick);
        return re;
    };
})($);
var m = $.linMusic();
