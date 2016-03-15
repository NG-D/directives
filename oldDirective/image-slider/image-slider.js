angular.module('RCP').directive('imageSlider', function () {
    return {
        templateUrl: 'application/directive/image-slider/image-slider.html',
        restrict: 'E',
        scope: {
            images: '=',
            loop: '='
        },
        replace: true,
        controller: function ($scope, $element, $timeout) {
            $scope.turnLeftCount = $scope.turnRightCount = 0;

            $scope.imageListWidth = 0;
            $scope.bigImgWidth = 0;
            $scope.bigImgOffset = {top: 0, left: 0};

            $scope.$watch('show', function (value) {
                if (value) {
                    $scope.wrapperWidth = $element.find('.image-slider').width();
                    $scope.bigImgWidth = $scope.wrapperWidth - 20;
                    $scope.imageListWidth = $scope.wrapperWidth - 76;
                    $timeout(function () {
                        $scope.bigImgOffset = $element.find('.slider-main').offset();
                    }, 100);
                }
            });

            $scope.showBigPic = function (index) {
                $scope.show = true;
                $scope.switchImg(index);
            };

            $scope.switchImg = function (index) {
                $scope.currentImage = index;
                $scope.turnLeftCount = $scope.turnRightCount = 0;
            };

            $scope.showCursor = function (event) {
                if (!$scope.images) {
                    return;
                }
                if ($scope.images.length < 2) {
                    $scope.cursor = '';
                    return;
                }
                var x = event.pageX - $scope.bigImgOffset.left;
                if (x > $scope.bigImgWidth/2) {
                    if ($scope.loop || $scope.currentImage < $scope.images.length - 1) {
                        $scope.cursor = 'right';
                    } else {
                        $scope.cursor = '';
                    }
                } else {
                    if ($scope.loop || $scope.currentImage > 0) {
                        $scope.cursor = 'left';
                    } else {
                        $scope.cursor = '';
                    }
                }
            };

            $scope.nextOrPrev = function () {
                if (!$scope.images) {
                    return;
                }
                if ($scope.cursor === 'left') {
                    if ($scope.loop && $scope.currentImage === 0) {
                        $scope.switchImg($scope.images.length - 1);
                    } else {
                        $scope.switchImg($scope.currentImage - 1);
                    }
                } else if ($scope.cursor === 'right') {
                    if ($scope.loop && $scope.currentImage === $scope.images.length - 1) {
                        $scope.switchImg(0);
                    } else {
                        $scope.switchImg($scope.currentImage + 1);
                    }
                }
            };

            $scope.turnLeft = function () {
                $scope.turnLeftCount = $scope.turnLeftCount + 1;
            };

            $scope.turnRight = function () {
                $scope.turnRightCount = $scope.turnRightCount + 1;
            };

            $scope.rotateDeg = function () {
                return 90*($scope.turnRightCount - $scope.turnLeftCount);
            };
            $scope.left = 0;

            $scope.showToggle = function (target) {
                if (!$scope.images) {
                    return;
                }
                var perImgWidth = 58;
                if (target === 'right') {
                    return (perImgWidth * $scope.images.length) + $scope.left > $scope.imageListWidth;
                } else if (target === 'left') {
                    return $scope.left < 0;
                }
            };

            $scope.toggleSlide = function (target) {
                if (target === 'right' && $scope.showToggle(target)) {
                    $scope.left = $scope.left - $scope.imageListWidth;
                } else if (target === 'left' && $scope.showToggle(target)) {
                    $scope.left = $scope.left + $scope.imageListWidth;
                }
            };
        }
    };
});