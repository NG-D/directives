var directive = angular.module('demo', []);
directive.controller('demoCtrl', function($scope, $timeout, $http, lazy) {
    $scope.d = {
        //drag弹出框
        dialog: {},
    };
    $scope.f = {
        //切换TAB
        select: function() {},
        //打开dialog
        dialog: function() {},
    };
    var init = function() {
        //page
        $scope.page = +localStorage.page || 0;
        $scope.timeoutImg = '我不是图片';
        $timeout(function() {
            $scope.timeoutImg = 'http://u.kuxiao.cn/aGuJtx==';
        }, 3000);
        //directive list
        $scope.directives = [{
            name: 'placeholder',
        }, {
            name: 'slide',
        }, {
            name: 'drag',
        }, {
            name: 'default img',
        }, {
            name: 'lazyImg',
        }, {
            name: 'ripple',
        }, {
            name: 'repeat',
        }, {
            name: 'musicPlayer',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, {
            name: 'NULL',
        }, ];
        try {
            $.fn.extend({
                animateCss: function(animationName) {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    var a = +new Date();
                    this.addClass('animated ' + animationName).one(animationEnd, function() {
                        var b = +new Date();
                        $(this).removeClass('animated ' + animationName);
                    });
                }
            });
            $('.L').animateCss('zoomIn');
            $('.R').animateCss('zoomIn');
        } catch (e) { console.log(e); }
        //slide
        $scope.slideConfig = {
            time: 1.5,
            stayTime: 3,
            imgStyle: { width: '100%', height: '100%' },
            class: '',
            style: {
                width: '640px',
                height: '360px',
            }
        };
        //drag
        $scope.dragConfig = {
            dragClass: 'd-head',
            dragAll: true,
        };
        $scope.imgs = ['demo/1.png', 'demo/2.png', 'demo/3.png'];
        $scope.imgs1 = ['demo/2.png', 'demo/1.png'];
        //lazeImg
        $scope.lazeImgConfig = {
            id: 'r',
            // url: 'demo/1.png',
            style: { height: '100%', width: '100%' },
        };
        $scope.lazeImg = [
            'https://linjielinlin.github.io/static/img/头像.png',
            'https://linjielinlin.github.io/static/img/微信打赏.png',
            'https://linjielinlin.github.io/static/img/6.jpg',
        ];
        if ($scope.page) {
            $timeout(function() {
                $scope.f.select($scope.page, '#r');
                $scope.listenerScroll();
            }, 1000);
        } else {
            //滚动监听
            $scope.listenerScroll();
        }
    };
    /**
     * [select description]
     * @param  {[type]} argIndex  [index]
     * @param  {[type]} argTarget [id]
     */
    $scope.f.select = function(argIndex, argTarget) {
        $scope.page = argIndex;
        localStorage.page = argIndex;
        if (argTarget) {
            var temTop = $(argTarget).scrollTop() + $('#sec-' + argIndex).offset().top;
            if ($(argTarget)[0].scrollHeight - temTop < $(argTarget).height()) {
                var temH = $(argTarget).height() - $(argTarget)[0].scrollHeight + temTop;
                $(argTarget).append('<div style="width:100%;height:' + temH + 'px"></div>');
            }
            if (temTop > 1) {
                localStorage.temTop = temTop;
                $(argTarget).stop().animate({ scrollTop: temTop }, 'slow');
            }
        }
    };
    /**
     * [dialog description]
     * @param  {[type]} argType [类型]
     * @param  {[type]} argData [true 显示，false隐藏]
     * @return {[type]}         [description]
     */
    $scope.f.dialog = function(argType, argData) {
        $scope.d.dialog[argType] = argData || false;
    };
    //滚动监听
    $scope.listenerScroll = function() {
        if ($scope.directives) {
            angular.forEach($scope.directives, function(v, k) {
                if ($('#sec-' + k).length) {
                    var data = {
                        id: 'r',
                        node: $('#sec-' + k)[0],
                        type: 'normal',
                        callback: function() {
                            $scope.page = k;
                        }
                    };
                    lazy.listener(data);
                }
            });
        }
    };

    //todo
    //todo

    //repeat
    $scope.rData = [];
    $scope.sData = [];
    for (var i = 0; i < 50000; i++) {
        var a = { name: i, time: new Date() };
        $scope.sData.push(a);
    }
    var ii = 0;
    var last = 1;
    var c = 200;
    $scope.testRepeat = function() {
        if (!last) {
            ii = ii + 3 * c;
        }
        for (var i = 0; i < 1 * c; i++) {
            if (ii < $scope.sData.length) {
                $scope.rData.push($scope.sData[ii]);
                ii++;
            }
        }
        if ($scope.rData.length > 3 * c) {
            $scope.rData = $scope.rData.slice(1 * c);
        }
        last = 1;
    };
    $scope.testRepeat1 = function() {
        if (last) {
            ii = ii - 3 * c;
        }
        for (var i = 0; i < 1 * c; i++) {
            if (ii > 0) {
                $scope.rData.unshift($scope.sData[ii]);
                ii--;
            }
        }
        if ($scope.rData.length > 3 * c) {
            $scope.rData = $scope.rData.slice(0, $scope.rData.length - 1 * c);
        }
        last = 0;
    };
    init();
});
