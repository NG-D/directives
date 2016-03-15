/**
 * Created by FENGSB on 2015/8/12.
 */

//@ 头部
module.directive("headnav", function() {
    return {
        templateUrl: 'application/directive/head-tail/header-dir.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            itemList: "=itemList",
            user: "=user",
            nav: "="
        },
        controller: function($rootScope, $scope, $element, $attrs, service) {

            $scope.service = service;

            $scope.catType = parseInt(getCourseCat());

            $scope.init = function(type) {
                if ($scope.nav === "order") {
                    $scope.navList = [{
                            name: '首页',
                            href: '/',
                            class: 'key'
                        }, {
                            name: '个人空间',
                            href: rcpAid.getUrl('学习中心'),
                            class: 'key',
                            target: '_blank'
                        }
                        // ,{
                        //     name: '消息',
                        //     href: rcpAid.getUrl('分类', {
                        //         category: '高等教育'
                        //     }),
                        //     class: 'key',
                        //     target: '_blank'
                        // }
                    ];
                    $scope.param = {
                        logo: {
                            small: '/images/order/head-icon.png',
                            large: '/images/icon/head-icon.png',
                            href: '/my-order.html',
                            msg: '我的酷校'
                        },
                        style: ''
                    };
                    return;
                }
                switch (type) {
                    case 3:
                        if ($scope.loginReady && $scope.loginReady.flag) {
                            $scope.navList = [{
                                name: '学习中心',
                                href: rcpAid.getUrl('学习中心'),
                                class: 'key',
                                target: '_blank'
                            }, {
                                name: '教学中心',
                                href: rcpAid.getUrl('教学中心', {
                                    uid: $scope.user.tid
                                }),
                                class: 'key',
                                target: '_blank'
                            }, {
                                name: '高等教育',
                                href: rcpAid.getUrl('分类', {
                                    category: '高等教育'
                                }),
                                class: 'key',
                                target: '_blank'
                            }];
                        } else {
                            $scope.navList = [{
                                name: '高等教育',
                                href: rcpAid.getUrl('分类', {
                                    category: '高等教育'
                                }),
                                class: 'key',
                                target: '_blank'
                            }];
                        }
                        $scope.param = {
                            logo: {
                                small: '/images/icon/gzmooc-logo.png',
                                large: '/images/icon/gzmooc-logo.png',
                                msg: '酷校 - 首页'
                            },
                            style: ''
                        };
                        break;
                    case 2:
                        $scope.navList = [{
                                name: '首页',
                                href: '/',
                                class: 'key'
                            }, {
                                name: '全部课程',
                                href: rcpAid.getUrl('分类'),
                                class: 'key',
                                target: '_blank'
                            }, {
                                name: '学习中心',
                                href: rcpAid.getUrl('学习中心'),
                                class: 'key',
                                target: '_blank'
                            }
                            // , {
                            //     name: '养蚕课程',
                            //     href: rcpAid.getUrl('课程详情', {
                            //         id: 1357
                            //     }),
                            //     class: 'key',
                            //     target: '_blank'
                            // }
                        ];
                        $scope.param = {
                            logo: {
                                small: '/images/icon/aikexue-logo-2.png',
                                large: '/images/icon/aikexue-logo.png',
                                msg: '爱科学'
                            },
                            style: 'aikexue-head'
                        };
                        break;
                        
                    case 4: 
                        $scope.navList = [{
                            name: '首页',
                            href: '/',
                            class: 'key'
                        }, {
                            name: '教学中心',
                            href: rcpAid.getUrl('教学中心', {uid: $scope.user.tid}),
                            class: 'key',
                            target: '_blank'
                        }, {
                            name: '爱科学社区',
                            href: 'http://aikexue.com/',
                            class: 'key'
                        }];
                        break;


                    default:
                        $scope.navList = [{
                                name: '首页',
                                href: '/',
                                class: 'key'
                            },
                            {
                                name: '跨境电商',
                                href: '',
                                class: 'key nav-side',
                                child: [
                                    {
                                        name: '考证',
                                        href: 'http://ds.kuxiao.cn/',
                                        class: 'key',
                                        target: '_blank'
                                    }, {
                                        name: '实训商城',
                                        href: 'http://dssx.kuxiao.cn',
                                        class: 'key',
                                        target: '_blank'
                                    }, {
                                        name: '知识体系',
                                        href: '/courseSystem.html',
                                        class: 'key',
                                        target: '_blank'
                                    }
                                ]
                            }
                            , {
                                name: '学习中心',
                                href: rcpAid.getUrl('学习中心'),
                                class: 'key',
                                target: '_blank'
                            }
                            , {
                                name: '就业直通',
                                href: '/recruit.html',
                                class: 'key',
                                target: '_blank'
                            }
                        ];
                        $scope.param = {
                            logo: {
                                small: '/images/icon/book-logo-2.png',
                                large: '/images/icon/book-logo.png',
                                msg: '酷校LOGO·让学习更Cool'
                            },
                            style: ''
                        };
                }
            };

            $rootScope.$watch('headMaximizeLock', function(value) {
                if (value) {
                    $scope.headMaximizeLock = value;
                }
            });

            $rootScope.$watch('categoriesUnfoldLock', function(value) {
                if (value) {
                    $scope.categoriesUnfoldLock = value;
                }
            });

            $rootScope.$watch('catDomain', function(value) {
                if (value) {
                    switch (value) {
                        case 'aikexue.com':
                            $scope.init(2);
                            break;
                    }
                }
            });

            function checkLoginReady() {
                var loginReadyInitFlag;
                $rootScope.$watch('loginStatusInit', function(value) {
                    if (value) {
                        $scope.loginReady = value;
                        if (!loginReadyInitFlag) {
                            loginReadyInitFlag = !loginReadyInitFlag;
                            $scope.init($scope.catType);
                        }
                    }
                });
            }
            var url = window.location.href;
            console.log(url);
            console.log(url.indexOf('http://hd'));
            console.log(url.indexOf('huadu'));
            if((url.indexOf('http://hd') >= 0) || (url.indexOf('huadu') >= 0)) {
                $scope.init(4);
            } else {
                $scope.init($scope.catType);
            }
            if ($scope.catType === 3) {
                checkLoginReady();
            }
        }
    };
});

