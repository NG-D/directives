/**
 * edited by guyl on 2016/2/16.
 */
module.directive('sidebar',function($rootScope){

    return {

        restrict: 'E',
        templateUrl: 'application/directive/space/sidebarPlugin.html',
        replace:"true",
        scope:{
        },
        controller:function($scope,$element,$attrs,$location,$rootScope,$timeout){

            switch ($attrs.sidebarType){

                case "student":
                    $scope.sidebarList = [
                        {"cur":"","icon":"cat-s1","name":"我的课程","href":"#/myCourses"},
                        {"cur":"","icon":"cat-s2","name":"我的题库","href":"#/myQuestionPool"},
                        {"cur":"","icon":"cat-s3","name":"我的圈子", "href": "#/myActivity/dynamic"},
                        {"cur":"","icon":"cat-s4","name":"学习风格", "href": "#/myKnowledge"},
                        {"cur":"","icon":"cat-s5","name":"我的学分", "href": "#/myScore"},
                        {"cur":"","icon":"cat-s6","name":"账号信息", "href": "#/myAccont"},
                        {"cur":"","icon":"cat-s7","name":"教育信息", "href": "#/myEducation"},
                    ];
                    break;
                case "teacher":
                    $scope.sidebarList = [
                        {"cur":"","icon":"cat-t1","name":"课程管理","href": "#/coursesManager"},
                        {"cur":"","icon":"cat-t2","name":"权限管理","href": "#/rightManager"},
                        {"cur":"","icon":"cat-t3","name":"学生管理","href": "#/studentManager"},
                        {"cur":"","icon":"cat-t4","name":"成绩管理","href": "#/scoreManager"},
                        {"cur":"","icon":"cat-t5","name":"试卷批改","href": "#/paperManager"},
                        {"cur":"","icon":"cat-t6","name":"账号信息","href": "#/countInfo"}
                    ];
                    break;

            }

            $scope.SetCur = function(sidebar){

                angular.forEach($scope.sidebarList,function(sidebar){
                    sidebar.cur = "";
                    if(sidebar.icon.indexOf('-down') > 0) {
                        sidebar.icon = sidebar.icon.substr(0, sidebar.icon.length - 5);
                        
                    }
                    console.log(sidebar.icon);
                });

                sidebar.cur = "cur";
                sidebar.icon = sidebar.icon + "-down";
                //判断是否原地刷新
                var hashTmp = window.location.hash;
                $timeout(function(){
                    if(hashTmp == window.location.hash){
                        $scope.$emit('refListSidebar',window.location.hash);
                    }
                })

            };

            /* for 侧栏菜单*/
            function doSidebarMenu() {

                var sLocation = decodeURI(window.location);

                angular.forEach($scope.sidebarList,function(sidebar){
                    var sHref = sidebar.href;
                    if(!sHref){
                        return;
                    }

                    sHref = sHref.substr(2);
                    console.log(sHref,'================================================================',sLocation);
                    var reg = new RegExp('#\/' + sHref, '');
                    if (sLocation.match(reg)) {
                        sidebar.cur="cur";
                        if(sidebar.icon.indexOf('-down') > -1) {
                            return;
                        }
                        sidebar.icon = sidebar.icon + "-down";
                        console.log(sidebar.name);
                    }else{
                        sidebar.cur="";
                    }

                });
                if(sLocation.substr(-2)=="#/"){
                    $scope.sidebarList[0].cur = "cur";
                }
                console.log('停--------------------------------------------------------');

            }

            doSidebarMenu();

            $rootScope.$on('$locationChangeSuccess', function(){
                doSidebarMenu();
            });
        }

    }

});