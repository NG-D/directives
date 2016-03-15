angular.module('app').directive("ownList", function() {
    return {
        templateUrl: 'directive/own/own.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            list: "=",
            type: "="
        },
        controller: function($scope, $element, $timeout, loading, config) {
            $scope.$on('ownListLoadSuccess', function (ev, rs){
                $scope.picRoot = config.picRoot();
                $timeout(function (){
                    angular.forEach($scope.list, function(item) {
                        item.time = moment(new Date(item.dateline * 1000)).format('YYYY-MM-DD hh:mm');
                    });
                },100);
            });
            $scope.$on('ownListLoadFail', function (ev, err){
                //
            });
        }
    };
});