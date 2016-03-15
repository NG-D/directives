/**
 * Created by bingoo on 2015/03/23.
 */
module.directive("editTextarea",function(){
    return{
        template: '<div class="textarea-w">'+
                        '<div class="stint-chac">还可以输入<b style="font-family:Georgia,Times New Roman,Times, serif;font-size:21px;">{{len}}</b>字</div>'+
                        '<textarea class="textarea" ng-model="model" placeholder="{{myplaceholder}}" ng-style="mystyle" ng-show="!cfg.input"></textarea>'+
                        '<input class="textarea" ng-model="model" placeholder="{{myplaceholder}}" ng-style="mystyle" ng-show="cfg.input" />'+
                    '</div>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            len:"=len",
            model:"=model",
            mystyle:"=mystyle",
            myplaceholder:"=myplaceholder",
            config:"=config"
        },
        controller:function($rootScope,$scope,$element,$attrs,$timeout){
            $scope.cfg = $scope.config || {};
            $scope.initHeight = ($scope.mystyle && 'height' in $scope.mystyle) ? $scope.mystyle.height : '';
            $scope.check = function (o){
                if(!$scope.cfg.input){
                    if(!$scope.mystyle || $scope.mystyle && $scope.mystyle.overflow !== 'auto'){
                        $(o).css('height',$scope.initHeight);
                        if(o.scrollHeight>$(o).outerHeight(true)){
                            $(o).css('height',o.scrollHeight-10);
                        }
                    }
                }
                if($scope.len){
                    var str = $(o).val();
                    var max = parseInt($scope.len)*2;
                    if(str){
                        var len = parseInt(str._getLen());
                        if(len > max){
                            $(o).val( str._limitLen(max,'') );
                        }
                    }
                    $element.find('b').html( str && len>max ? '0' : str ? parseInt((max-len)/2) : parseInt($scope.len) );
                }
            };
            $element.find('.textarea').on({
                keyup : function (){
                    $scope.check(this);
                },
                focus : function (){
                    if($scope.len){
                        $element.find('.stint-chac').show();
                    }
                    $scope.check(this);
                },
                blur : function (){
                    $scope.blurVal = $(this).val();
                    $element.find('.stint-chac').hide();
                    $scope.myWatch();
                }
            });
            $scope.myWatch = function (){
                if($element.find('.textarea').val() !== $scope.blurVal){
                    $scope.check($element.find('.textarea'));
                }else{
                    $timeout($scope.myWatch);
                }
            };
        }
    }
});