angular.module('RCP').directive('rate', function () {
    return {
        template: '<style>.rate {cursor: pointer;}.rate.big img{margin-right: 6px;}</style><span class="rate {{style}}"  ng-click="setValue($event)" ng-mousemove="hover($event)" ng-mouseleave="leave()" ng-mouseenter="enter()"><img ng-src="{{star}}" alt="" ng-repeat="star in starList track by $index"></span>',
        restrict: 'E',
        scope: {
            value: '=',
            disabled: '=',
            style: '='
        },
        controller: ['$scope', '$attrs', '$element', function ($scope, $attrs, $element) {
            var star;
            if ($scope.style === 'big') {
                star = {
                    full: 'img/star_big.png',
                    none: 'img/star_big_gray.png'
                };
            } else {
                star = {
                    full: 'img/star_17.png',
                    half: 'img/star_23.png',
                    none: 'img/star_19.png'
                };
            }
            $scope.starList = [];

            for (var i = 0; i < 5; i++) {
                $scope.starList.push(star.none);
            }


            $scope.$watch('value', function (value) {
                if (value !== undefined) {
                    value = +value;
                    if (value.toString() == 'NaN') {
                        return false;
                    }
                    if (value > 5 || value < 0) {
                        return false;
                    }

                    var intStar = value;

                    for (i = 0; i < 5; i++) {
                        if (i < intStar) {
                            $scope.starList[i] = star.full;
                        } else {
                            $scope.starList[i] = star.none;
                        }
                    }
                }
            });

            $scope.setValue = function (event) {
                $scope.previousValue = $scope.value;
            };

            $scope.hover = function (event) {
                if ($scope.disabled) {
                    return ;
                }
                var positionLeft = $element.offset().left,
                    currentLeft = event.pageX,
                    starWidth = 17,
                    moveLength = Math.round(currentLeft - positionLeft),
                    starRatio = moveLength/starWidth;
                $scope.value = Math.ceil(starRatio);
            };

            $scope.leave = function () {
                $scope.value = $scope.previousValue;
            };

            $scope.enter = function () {
                $scope.previousValue = $scope.value;
            };
        }]
    };
});