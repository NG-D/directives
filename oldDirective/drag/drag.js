angular.module('RCP').directive('drag', function () {
    var obj = {
        restrict: 'A',
        link: function (scope, element, attr) {
            var dragTarget = attr.drag ? element.find(attr.drag) : element;
            var body = angular.element(document);
            var move = {
                top: 0,
                left: 0
            };
            var cursorPos = {
                left: 0,
                top: 0
            };
            var elementPos;
            var windowSize = {};
            var elementSize = {};
            var positionType = attr.position || 'absolute';
            var limit = attr.limit === 'true';
            angular.element('body').append('<style>.no-select{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}</style>');
            function mousedown (event) {
                var left, top;
                if (positionType === 'absolute') {
                    left = event.pageX;
                    top = event.pageY;
                    // elementPos = element.offset();
                    elementPos = {top: +element.css('top').split('px')[0], left: +element.css('left').split('px')[0]};
                } else if (positionType === 'fixed') {
                    left = event.clientX;
                    top = event.clientY;
                    elementPos = element.position();
                }
                angular.element('body').addClass('no-select');
                dragTarget.off('mousedown', mousedown);
                body.on('mousemove', mousemove);
                body.on('mouseup', mouseup);
                cursorPos.left = left;
                cursorPos.top = top;
                if (limit) {
                    windowSize.width = angular.element(window).width();
                    windowSize.height = angular.element(window).height();
                    elementSize.width = element.width();
                    elementSize.height = element.height();
                }
            }
            function mousemove (event) {
                var left, top;
                if (positionType === 'absolute') {
                    left = event.pageX;
                    top = event.pageY;
                } else if (positionType === 'fixed') {
                    left = event.clientX;
                    top = event.clientY;
                }
                move.top = top - cursorPos.top;
                move.left = left - cursorPos.left;
                if (limit) {
                    var t = elementPos.top + move.top;
                    var l = elementPos.left + move.left;
                    t = t <= 0 ? 0 : t;
                    l = l <= 0 ? 0 : l;
                    t = t >= (windowSize.height - elementSize.height) ? (windowSize.height - elementSize.height) : t;
                    l = l >= (windowSize.width - elementSize.width) ? (windowSize.width - elementSize.width) : l;
                    element.css({
                        top: t,
                        left: l,
                        bottom: 'auto',
                        right: 'auto'
                    });
                } else {
                    element.css({
                        top: elementPos.top + move.top,
                        left: elementPos.left + move.left,
                        bottom: 'auto',
                        right: 'auto'
                    });
                }
            }
            function mouseup () {
                body.off('mousemove', mousemove);
                body.off('mouseup', mouseup);
                dragTarget.on('mousedown', mousedown);
                angular.element('body').removeClass('no-select');
            }
            dragTarget.on('mousedown', mousedown);
        }
    };

    return obj;
});