var directive = angular.module('demo', []);
directive.controller('demoCtrl', function($scope, $timeout) {
    //page
    $scope.page = localStorage.page || 0;
    $scope.select = function(argIndex) {
        $scope.page = argIndex;
        localStorage.page = argIndex;
    };
    $scope.timeoutImg = '我不是图片';
    $timeout(function() {
        $scope.timeoutImg = 'http://u.kuxiao.cn/aGuJtx==';
    }, 10000);
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
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, {
        name: 'slide',
    }, ];
    //slide
    $scope.slideConfig = {
        time: 1.5,
        stayTime: 2,
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
});
