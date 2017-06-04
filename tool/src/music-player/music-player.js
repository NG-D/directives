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
 var cssTpl='<style type="text/css" id="tpl-music-player">@charset "UTF-8";.mc-body .fa,.mp-progress{cursor:pointer}.mc-body,.mc-header{float:left;height:100%}.mc-player{height:100px}.mc-player:after{content:"";display:block;clear:both}.mc-header .face-img{width:100px;height:100%;background-image:url(/demo/music-face.jpg);background-repeat:no-repeat;background-size:cover}.mc-body{width:150px;background-color:#9370db;color:#fff}.mc-body .title{padding:8px 0;width:100%;text-align:center}.mc-body .ctrl-a,.mc-body .ctrl-b{width:100%;text-align:center;font-size:18px;line-height:35px}.mc-body .play{width:50%;display:inline-block}.mc-body .close{display:none;position:absolute;top:2px;right:2px}.mc-body:hover .close{display:block;font-size:16px}.mp{width:400px;position:fixed;z-index:1000;left:0;top:50%;background-color:#12232E;height:50px;color:#fff;padding-left:15px;padding-right:30px}.mp .hide{display:none}.mp-body{height:30px;margin-top:10px;margin-bottom:10px;padding-left:40px;padding-right:80px;position:relative}.mp-face{position:absolute;left:0;top:0;z-index:0;width:30px;height:100%}.mp-face>img{width:100%;height:100%}.mp-content{position:relative;height:100%}.mp-title{padding-right:90px;position:relative;font-size:14px}.mp-time{position:absolute;right:0;top:0;z-index:0;font-size:14px;color:#576168}.mp-progress{position:absolute;bottom:0;left:0;z-index:0;border-radius:2px;width:100%;height:4px;background-color:#595959}.mp-progress>div:first-child{position:absolute;left:0;z-index:1;height:100%;width:0;background-color:#00BFB8}.mp-progress>div:first-child:before{position:absolute;right:-5px;top:50%;z-index:1;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);height:10px;width:10px;border-radius:100%;background-color:#00BFB8;content:""}.mp-progress .load{position:absolute;left:0;z-index:0;height:100%;width:0;background-color:#9c9c9c}.mp-close,.mp-volume .volume-progress{position:absolute;cursor:pointer;width:20px;background-color:#03080B}.mp-toolbar{position:absolute;right:0;top:0;z-index:0}.mp-toolbar>div{float:left;line-height:30px}.mp-toolbar i{display:inline-block;min-width:30px}.mp-close{color:#fff;right:0;top:50%;z-index:100;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-ms-transform:translate(0,-50%);-o-transform:translate(0,-50%);transform:translate(0,-50%);font-size:20px;text-align:center;height:100%;line-height:50px}.mp-volume{position:relative}.mp-volume .volume-progress{display:none;bottom:30px;left:0;z-index:0;height:110px}.mp-volume .volume-progress>div,.mp-volume .volume-progress>div:before{position:absolute;left:50%;-webkit-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0);background-color:#00BFB8}.mp-volume .volume-progress>div{bottom:0;z-index:0;height:100px;width:4px;margin:auto}.mp-volume .volume-progress>div:before{top:-5px;z-index:1;height:10px;width:10px;border-radius:100%;content:""}.mp-volume .volume-progress:hover,.mp-volume:hover .volume-progress{display:block}.text-of{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;word-wrap:normal;white-space:nowrap}</style>';
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
            // 是否正在播放
            isPlay: false,
            // 是否可以播放
            canplay: false,
            // 是否静音
            noVolume: false,
            // 音量0—1
            volume: 1,
        };
        //获取播放器实例
        function getPlayer(argId) {
            return $('#' + argId)[0];
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
                console.log('status:', re.obj.readyState);
                if (re.obj.readyState <= 2) {
                    // getPlayer(re.id).load();
                    console.log('暂时播放不了，请等待');
                    if (!re.canplay) {
                        return;
                    }
                }
                re.isPlay = !re.isPlay;
                if (re.isPlay) {
                    getPlayer(re.id).play();
                    return;
                } else {
                    getPlayer(re.id).pause();
                    return;
                }

            },
            /**
             * 设置声音
             */
            setVolume: function() {
                if (re.volume) {
                    getPlayer(re.id).volume = 0;
                } else {
                    getPlayer(re.id).volume = 1;
                }
            },
            /**
             * [设置播放进度]
             * @param  {[type]} e [event]
             * @return {[type]}   [description]
             */
            playProgress: function(e) {
                var temThis = this;

                function drag(e) {
                    if (re.obj.readyState > 2) {
                        var offsetLeft = $(temThis).offset().left,
                            showWidth = e.pageX - offsetLeft,
                            progressWidth = $(temThis).width() - 5;

                        // console.log($(temThis).width(), offsetLeft, showWidth);
                        if (showWidth < 0) {
                            showWidth = 0;
                        }
                        if (showWidth > progressWidth) {
                            showWidth = progressWidth;
                        }
                        re.currentTime = re.duration * (showWidth / progressWidth);
                        //设置播放时间
                        re.obj.currentTime = re.currentTime;
                        $($(temThis).children()[0]).width(showWidth);
                    }
                }
                $(this).off('mousemove', drag).on('mousemove', drag);
                $(document).off('mouseup', function() {
                    $(temThis).off('mousemove', drag);
                }).on('mouseup', function() {
                    $(temThis).off('mousemove', drag);
                });
                drag(e);
            },
            /**
             * [设置音量大小]
             * @param  {[type]} e [event]
             * @return {[type]}   [description]
             */
            volumeProgress: function(e) {
                var temThis = this;

                function drag(e) {
                    var offsetTop = $(temThis).offset().top,
                        progressHeight = $(temThis).height() - 5,
                        showHeight = progressHeight - e.pageY + offsetTop;

                    // console.log(re.progress.height(), e.pageY, offsetTop, showHeight);
                    if (showHeight < 0) {
                        showHeight = 0;
                    }
                    if (showHeight > progressHeight) {
                        showHeight = progressHeight;
                    }
                    re.volume = (showHeight / progressHeight);
                    if (re.volume > 0.9) {
                        re.volume = 1;
                    }
                    //设置音量
                    re.obj.volume = re.volume;
                    if (re.volume === 1) {
                        $($(temThis).children()[0]).height($(temThis).height() - 10);
                    } else {
                        $($(temThis).children()[0]).height(showHeight);
                    }
                }
                $(this).off('mousemove', drag).on('mousemove', drag);
                $(document).off('mouseup', function() {
                    $(temThis).off('mousemove', drag);
                }).on('mouseup', function() {
                    $(temThis).off('mousemove', drag);
                });
                drag(e);
            },
        };
        re.obj = getPlayer(re.id);
        re.progress = $('#linPlayer .mp-progress');
        re.title = $('#linPlayer .mp-title .title');
        re.toolbar = $('#linPlayer .mp-toolbar');
        re.title.html(re.name);
        // 播放控制
        re.toolbar.find('.mp-play').off('click', on.play).on('click', on.play);
        // 播放进度
        re.progress.off('mousedown', on.playProgress).on('mousedown', on.playProgress);
        // 设置静音
        re.toolbar.find('.mp-volume i').off('click', on.setVolume).on('click', on.setVolume);
        // 设置音量
        re.toolbar.find('.mp-volume .volume-progress').off('mousedown', on.volumeProgress).on('mousedown', on.volumeProgress);
        // 播放器监听
        $(re.obj).on({
            // 开始加载音频和视频。 
            'loadstart': function(e) {
                // console.log('开始加载音频和视频。', e);
            },
            // 音频和视频的duration属性（时长）发生变化时触发，即已经知道媒体文件的长度。
            'durationchange': function(e) {
                re.duration = re.obj.duration;
                $('#linPlayer .mp-time .duration').html(countTime(re.duration));
                $(re.toolbar.find('.mp-volume .volume-progress').children()[0]).height(re.toolbar.find('.mp-volume .volume-progress').height() - 10);
                // console.log('获取总时长:秒',re.obj.duration,e);
            },
            // 浏览器正在下载媒体文件，周期性触发。下载信息保存在元素的buffered属性中。  
            'progress': function(e) {
                var count = 0;
                if (re.obj.buffered.length) {
                    for (var i = 0; i < re.obj.buffered.length; i++) {
                        count += re.obj.buffered.end(i) - re.obj.buffered.start(i);
                    }
                    console.log(count);
                    var loadWidth = re.progress.width() * count / re.duration;
                    if (loadWidth < 0) {
                        loadWidth = 0;
                    }
                    $(re.progress.children()[1]).width(loadWidth);
                }
            },
            // 浏览器准备好播放，即使只有几帧，readyState属性变为CAN_PLAY。
            'canplay': function(e) {
                re.canplay = true;
                console.log('canplay');
            },
            // 浏览器认为可以不缓冲（buffering）播放时触发，即当前下载速度保持不低于播放速度，readyState属性变为CAN_PLAY_THROUGH。
            'canplaythrough': function(e) {
                re.canplay = true;
                console.log('canplaythrough');
            },
            // 网页元素的currentTime属性改变时触发。
            'timeupdate': function(e) {
                re.currentTime = getPlayer(re.id).currentTime;
                $('#linPlayer .mp-time .currentTime').html(countTime(re.currentTime));
                var showWidth = Math.round(re.progress.width() * re.currentTime / re.duration);
                if (showWidth < 0) {
                    showWidth = 0;
                }
                $(re.progress.children()[0]).width(showWidth);
            },
            // 播放中断
            'abort': function(e) {
                console.info('播放中断');
            },
            // 开始播放，包括第一次播放、暂停后播放、结束后重新播放。
            'playing': function() {
                $(re.toolbar.find('.mp-play').children().hide()[1]).show();
                console.info('playing');
            },
            // 播放结束
            'ended': function(e) {
                $(re.toolbar.find('.mp-play').children().hide()[0]).show();
                console.log('ended');
            },
            // 加载文件停止，有可能是播放结束，也有可能是其他原因的暂停
            'suspend': function(e) {
                // $(re.toolbar.find('.mp-play').children().hide()[0]).show();
                console.log('suspend');
            },
            // 播放暂停  
            'pause': function(e) {
                $(re.toolbar.find('.mp-play').children().hide()[0]).show();
                console.log('pause');
            },
            // 发生错误。该元素的error属性包含更多信息。
            'error': function(e, error) {
                console.error(e, error);
            },
            // 音量改变时触发（包括静音）。 
            'volumechange': function(e) {
                re.volume = re.obj.volume;
                if (re.volume === 0) {
                    $(re.toolbar.find('.mp-volume .volume-progress').children()[0]).height(0);
                    $(re.toolbar.find('.mp-volume i').hide()[0]).show();
                } else if (re.volume < 1) {
                    $(re.toolbar.find('.mp-volume i').hide()[1]).show();
                } else if (re.volume === 1) {
                    $(re.toolbar.find('.mp-volume .volume-progress').children()[0]).height(re.toolbar.find('.mp-volume .volume-progress').height() - 10);
                    $(re.toolbar.find('.mp-volume i').hide()[2]).show();
                }

            },
            // 播放速率改变 
            'ratechange': function() {
                console.log('ratechange');
            },
            // 由于另一个操作（比如搜索）还没有结束，导致当前操作（比如播放）不得不等待。
            'waiting': function(e) {
                console.info('正在加载中,可显示loading');
            },
            // 媒体文件加载后又被清空，比如加载后又调用load方法重新加载。
            'emptied': function(e) {
                console.log('emptied');
            },
            // play    暂停后重新开始播放  
            // seeked    搜索操作结束  
            // seeking    搜索操作开始  
            // stalled    浏览器开始尝试读取媒体文件，但是没有如预期那样获取数据    
        })
        return re;
    };
})($);
var m = $.linMusic();
