/**
c.dragAll:监听所有有class的子元素
c.dragClass:要监听的class，无此class或留空为整个元素drag
 */
try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lDrag', function($document) {
    return {
        restrict: 'ACE',
        replace: true,
        scope: {
            c: "=",
        },
        link: function($scope, element, $attr) {
            //cssStart
 var cssTpl='<style type="text/css" id="tpl-drag"></style>';
if (!$("#tpl-drag").length) {$("body").prepend(cssTpl);}
//cssEnd
            //鼠标移动x
            var mouseX = 0,
                //鼠标移动y
                mouseY = 0,
                //移动x距离
                moveX = 0,
                //移动y距离
                moveY = 0,
                //要移动的元素
                dragElement = element,
                //元素的位置top,left
                elementTL = {},
                //元素的position属性
                position = element.css('position'),
                //窗口宽高
                windowSize = {},
                //元素宽高
                elementSize = {},
                //元素父元素宽高
                parentSize = {};
            $scope.dragClass = '';
            $scope.dragAll = false;
            if (position === 'static' || !position) {
                console.log(position);
                $attr.position = "relative";
                position = 'relative';
                element.css({ 'left': 0, 'top': 0 });
            }

            function init() {
                //历遍传入参数
                if ($scope.c) {
                    angular.forEach($scope.c, function(value, key) {
                        $scope[key] = value;
                    });
                }
                var temElement = $(element).find('.' + $scope.dragClass);
                if (temElement.length) {
                    dragElement = temElement;
                }
                start();
            }

            function start() {
                dragElement.css({
                    cursor: 'all-scroll'
                });
                dragElement.on('mousedown', function(event) {
                    elementTL = element.position();
                    event.preventDefault();
                    if (position === 'fixed') {
                        mouseX = event.clientX;
                        mouseY = event.clientY;
                        windowSize.width = angular.element(window).width();
                        windowSize.height = angular.element(window).height();
                    } else if (position === 'absolute') {
                        mouseX = event.pageX;
                        mouseY = event.pageY;
                        parentSize.height = $(element).parent()[0].clientHeight;
                        parentSize.width = $(element).parent()[0].clientWidth;
                    } else {
                        mouseX = event.pageX;
                        mouseY = event.pageY;
                        parentSize.height = $(element).parent().height();
                        parentSize.width = $(element).parent().width();
                    }
                    elementSize.width = element[0].clientWidth;
                    elementSize.height = element[0].clientHeight;
                    if (windowSize.height - elementSize.height < 0) {
                        element.css('min-height', windowSize.height + 'px');
                    }
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });
            }

            function mousemove(event) {
                var left, top, x, y, temSize;
                if (position === 'fixed') {
                    x = event.clientX;
                    y = event.clientY;
                    temSize = windowSize;
                } else {
                    x = event.pageX;
                    y = event.pageY;
                    temSize = parentSize;
                }
                moveY = y - mouseY;
                moveX = x - mouseX;
                left = elementTL.left + moveX;
                top = elementTL.top + moveY;
                //不能超出底部
                top = top >= (temSize.height - elementSize.height) ? (temSize.height - elementSize.height) : top;
                //不能超出右边
                left = left >= (temSize.width - elementSize.width) ? (temSize.width - elementSize.width) : left;
                //不能超出顶部
                top = top <= 0 ? 0 : top;
                //不能超出左边
                left = left <= 0 ? 0 : left;
                element.css({
                    left: left + 'px',
                    top: top + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
            init();
        }
    };
});