//@ 用户菜单
module.directive('topUserMenu', function() {
    return {
        templateUrl: 'application/directive/head-tail/top-user-menu.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            itemList: "=itemList",
            user: "=user"
        },
        controller: function($rootScope, $scope, $cookies, $timeout, $location, localStorageService, service) {
            $scope.attestation = '未认证';
            //设置认证管理地址
            $scope.applySpaceUrl = rcpAid.getUrl('实名认证');
            $rootScope.$watch('loginStatusInit', function(value) {
                if (value) {
                    $scope.loginReady = value;
                    if ($scope.user && $scope.user.auth === 1) {
                        $scope.attestation = '已认证';
                    } else if ($scope.user && $scope.user.auth < 0) {
                        $scope.applySpaceUrl = rcpAid.getUrl('实名认证', {
                            p: -1 * $scope.user.auth
                        });
                    }
                }
            });

            //设置个人资料地址
            $scope.personalData = rcpAid.getUrl('个人设置', {
                url: window.location.href
            });

            //默认load毫秒
            var loadTiem = 150;

            //菜单格子布局：补满空位
            $scope.$watch('itemList', function(value) {
                if (!value) {
                    return;
                }
                var len = $scope.itemList.length;
                var rem = len % 3;
                if (rem) {
                    var fill = 3 - (len % 3) + len;
                    for (var i = len; i < fill; i += 1) {
                        value.push({
                            name: '...'
                        });
                    }
                }
            }, true);

            function deleteCookie(name) {
                var expdate = new Date();
                expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
                setCookie(name, "", expdate);
            }

            function setCookie(name, value) {
                var argv = setCookie.arguments;
                var argc = setCookie.arguments.length;
                var expires = (argc > 2) ? argv[2] : null;
                var cookieVal = name + "=" + escape(value);
                if (expires !== null) {
                    var largeExpDate = new Date();
                    largeExpDate.setTime(largeExpDate.getTime() + (expires * 1000 * 3600 * 24));
                    cookieVal += "; expires=" + largeExpDate.toGMTString();
                }
                document.cookie = cookieVal;
            }

            $scope.logout = function() {
                loadingLayer.in();
                deleteCookie("token");
                localStorageService.clearAll();
                setTimeout(function() {
                    rcpAid.redirect(false, '退出', {
                        timestamp: new Date().getTime()
                    });

                    //第三方退出 start---------------------
                    WB2.logout(function() {
                        //callback function
                    });
                    QC.Login.signOut();
                    //第三方退出 end ---------------------

                }, loadTiem);
            };

            $scope.login = function() {
                loadingLayer.in();
                deleteCookie("token");
                localStorageService.clearAll();
                $cookies.token = "";
                var url = $location.absUrl();
                setTimeout(function() {
                    rcpAid.redirect(false, '登录', {
                        url: encodeURIComponent(url)
                    });
                }, loadTiem);
            };
            
            $scope.register = function() {
                loadingLayer.in();
                var url = $location.absUrl();
                setTimeout(function() {
                    rcpAid.redirect(false, '注册', {
                        url: encodeURIComponent(url)
                    });
                }, loadTiem);
            };

            //头像下拉菜单
            $scope.listClick = function(name) {
                if (name === "创建新课程") {
                    $scope.createNewCourse();
                }
                if (name === "创建新题库") {
                    $scope.createNewExam();
                }
                if (name === "设置" || name === "课程表" || name === "项目记录" || name === "项目列表" || name === "奖励记录") {
                    service.dialog.alert('该功能正在建设中...');
                    return false;
                }
            };

            //创建课程
            $scope.createNewCourse = function() {
                var timer = $timeout(function() {
                    loadingLayer.in();
                }, 1000);
                service.course.createNewBlank({})
                    .then(
                        function(rs) {
                            $timeout.cancel(timer);
                            rcpAid.redirect(false, '创建课程', {
                                eid: rs.bankId,
                                cid: rs.data
                            });
                        },
                        function(err) {
                            $timeout.cancel(timer);
                            switch (err.type) {
                                case 1:
                                    service.dialog.alert(err.data.msg);
                                    break;
                            }
                        }
                    );
            };

            //创建题库
            $scope.createNewExam = function() {
                var timer = $timeout(function() {
                    loadingLayer.in();
                }, 1000);
                service.course.createNewBlank({
                        "courseType": 20
                    })
                    .then(
                        function(rs) {
                            $timeout.cancel(timer);
                            rcpAid.redirect(false, '创建题库', {
                                eid: rs.bankId,
                                cid: rs.data
                            });
                        },
                        function(err) {
                            $timeout.cancel(timer);
                            switch (err.type) {
                                case 1:
                                    service.dialog.alert(err.data.msg);
                                    break;
                            }
                        }
                    );
            };

            $scope.goToTeacherSpace = function(uid) {
                rcpAid.redirect(false, '教学中心', {
                    uid: uid,
                    chk: true
                });
            };
        }
    };
});

