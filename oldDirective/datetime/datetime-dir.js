/**
 * Created by bingoo on 2015/04/30.
 *
 * @param {Object}  style : 'all' || 'expired' || 'real' || 'time'
 * <datetime value="model" config="{style:'real time',placeholder:'请选择日期时间'}"></datetime>
 */

module.directive("datetime",function(){
    return {
        template: '<span ng-style="style"><input type="text" ng-class="config.class" ng-model="value" placeholder="{{config.placeholder}}" ng-click="toggle($event)" readonly /></span>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            value:"=value",
            startdate:"=startdate",
            enddate:"=enddate",
            config:"=config"
        },
        controller: function($scope,$element,$document,$compile,$interval,datetimeService){
            $scope.style = { position:'relative', display: 'inline-block', cursor: 'default' };
            if ($scope.config.noInput) {
                $scope.style.display = 'none';
            }
            $scope.toggle = function (ev){
                if(datetimeService.tpl){
                    $document.unbind('click');
                    datetimeService.tpl.remove();
                    if(datetimeService.tag === $element){
                        delete datetimeService.tpl;
                        $interval.cancel(datetimeService.clockTimer);
                        return;
                    }
                }
                datetimeService.tag = $element;
                datetimeService.tpl = $compile('<datetime-tpl value="value" config="config"></datetime-tpl>')($scope);
                if ($scope.config.noInput) {
                    $scope.config.targetElement.append(datetimeService.tpl);
                } else {
                    $element.append(datetimeService.tpl);
                }
                $document.bind('click',$scope.toggle);
                ev.stopPropagation();
            };
            datetimeService.toggle = $scope.toggle;
        }
    };
});

