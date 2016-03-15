angular.module('app').directive("rList", function() {
    return {
        templateUrl: 'directive/list/list.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            list: "=",
            type: "="
        },
        controller: function($scope, $element, $timeout, loading, config) {
            $scope.$on('listLoadSuccess', function (ev, rs){
                $scope.picRoot = config.picRoot();
                $timeout(function (){
                    switch($scope.type){
                        case 'dk':
                            $scope.directlyList = $scope.list.splice(0,1);
                            break;
                    }
                }, 100);
            });
            $scope.$on('listLoadFail', function (ev, err){
                //
            });
        }
    };
});