//@ 分类
module.controller('categoriesCtrl', function($rootScope, $scope, service) {
    $scope.service = service;
    $scope.hover = {};
    $scope.catType = getCourseCat();

    function setData(type) {
        switch (type) {
            case 2:
                $scope.categoriesListStyle2 = allTagData || []; //aikexue.com
                break;
            default:
                $scope.categoriesListStyle1 = allTagData || []; //default
        }
    }

    $scope.byCategories = function() {
        $scope.byCategoriesLoading = true;

        setData($scope.catType);
    };

    $scope.listenerMember = {
        byCategories: {
            node: '#by-categories',
            callback: $scope.byCategories
        }
    };

    var allTagData;

    service.course.getAllTag({})
        .then(
            function(rs) {
                allTagData = rs.data;
                $rootScope.allTagCategroy = rs.data;
                service.lazy.request({
                    json: $scope.listenerMember
                });
            },
            function(err) {
                $scope.byCategoriesLoading = true;
                switch (err.type) {
                    case 1:
                        service.dialog.alert(err.data.msg);
                        break;
                }
            }
        );

    $scope.goToCategory = function() {
        var tags = [].slice;
        rcpAid.redirect(true, '分类', {
            tags: tags.call(arguments, 0).join(',')
        });
    };
});

//@ 搜索栏
module.directive("searchDir", function() {
    return {
        templateUrl: 'application/directive/head-tail/search-dir.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            hot: "="
        },
        controller: 'headSearchCtrl'
    };
});

