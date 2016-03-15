angular.module('app').directive("tagsPart", function() {
    return {
        templateUrl: 'directive/tags/tags-part.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            list: "=list",
            get: '=get'
        },
        controller: function($scope, $rootScope, $element, connector, loading) {
            function getTags(params) {
                var loadingHide = loading.show({element: $element.find('.tag-list')});
                connector.tags(params).then(function(rs) {
                    var data = rs.Data;
                    $scope.list = data;
                    loadingHide();
                }, function() {
                    alert('获取标签数据失败');
                    loadingHide();
                });
            }

            if($scope.get === 'default'){
                getTags();
            }
        }
    };
});