module.directive('datetimeTpl', function() {
    return {
        template: [
            '<div ng-class="timeFlag ? \'datetime-w and-time-style\' : \'datetime-w\'" ng-click="stopPropagation($event)">',
                '<div style="cursor:default">',
                    '<em class="arrow-ic"></em>',
                    '<div class="show-time-box">',
                        '<div class="now-time">',
                            '<p>当前时间</p>',
                            '<span>{{clockString}}</span>',
                        '</div>',
                        '<div style="padding: 15px 0px;">',
                            '<select ',
                                'class="hour" ',
                                'ng-options="item.str for item in hourList" ',
                                'ng-model="repeatData.hour" ',
                                'ng-change="change({hour: repeatData.hour})"></select>',
                        '</div>',
                        '<div>',
                            '<select ',
                                'class="minute" ',
                                'ng-options="item.str for item in minuteList" ',
                                'ng-model="repeatData.minute" ',
                                'ng-change="change({minute: repeatData.minute})"></select>',
                        '</div>',
                    '</div>',
                    '<div class="show-date-box">',
                        '<div class="t">',
                            '<a href="javascript:;" class="p" title="上一月" ng-click="mBefore()"></a>',
                            '<a href="javascript:;" class="n" title="下一月" ng-click="mAfter()"></a>',
                            '<select ',
                                'class="y" ',
                                'ng-options="item.str for item in yearList" ',
                                'ng-model="repeatData.year" ',
                                'ng-change="change({year: repeatData.year})"></select>',
                            '<select ',
                                'class="m" ',
                                'ng-options="item.str for item in monthList" ',
                                'ng-model="repeatData.month" ',
                                'ng-change="change({month: repeatData.month})"></select>',
                            '<div class="w">',
                                '<h4>一</h4>',
                                '<h4>二</h4>',
                                '<h4>三</h4>',
                                '<h4>四</h4>',
                                '<h4>五</h4>',
                                '<h4>六</h4>',
                                '<h4>日</h4>',
                            '</div>',
                        '</div>',
                        '<div class="c">',
                            '<a ng-repeat="item in dayList" ng-class="item.class" ng-click="change({day: item})">{{item.val}}</a>',
                        '</div>',
                        '<div class="f">',
                            '<a href="javascript:;" class="clear" ng-click="clearValue()">清空</a>',
                            '<a href="javascript:;" class="today" ng-click="today()">今日</a>',
                            '<a href="javascript:;" class="cancel" ng-click="cancel()">取消</a>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            value: '=value',
            config: '=config'
        },
        controller: function($scope,$element,$timeout,$interval,$document,datetimeService) {

            $scope.oldDate = new Date(); //旧值
            $scope.newDate = new Date(); //新值
            $scope.curDate = new Date(); //当前值
            $scope.repeatData = {}; //repeat 选中值
            $scope.expiredFlag = $scope.config.style.match("expired"); //过期日期标识
            $scope.realFlag = $scope.config.style.match("real"); //真实日期标识
            $scope.timeFlag = $scope.config.style.match("time"); //时间栏标识
            $scope.formatType = $scope.timeFlag ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd';

            /**
             * 设置下拉菜单
             * @param {Number} y 年
             * @param {Number} m 月
             * @param {Number} h 时
             * @param {Number} f 分
             */
            $scope.setSelect = function (y,m,h,f){
                $scope.yearList = pushOption(1901, (y+100), 4, ['year', y], '年');

                $scope.monthList = pushOption(0, 12, 2, ['month', m], '月');

                $scope.hourList = pushOption(0, 24, 2, ['hour', h], '点');

                $scope.minuteList = pushOption(0, 60, 2, ['minute', f], '分');
            };

            /**
             * 前零补零
             * @param  {Number} num 数字
             * @param  {Number} len 长度
             * @return {String}     字符串数字
             */
            function withZero (num,len) {
                var str = num+'';
                while (str.length < len) {
                    str = '0' + str;
                }
                return str;
            }

            /**
             * 下拉菜单选项设置
             * @param  {Number} i 起始数字
             * @param  {Number} l 长度数字
             * @param  {Number} z 字符串数字长度（前零补零）
             * @param  {Number} p 选中的年、月、时、分值
             * @param  {Number} s 选项名称附加字符串
             * @return {Array}    下拉菜单选项数组
             */
            function pushOption (i,l,z,p,s) {
                var arr = [];
                while (i<l){
                    var option = {
                        val: i,
                        str: withZero( (p[0] === 'month' ? i+1 : i) , z) + (s || '')
                    };
                    arr.push(option);
                    if(option.val === p[1]){
                        $scope.repeatData[p[0]] = option;
                    }
                    i+=1;
                }
                return arr;
            }

            /**
             * 设置日子
             * @param {Number} y 年
             * @param {Number} m 月
             * @param {Number} d 日
             */
            $scope.setDay = function (y,m,d){
                $scope.dayList = (function (){
                    var arr = [];
                    var i = 0;
                    var newDate = new Date( y +'-'+ (m+1) +'-'+ 1);
                    var getday = newDate.getDay() ? newDate.getDay() : 7;
                    var dayLen = getDayLen(y,(m+1));
                    while (i<42){
                        var num = (i>=(getday-1) && i<(dayLen+(getday-1))) ? (i-(getday-2)) : '';
                        var c = num ? daytype(y,m,num) : 'd';
                        var option = {
                            val: num,
                            class: c
                        };
                        arr.push(option);
                        if(option.val === d){
                            $scope.repeatData.day = option;
                        }
                        i+=1;
                    }
                    return arr;
                })();
            };

            /**
             * 日子 CLASS 类型
             * @param {Number} y 年
             * @param {Number} m 月
             * @param {Number} d 日
             */
            function daytype (y,m,d){
                var getDate = new Date();
                var cy = getDate.getFullYear();
                var cm = getDate.getMonth();
                var cd = getDate.getDate();
                var ny = $scope.newDate.getFullYear();
                var nm = $scope.newDate.getMonth();
                var nd = $scope.newDate.getDate();
                var cs = 'd ';
                var addClass = function(flag) {
                    if (flag) {
                        cs += 'd-able ';
                    }
                    if (y === ny && m === nm && d === nd) {
                        cs +=  flag ? 'd-now ' : 'd-disabled ';
                    }
                };
                if($scope.expiredFlag){
                    addClass( y<cy || y===cy && m<cm || y===cy && m===cm && d<=cd );
                }else if($scope.realFlag){
                    addClass( y>cy || y===cy && m>cm || y===cy && m===cm && d>=cd );
                }else{
                    addClass( true );
                }
                return cs;
            }

            /**
             * 润年判断
             * @param  {Number}  y 年
             * @return {Boolean}   真假润年
             */
            function isLeapyear (y){
                return (y%4===0 && y%100!==0) || (y%400===0);
            }

            /**
             * 获取本月天数
             * @param  {Number} y 年
             * @param  {Number} m 月
             * @return {Number}   本月天数
             */
            function  getDayLen (y,m){
                return (m===1 || m===3 || m===5 || m===7 || m===8 || m===10 || m===12) ? 31 :
                       (m===4 || m===6 || m===9 || m===11) ? 30 :
                       (m===2 && isLeapyear(y)) ? 29 : 28;
            }

            function dateFormat (date,format) {
                var o = {
                    "M+" : date.getMonth() + 1, //月
                    "d+" : date.getDate(), //日
                    "h+" : date.getHours(), //小时
                    "m+" : date.getMinutes(), //分
                    "s+" : date.getSeconds(), //秒
                    "q+" : Math.floor((date.getMonth() + 3) / 3), //季
                    "S" : date.getMilliseconds() //毫秒
                };

                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }

                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }

            $scope.mBefore = function (){
                var month  = $scope.curDate.getMonth()-1;
                if(month < 0){
                    $scope.curDate.setFullYear($scope.curDate.getFullYear()-1);
                    month = 11;
                }
                $scope.curDate.setMonth(month);
                $scope.reset();
            };

            $scope.mAfter = function (){
                var month  = $scope.curDate.getMonth()+1;
                if(month > 11){
                    $scope.curDate.setFullYear($scope.curDate.getFullYear()+1);
                    month = 0;
                }
                $scope.curDate.setMonth(month);
                $scope.reset();
            };

            $scope.change = function (args){
                angular.forEach(args,function (value,key){
                    switch(key){
                        case 'year':
                            $scope.curDate.setFullYear(value.val);
                            $scope.reset();
                            break;
                        case 'month':
                            $scope.curDate.setMonth(value.val);
                            $scope.reset();
                            break;
                        case 'day':
                            if(value.class.match(/d-able|d-now/)){
                                $scope.curDate.setDate(value.val);
                                $scope.setValue($scope.curDate);
                                if(!$scope.timeFlag){
                                    $element.remove();
                                    $interval.cancel(datetimeService.clockTimer);
                                }else{
                                    $scope.reset();
                                }
                            }
                            break;
                        case 'hour':
                            $scope.curDate.setHours(value.val);
                            if($scope.initValue){
                                $scope.setValue($scope.curDate);
                                $scope.reset();
                            }
                            break;
                        case 'minute':
                            $scope.curDate.setMinutes(value.val);
                            if($scope.initValue){
                                $scope.setValue($scope.curDate);
                                $scope.reset();
                            }
                            break;
                    }
                });
            };

            $scope.clear = function (date,value,init){
                var newDate = date || new Date();
                $scope.setData($scope.newDate, newDate);
                $scope.setData($scope.curDate, newDate);
                $scope.value = value || '';
                $scope.reset();
                if(!init){
                    $element.remove();
                    $interval.cancel(datetimeService.clockTimer);
                }
            };

            $scope.clearValue = function () {
                $scope.clear();
                if (typeof datetimeService.onClear === 'function') {
                    datetimeService.onClear();
                }
            };

            $scope.today = function (){
                var newDate = new Date();
                $scope.clear(newDate, dateFormat(newDate, $scope.formatType));
            };

            $scope.cancel = function (){
                if($scope.initValue){
                    $scope.setValue($scope.oldDate);
                    $scope.reset();
                }else{
                    $scope.clear();
                }
                $element.remove();
                $interval.cancel(datetimeService.clockTimer);
            };

            $scope.stopPropagation = function (ev){
                ev.stopPropagation();
            };

            $scope.setData = function (obj,date){
                obj.setFullYear(date.getFullYear());
                obj.setMonth(date.getMonth());
                obj.setDate(date.getDate());
                obj.setHours(date.getHours());
                obj.setMinutes(date.getMinutes());
            };

            $scope.setValue = function (date){
                $scope.setData($scope.newDate, date);
                $scope.setData($scope.curDate, date);

                $scope.value = dateFormat($scope.newDate, $scope.formatType);
            };

            $scope.reset = function (){
                var y = $scope.curDate.getFullYear();
                var m = $scope.curDate.getMonth();
                var d = $scope.curDate.getDate();
                var h = $scope.curDate.getHours();
                var f = $scope.curDate.getMinutes();

                $scope.setSelect(y, m, h, f);
                $scope.setDay(y, m, d);
            };

            $scope.clock = function (){
                var newDate = new Date();
                $scope.clockString = withZero(newDate.getHours(),2) + ":" + withZero(newDate.getMinutes(),2) + ":" + withZero(newDate.getSeconds(),2);
            };

            $scope.locate = function (){
                var ww = angular.element(window).width();
                var wh = angular.element(window).height();
                var ew = $element.width();
                var eh = $element.height();
                var ph = $element.prev().height();
                var tSpace = $element.parent().offset().top - angular.element(window).scrollTop();
                var bSpace = wh - (tSpace + ph);
                var lSpace = $element.parent().offset().left;
                var rSpace = ww - (lSpace + ew);
                var top = 0;
                var left = 0;
                var count = function (v,s,e,w){
                    if(s + e > w){
                        v = w - (s + e + 10);
                        if(v < -s){
                            v = -s;
                        }
                    }
                    return v;
                };
                var yLocate = function (c){
                    left = count(left,lSpace,ew,ww);
                    $element.addClass(c).css({left: left});
                    if ($scope.config.position) {
                        $element.css({bottom: 30});
                        $element.find('.arrow-ic').css({left: 20});
                    } else {
                        $element.find('.arrow-ic').css({left: -left+20});
                    }
                };
                var xLocate = function (c){
                    top  = count(top,tSpace,eh,wh);
                    $element.addClass(c).css({top: top});
                    $element.find('.arrow-ic').css({top: -top+ph/2});
                };
                var yfn = function (c){
                    if(lSpace + ew > ww && lSpace > ew){
                        xLocate('dtt-w-l-sty');
                    }
                    else if(lSpace < ew/2 && rSpace > ew){
                        xLocate('dtt-w-r-sty');
                    }
                    else{
                        yLocate(c);
                    }
                };
                var xfn = function (c){
                    xLocate(c);
                };
                if ($scope.config.position) {
                    left = -(20 + 16/2 - $scope.config.targetElement.width()/2);
                    switch ($scope.config.position) {
                        case 'top': 
                            yfn('dtt-w-t-sty');
                            break;
                        case 'bottom': 
                            yfn('dtt-w-b-sty');
                            break;
                        case 'left': 
                            xfn('dtt-w-l-sty');
                            break;
                        case 'right': 
                            xfn('dtt-w-r-sty');
                            break;
                    }
                    return;
                }
                if(bSpace >= eh){
                    yfn('dtt-w-b-sty');
                }
                else if(tSpace >= eh){
                    yfn('dtt-w-t-sty');
                }
                else if(lSpace > rSpace){
                    xfn('dtt-w-l-sty');
                }
                else{
                    xfn('dtt-w-r-sty');
                }
                
            };

            $scope.run = function (){
                $scope.initValue = $scope.value;
                var newDate = $scope.value ? new Date($scope.value.replace(/-|\./g,'/')) : new Date();
                if(!angular.isDate(newDate)){
                    console.error('oldDate is not Date Object');
                    return;
                }

                if($scope.value){
                    $scope.setData($scope.oldDate, newDate);
                    $scope.clear(newDate, dateFormat(newDate, $scope.formatType),'init');
                }else{
                    $scope.clear(newDate, '','init');
                }

                var y = $scope.oldDate.getFullYear();
                var m = $scope.oldDate.getMonth();
                var d = $scope.oldDate.getDate();
                var h = $scope.oldDate.getHours();
                var f = $scope.oldDate.getMinutes();

                $scope.setSelect(y, m, h, f);
                $scope.setDay(y, m, d);
                $timeout($scope.locate,80);
                if($scope.timeFlag){
                    $scope.clock();
                    $interval.cancel(datetimeService.clockTimer);
                    datetimeService.clockTimer = $interval($scope.clock,1000);
                }
            };

            $scope.run();
        }
    };
});

module.factory('datetimeService',function (){
    return {};
});