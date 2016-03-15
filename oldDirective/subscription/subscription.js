angular.module('app').directive("subscriptionList", function() {
    return {
        templateUrl: 'directive/subscription/subscription.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            list: "=",
            type: "="
        },
        controller: function($scope, $rootScope, $element, $timeout, loading, config, connector) {
            $scope.icon = $rootScope.icon;

            $scope.follows = function(item){
                var f = 1;
                var a = ['follows','cancelfollows'];
                var t = a[f];
                connector[t]({
                    sid: item.sid,
                    uid: config.uid(),
                    v: config.version()
                }).then(function (rs){
                    item.cancelfollowsFlag = true;
                }, function (err){
                    console.error(err);
                    alert(err.data.data.errMsg);
                });
            };

            $scope.$on('listLoadSuccess', function(ev, rs) {
                $scope.picRoot = config.picRoot();
                $timeout(function() {
                    switch ($scope.type) {
                        case 'own':
                            if ($scope.list.recommend && $scope.list.list) {
                                $scope.list.recommend.list = angular.copy($scope.list.list);
                                delete $scope.list.list;
                            }else{
                                $scope.noContent = true;
                            }
                            $scope.data = $scope.list;
                            break;
                        default:
                            $scope.data = $scope.list;
                            $scope.noContent = !$scope.data.length;
                    }
                    angular.forEach($scope.data, function(item) {
                        angular.forEach(item.list, function(list) {
                            list.time = moment(new Date(list.dateline * 1000)).format('YYYY-MM-DD');
                        });
                    });
                }, 100);
            });
            $scope.$on('listLoadFail', function(ev, err) {
                //
            });
        }
    };
});
