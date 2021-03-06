var directive = angular.module('demo', []);
directive.controller('demoCtrl', function($scope, $timeout, $http, lazy) {
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
        }, {
            name: 'NULL',
        }, ];
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
            dragClass: 'dialog-head',
            dragAll: true
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
            'http://u.kuxiao.cn/I5I03A==',
            'http://u.kuxiao.cn/diDQd1==',
            'http://u.kuxiao.cn/aGuJtx==',
        ];
        if ($scope.page) {
            $timeout(function() {
                $scope.select($scope.page, '#r');
                $scope.listenerScroll();
            }, 1000);
        } else {
            //滚动监听
            $scope.listenerScroll();
        }
    };
    //切换TAB
    $scope.select = function(argIndex, argTarget) {
        $scope.page = argIndex;
        localStorage.page = argIndex;
        // if (argTarget) {
        //     var temTop = $(argTarget).scrollTop() + $('#sec-' + argIndex).offset().top;
        //     if ($(argTarget)[0].scrollHeight - temTop < $(argTarget).height()) {
        //         var temH = $(argTarget).height() - $(argTarget)[0].scrollHeight + temTop;
        //         $(argTarget).append('<div style="width:100%;height:' + temH + 'px"></div>');
        //     }
        //     if (temTop > 1) {
        //         localStorage.temTop = temTop;
        //         $(argTarget).stop().animate({ scrollTop: temTop }, 'slow');
        //     }
        // }
    };
    //滚动监听
    $scope.listenerScroll = function() {
    };
    init();
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
});
