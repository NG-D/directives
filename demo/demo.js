var directive = angular.module('demo', ['tmpl']);
directive.controller('demoCtrl', ['$scope', function($scope) {
    $scope.page = localStorage.page || 0;
    $scope.lazeImg = [
        'http://u.kuxiao.cn/I5I03A==',
        'http://u.kuxiao.cn/diDQd1==',
        'http://u.kuxiao.cn/aGuJtx==',
    ];
    $scope.directives = [{
        name: 'placeholder',
    }, {
        name: 'slide',
    }, {
        name: 'drag',
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
    }, {
        name: 'slide',
    }, ];
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
    $scope.select = function(argIndex) {
        $scope.page = argIndex;
        localStorage.page = argIndex;
    };
    $scope.imgs = ['demo/1.png', 'demo/2.png', 'demo/3.png'];
    $scope.imgs1 = ['demo/2.png', 'demo/1.png'];
}]);