//@ 搜索
module.controller('headSearchCtrl', function($rootScope, $scope, $document, $element, service) {
    console.log($scope.hot);
    console.log('$scope.hot');
    $scope.scHotWord = $scope.hot || [{
        name: '跨境电商'
    }, {
        name: 'IT互联网'
    }, {
        name: '设计创作'
    }, {
        name: '商务外语'
    }, {
        name: '英语四级'
    }];

    $scope.scSelect = [{
        name: '所有分类',
        value: '',
        fixLock: true
    }, {
        name: '课程',
        value: 10
    }, {
        name: '题库',
        value: 20
    }];

    $scope.scSelectVal = $scope.scSelect[0];

    $scope.onkeydown = function(ev) {
        ev.stopPropagation();
        switch (ev.keyCode) {
            case 13:
                if(!$scope.scText){
                    $scope.scText = $('.head-search-bar input').eq(0).val();
                }
                var kdi = $scope.KeyDownIndex;
                var ll = $scope.lMaxLen;
                if (typeof kdi === 'number' && kdi >= 0 && kdi < ll && $scope.scTag) {
                    $scope.matchGoToCategory($scope.scTag, $scope.scText);
                } else {
                    if(kdi >= 0){
                        $scope.goToResourceDetail($scope.mcIiem);
                    }else{
                        $scope.goToSearch($scope.scSelectVal.value, $scope.scText);
                    }
                }
                break;
            case 38:
                keyUpEvent();
                break;
            case 40:
                keyDownEvent();
                break;
            default:
                moveLock = false;
                $scope.moveKeyIndex = undefined;
                $scope.KeyDownIndex = undefined;
                $scope.scTag = undefined;
                endFn();
        }
    };

    var moveLock;

    function clear() {
        $scope.scText = '';
        endFn();
    }

    function keyMove() {
        moveLock = true;
        $scope.KeyDownIndex = $scope.moveKeyIndex;
        getCurKeyItem();
    }

    function keyDownEvent() {
        if (typeof $scope.moveKeyIndex !== 'number') {
            $scope.moveKeyIndex = 0;
        } else {
            $scope.moveKeyIndex = ($scope.moveKeyIndex + 1) % $scope.aMaxLen;
        }
        keyMove();
    }

    function keyUpEvent() {
        if (typeof $scope.moveKeyIndex !== 'number') {
            $scope.moveKeyIndex = $scope.aMaxLen - 1;
        } else {
            $scope.moveKeyIndex = $scope.moveKeyIndex < 0 ? $scope.aMaxLen - 1 : $scope.moveKeyIndex - 1;
        }
        keyMove();
        moveCursor($scope.scText.length);
    }

    function getCurKeyItem() {
        var ki = $scope.KeyDownIndex;
        var ll = $scope.lMaxLen;
        var item;
        $scope.scTag = undefined;
        if (ki < ll) {
            item = $scope.mcCategoryList[ki];
            if(item){
                $scope.scText = $scope.text;
                $scope.scTag = item.tag;
            }
        }
        if (ki >= ll) {
            item = $scope.mcCourseList[ki - $scope.lMaxLen];
            $scope.scText = item.name;
        }
        $scope.mcIiem = item;
        return item;
    }

    function endFn(digest) {
        $scope.matchReadyLock = false;
        if (digest) {
            $document.unbind('click');
            $scope.$digest();
        }
    }

    function focus() {
        $document.unbind('click').bind('click', function() {
            endFn('digest');
        });
    }

    var blurTimer;

    function blur() {
        if (!$scope.matchReadyLock) {
            return;
        }
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function() {
            endFn('digest');
        }, 300);
    }

    $element.find('input[ng-model="scText"]').unbind('focus').bind('focus', focus);

    $element.find('input[ng-model="scText"]').unbind('blur').bind('blur', blur);

    function moveCursor(count) {
        var input = $element.find('input[ng-model="scText"]').get(0);
        if ('selectionStart' in input) {
            input.selectionStart = count;
            input.selectionEnd = count;
        }
        if ('createTextRange' in input) {
            var a = input.createTextRange(); //创建文本范围对象a
            a.moveStart('character', count); //更改范围起始位置
            a.collapse(true); //将插入点移动到当前范围的开始或结尾。
            a.select(); //将当前选中区置为当前对象，执行
        }
    }

    $scope.mouseenter = function(index, type) {
        switch (type) {
            case '类':
                $scope.moveKeyIndex = index;
                break;
            case '资源':
                $scope.moveKeyIndex = index + $scope.lMaxLen;
                break;
        }
    };

    $scope.goToSearch = function(type, query) {
        clear();
        console.log(123123123123123);
        rcpAid.redirect(false, '搜索', {
            type: type,
            query: query ? encodeURIComponent(query) : query
        });
    };

    $scope.goToSort = function(str) {
        clear();
        rcpAid.redirect(false, '分类', {
            tags: str
        });
    };

    $scope.stopPropagation = function(ev) {
        ev.stopPropagation();
    };

    $scope.matchChange = function(type, query) {
        if (moveLock) {
            return;
        }
        endFn();
        if (!query) {
            return;
        }
        $scope.text = query;
        service.course.searchMatchKw({
            t: type || null,
            k: query
        }, {
            option: {
                loading: false
            }
        }).then(
            function(rs) {
                if (!$scope.scText) {
                    return;
                }
                $scope.matchReadyLock = true;
                $scope.mcCourseList = rs.data.c || [];
                $scope.mcCategoryList = rs.data.t || [];
                $scope.lMaxLen = $scope.mcCategoryList.length > 3 ? 3 : $scope.mcCategoryList.length;
                $scope.cMaxLen = 10 - $scope.lMaxLen;
                $scope.aMaxLen = $scope.lMaxLen + $scope.cMaxLen;
                if (!$scope.mcCourseList.length && !$scope.mcCategoryList.length) {
                    endFn();
                }
            },
            function(err) {
                switch (err.type) {
                    case 1:
                        service.dialog.alert(err.data.msg);
                        break;
                }
            }
        );
    };

    $scope.goToResourceDetail = function(resource, ev) {
        if (resource.t && parseInt(resource.t) === 20) {
            rcpAid.redirect(false, '题库详情', {
                id: resource.id,
                eid: resource.b
            });
        } else {
            rcpAid.redirect(false, '课程详情', {
                id: resource.id
            });
        }
        if (typeof ev === 'object' && ev.stopPropagation) {
            ev.stopPropagation();
        }
    };

    $scope.matchGoToCategory = function(name, query) {
        if (!$rootScope.allTagCategroy || !$rootScope.allTagCategroy.length) {
            dialog('error', '获取分类数据失败');
            return;
        }
        var str = matchKeyWork($rootScope.allTagCategroy, name).reverse().join(',');
        if (str) {
            clear();
            rcpAid.redirect(false, '分类', {
                tags: str,
                query: query
            });
        } else {
            dialog('error', '找不到这个分类，请检查接口数据');
        }
    };

    $scope.categorySelect = [];

    //所有分类递归
    function sortAllTagRecursive(arr, callback) {
        if ($scope.inSort && !angular.isArray(arr)) {
            return;
        }
        angular.forEach(arr, function(item) {
            if ($scope.inSort) {
                return false;
            }
            if (!callback(item)) {
                if (angular.isArray(item.child) && item.child.length) {
                    sortAllTagRecursive(item.child, callback);
                    selectArrayEvent('push', item.name);
                }
            }
        });
    }

    //在所有分类里匹配选中的分类层级
    function matchKeyWork(allSort, work) {
        $scope.inSort = false;
        selectArrayEvent('clear');

        sortAllTagRecursive(
            allSort,
            function(item) {
                $scope.inSort = item.name === work;
                if ($scope.inSort) {
                    selectArrayEvent('push', item.name);
                }
                return $scope.inSort;
            }
        );

        switch ($scope.inSort) {
            case true:
                selectArrayEvent('splice', work);
                break;
            default:
                selectArrayEvent('clear');
        }

        return $scope.categorySelect;
    }

    //在所有分类里匹配选中的分类层级的数组事件
    function selectArrayEvent(type, item) {
        var array = $scope.categorySelect;
        switch (type) {
            case 'clear':
                array.splice(0, array.length);
                break;
            case 'push':
                array.push(item);
                break;
            case 'splice':
                array.splice(0, $.inArray(item, array));
                break;
        }
    }

    function dialog(type, msg) {
        service.dialog.alert(msg);
        console[type](msg);
    }
});

//@ 尾部
module.directive("tailnav", function() {
    return {
        templateUrl: 'application/directive/head-tail/footer-dir.html',
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            data: "=data"
        },
        controller: function($scope, service) {
            $scope.catType = getCourseCat();

            var arr = g_conf.domain || [];
            angular.forEach(arr, function(item) {
                if (item.domain === location.host) {
                    $scope.caseNumber = item.domainNum;
                }
            });


            $scope.atBuilding = function() {
                service.dialog.alert('正在建设中...');
            };
        }
    };
});

module.filter('titleMatchKw', function($sce) {
    return function(text, query) {
        var reg = /([\[\]\(\)\{\}\*\?\+\^\$\.\|\\])/ig;
        var str = query.replace(reg, '\\$1');
        text = text.replace(new RegExp('('+ str + ')', 'ig'), '<b>$1</b>');
        return $sce.trustAsHtml(text);
    };
});
