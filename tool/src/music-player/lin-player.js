/**
 * 使用方法
 * var player=$().linMusic(option);
 * @type {[type]}
 */
(function($) {
    $.fn.extend({
        /**
         * music player
         * @param  {[type]} argOption [参数]
         * argOption={
         *     url:'音乐连接',
         *     name: '名称',
         *     voice: '音量',
         * }
         * @return {[type]}           [player信息]
         */
        linMusic: function(argOption) {
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
                // 音量0—1
                volume: 1,
                // 是否自动播放
                autoPlay: false,
                // 初始化
                init: function() {
                    $.extend(re, argOption);
                    $('#' + re.id).attr('src', re.src);
                    re.obj = getPlayer(re.id);
                    re.progress = $('#linPlayer .mp-progress');
                    re.title = $('#linPlayer .mp-title .title');
                    re.toolbar = $('#linPlayer .mp-toolbar');
                    re.title.html(re.name);
                },
            };
            /**
             * 获取播放器实例
             * @param  {[type]} argId [id]
             * @return {[type]}       [description]
             */
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
                            progressHeight = $(temThis).height(),
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
                            $($(temThis).children()[0]).height('100%');
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
            re.init();
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
                    $(re.toolbar.find('.mp-volume .volume-progress').children()[0]).height('100%');
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
                    if (re.autoPlay) {
                        re.obj.play();
                    }
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
                    re.isPlay = true;
                    $(re.toolbar.find('.mp-play').children().hide()[1]).show();
                    console.info('playing');
                },
                // 播放结束
                'ended': function(e) {
                    re.isPlay = false;
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
                    re.isPlay = false;
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
                        $(re.toolbar.find('.mp-volume .volume-progress').children()[0]).height('100%');
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
                    re.isPlay = false;
                    $(re.toolbar.find('.mp-play').children().hide()[0]).show();
                    console.log('emptied');
                },
                // play    暂停后重新开始播放  
                // seeked    搜索操作结束  
                // seeking    搜索操作开始  
                // stalled    浏览器开始尝试读取媒体文件，但是没有如预期那样获取数据    
            });
            return re;
        }
    });
})($);
