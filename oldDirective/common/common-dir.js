/**
 * Created by FENGSB on 2015/8/24.
 */



module.directive("noData",function(){
    return {
        template: '<div ng-show="show && !list.length">'+
                     '<img src="/images/other/no-data.png" width="100%" />'+
                  '</div>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            show:"=show",
            list:"=list"
        },
        controller:function(){
            //
        }
    };
});

module.directive("loaderUi",function(){
    return {
        template: '<div class="loader" ng-hide="show">'+
                        '<div class="loader-inner line-scale">'+
                            '<div></div>'+
                            '<div></div>'+
                            '<div></div>'+
                            '<div></div>'+
                            '<div></div>'+
                        '</div>'+
                    '</div>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            show:"=show"
        },
        controller:function(){
            //
        }
    };
});

module.directive("selectUi",function(){
    return{
        template: '<div ng-click="toggle()" ng-blur="hide()" tabindex="-1">'+
                        '<div class="val text-of">'+
                            '<span class="f">{{value.name}}</span>'+
                            '<i class="x-arrow-dowm">&gt;</i>'+
                        '</div>'+
                        '<div class="option" ng-show="showLock">'+
                            '<ul>'+
                                '<li '+
                                    'ng-repeat="item in option" '+
                                    'ng-class="item.activeLock ? \'li text-of active\' : \'li text-of\'"'+
                                    'ng-click="setValue(item)" '+
                                    'ng-mouseenter="setValue(item,\'mouseenter\')"'+
                                    '>{{item.name}}</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            option:"=option",
            value:"=value"
        },
        controller:function($scope){

            $scope.setValue = function (item,mouseenter){
                angular.forEach($scope.option, function(value) {
                    value.activeLock = value.name === item.name;
                    if(!mouseenter){
                        value.fixLock = value.activeLock;
                        $scope.value = item;
                    }
                });
            };

            $scope.toggle = function (){
                $scope.showLock = !$scope.showLock;

                if($scope.showLock){
                    angular.forEach($scope.option, function(value) {
                        value.activeLock = value.fixLock;
                    });
                }
            };

            $scope.hide = function (){
                $scope.showLock = false;
            };
        }
    };
});