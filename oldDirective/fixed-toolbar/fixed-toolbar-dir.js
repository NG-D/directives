/**
 * Created by FENGSB on 2015/8/24.
 */

module.directive("fixedToolbar",function(){
    return {
        templateUrl: 'application/directive/fixed-toolbar/fixed-toolbar-dir.html',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            data:"=data"
        },
        controller:function($scope,$rootScope,$timeout){
            function handler(){
                var elem = $('.tab-top');
                var top = $(window).scrollTop();
                if(top>300){
                    elem.addClass('visible');
                }else{
                    elem.removeClass('visible');
                }
            }
            handler();
            $(window).bind('scroll',handler);
            $(window).bind('resize',handler);

            $scope.param = {};

            $scope.init = function (type){
                switch(type){
                    case 2:
                        $scope.param.style = 'aikexue-fixed-toolber';
                        break;
                }
            };

            $scope.init(getCourseCat());

            $rootScope.$watch('catDomain',function (value){
                if(value){
                    switch(value){
                        case 'aikexue.com':
                            $scope.init(2);
                            break;
                    }
                }
            });

            $timeout(function (){
                $scope.panelAmit = true;
            },300);
        }
    };
});