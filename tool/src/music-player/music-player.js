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
        controller: function($scope, $element, $attrs,$http) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            if ($scope.c) {
                angular.forEach($scope.c, function(value, key) {
                    $scope[key] = value;
                });
            }
            var init = function() {
                $scope.m = {
                    play: true,
                    voice: 100,
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
                request.onload = function() {
                    var arraybuffer = request.response;
                    console.log(arraybuffer);
                };
                request.send();
            }

            $scope.musicUrl = "/music/纯/莫失莫忘.mp3";
            $scope.info = "Click 'fetch' to fetch an image";
            $scope.play = function() {
                $http.get($scope.musicUrl, { responseType: "arraybuffer" }).
                success(function(data) {
                    console.log("Read '" + $scope.musicUrl + "' with " + data.byteLength + " bytes in a variable of type '" + typeof(data) + "'",data);
                }).
                error(function(data, status) {
                    console.log("Request failed with status: " + status);
                });
            };
            try {
                var audioContext = new window.AudioContext();
                init();
            } catch (e) {
                Console.log('!Your browser does not support AudioContext');
            }
        }
    };
});
