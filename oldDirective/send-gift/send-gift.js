angular.module('app').directive('sendGift', function () {
    return {
        templateUrl: 'directive/send-gift/send-gift.html',
        scope: {
            target: "=",
            callback: '=',
            liveid: '=',
            chatroomid: '=',
            from: '=',
            type: '='
        },
        restrict: 'E',
        controller: function ($scope, $timeout, $element, $state, loading, confirm, config, connector, currentUser, displayEffect) {
            var hide = loading.show();
            $scope.callback = $scope.callback || function () {};
            currentUser().then(function (user) {
                hide();
                $scope.user = user;
                getGoodsList();
            }, function (){
                hide();
            });
            $scope.$on('$stateChangeStart', function () {
                handleCancel();
            });
            function getGoodsList () {
                var hide = loading.show({element: angular.element('.recieve-gift')});
                if (!$scope.from) {
                    connector.getGiftList({uid: $scope.user.id, type: 4}).then(function (data) {
                        $scope.picRoot = data.picRoot;
                        $scope.gifts = data.Data;
                        $scope.selected = $scope.gifts[0];
                        hide();
                    });
                } else if ($scope.from === 'chatroom' || $scope.from === 'userTool') {
                    if (!$scope.liveid) {
                        alert('直播室id无效');
                        return;
                    } else if (!$scope.chatroomid) {
                        alert('聊天室 id 无效');
                        return;
                    }
                    connector.goodsList({
                        uid: $scope.user.id, 
                        type: $scope.activeTab == 'tool' ? 1 : 2,
                        liveid: $scope.liveid,
                    }).then(function (data) {
                        $scope.picRoot = data.picRoot;
                        $scope.gifts = data.Data.magicList;
                        $scope.selected = $scope.gifts[0];
                        hide();
                    });
                } else if ($scope.from === 'user') {
                    connector.friendGiftList({
                        liveid: $scope.liveid,
                        uid: $scope.user.id,
                        type: 1
                    }).then(function (data) {
                        $scope.picRoot = data.picRoot;
                        $scope.gifts = data.Data.magicList;
                        $scope.selected = $scope.gifts[0];
                        hide();
                    });
                } else if ($scope.from === 'commentator') {
                    connector.commentatorGiftList({
                        liveid: $scope.liveid,
                        uid: $scope.user.id,
                        chatroomid: $scope.chatroomid,
                        fuid: $scope.target.uid
                    }).then(function (data) {
                        $scope.picRoot =  data.picRoot;
                        $scope.gifts = data.Data.magicList;
                        $scope.selected = $scope.gifts[0];
                        hide();
                    });
                } else if ($scope.from === 'wonderful') {
                    $scope.selectComm($scope.target[0]);
                    hide();
                }
            }
            function handleSuccess () {
                $scope.hide = true;
                $timeout(function () {
                    $element.remove();
                    $scope.$destroy();
                }, 300);
                $scope.callback(undefined, true);
            }
            function handleCancel() {
                $scope.hide = true;
                $timeout(function () {
                    $element.remove();
                    $scope.$destroy();
                }, 300);
                $scope.callback();
            }
            function checkMoney () {
                var price = $scope.selected.price;
                var num = $scope.selected.num;
                var amount = $scope.amount;
                var ownMoney = Number($scope.user.boluo);
                if (num < amount && ownMoney < ((amount - num) * price)) {
                    var h = confirm({
                        msg: '金菠萝余额不足购买道具。',
                        text: {
                            success: '充值',
                            cancel: '确定'
                        },
                        success: function () {
                            $state.go('recharge');
                            h();
                        },
                        cancel: function () {
                            h();
                        }
                    });
                    return false;
                } else {
                    return true;
                }
            }
            $scope.changeTab = function (tab) {
                $scope.activeTab = tab;
                getGoodsList();
            };
            $scope.amount = 1;
            $scope.activeTab = 'tool';
            $scope.selectGift = function (gift) {
                $scope.selected = gift;
            };
            $scope.cancelSendGift = function () {
                handleCancel();
            };
            $scope.selectComm = function (target) {
                $scope.selectedComm = target;
                connector.commentatorGiftList({
                    liveid: $scope.liveid,
                    uid: $scope.user.id,
                    chatroomid: $scope.chatroomid,
                    fuid: target.uid
                }).then(function (data) {
                    $scope.picRoot = data.picRoot;
                    $scope.gifts = data.Data.magicList;
                    $scope.selected = $scope.gifts[0];
                });
            };
            $scope.sendGift = function () {
                if (!checkMoney()) {return;}
                var hide = loading.show();
                connector.sendGift({
                    uid: $scope.user.id,
                    fuid: $scope.target && ($scope.target.id || $scope.target.uid),
                    num: $scope.amount,
                    liveid: $scope.liveid,
                    chatroomid: $scope.chatroomid,
                    magicid: $scope.selected.magicid
                }).then(function () {
                    hide();
                    $scope.user.boluo = ($scope.user.boluo - $scope.selected.price * $scope.amount).toFixed(1);
                    handleSuccess();
                }, function (e) {
                    hide();
                    $scope.callback(e);
                });
            };
            $scope.useMagic = function (effect) {
                if (!checkMoney()) {return;}
                function send(option) {
                    var o = {
                        uid: $scope.user.id,
                        magicid: $scope.selected.magicid,
                        liveid: $scope.liveid,
                        groupid: $scope.chatroomid,
                        content: $scope.selected.description,
                        num: effect ? 1 : $scope.amount,
                        fuid: $scope.target && ($scope.target.id || $scope.target.uid),
                        type: $scope.type
                    };
                    if ($scope.from == 'wonderful') {
                        o.fuid = $scope.selectedComm.uid;
                        delete o.groupid;
                        o = angular.extend(o, option);
                        return connector.sendCommGift(o);
                    } else {
                        o = angular.extend(o, option);
                        return connector.useMagic(o);
                    }
                }
                if ($scope.from == 'commentator' || $scope.selected.magicid === '14' || $scope.selected.magicid == '34') {
                    $scope.callback(undefined, undefined, send, $scope.selected, $scope.from, $scope.amount);
                    $scope.hide = true;
                    $timeout(function () {
                        $element.remove();
                        $scope.$destroy();
                    }, 300);
                } else {
                    var hide = loading.show();
                    send().then(function () {
                        hide();
                        handleSuccess();
                        displayEffect($scope.selected.magicid, {
                            target: $scope.user
                        });
                    }, function (e) {
                        hide();
                        $scope.callback(e);
                    });
                }
            };
        },
    };
}).factory('sendGift', function ($compile, $rootScope) {
    return function (option, callback) {
        if (angular.element('send-gift').length) {
            return;
        }
        var tmpl = '<send-gift callback="cb" from="from" type="type" target="target" liveid="liveid" chatroomid="chatroomid"></send-gift>';
        var scope = $rootScope.$new(true);
        angular.extend(scope, option);
        scope.cb = callback;
        var ele = $compile(tmpl)(scope);
        angular.element('body').append(ele);
    };
}).factory('displayEffect', function ($compile, $rootScope, $timeout, config) {
    var fireworkTmpl = '<img class="firework-effect" src="/image/bg/firework.gif" />';
    var richmanTmpl = [
        '<div class="richman-enter">',
        '   <div class="user-info">',
        '        <avatar url="target.avatar"></avatar>',
        '        <span class="user-name">{{target.nickname}}</span>',
        '    </div>',
        '    <img class="effect-car" src="/image/bg/car.png" alt="">',
        '    <img class="effect-car-left" src="/image/bg/car_left.png" alt="">',
        '    <img class="effect-car-right" src="/image/bg/car_right.png" alt="">',
        '    <img class="effect-car-text" src="/image/bg/car_tyrant.png" alt="">',
        '</div>'].join('');
    var speakerTmpl = [
        '<div class="speaker-effect-wrapper">',
            '<div class="speaker-bg"></div>',
            '<avatar url="target.avatar"></avatar>',
            '<div class="speaker-text"><div class="speaker-msg">{{msg}}</div>',
            '<div class="speaker-user">{{target.nickname}}</div></div>',
        '</div>'
    ].join('');
    var sendGift = [
        '<div class="send-to-comm-wrapper">',
            '<div class="send-bg"></div>',
            '<div class="send-text"><span class="send-user">{{sender}}</span>',
            '<span class="send-target">送{{target}}</span>',
            '<img ng-src="{{giftUrl}}" alt="">',
            '<span>x {{amount}}</span>',
            '</div>',
        '</div>',
    ].join('');
    return function (id, option) {
        var scope = $rootScope.$new(true);
        angular.extend(scope, option);
        var e;
        switch (+id) {
            // 使用了烟花特效
            case 18: {
                e = $compile(fireworkTmpl)(scope);
                angular.element('body').append(e);
                e.fadeIn();
                $timeout(function () {
                    e.fadeOut(function () {
                        e.remove();
                        scope.$destroy();
                    });
                }, 3000);
                break;
            }
            // 使用了闪亮登场特效
            case 15: {
                e = $compile(richmanTmpl)(scope);
                angular.element('body').append(e);
                e.fadeIn();
                $timeout(function () {
                    e.fadeOut(function() {
                        e.remove();
                        scope.$destroy();
                    });
                }, 3000);
                break;
            }
            // 使用了 传声筒特效
            case 14: {
                if (scope.target.avatar.indexOf('http://') == -1 && scope.target.avatar.indexOf('https://') == -1) {
                    scope.target.avatar = config.picRoot() + scope.target.avatar;
                }
                e = $compile(speakerTmpl)(scope);
                angular.element('body').append(e);
                $timeout(function () {
                    e.fadeOut(function () {
                        e.remove();
                        scope.$destroy();
                    });
                }, 2000);
                break;
            }
            // 赠送礼物给专家
            case 0: {
                e = $compile(sendGift)(scope);
                angular.element('body').append(e);
                $timeout(function () {
                    e.fadeOut(function () {
                        e.remove();
                        scope.$destroy();
                    });
                }, 5000);
            }
        }
    };
});