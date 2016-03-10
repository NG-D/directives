if (!directive) {
    var directive = angular.module('directive', []);
}
directive.directive('drag', function($document) {
    return {
        restrict: 'ACE',
        compile: function(element, attr) {
            return {
                pre: function(scope, element, attr) {
                    var startX = 0,
                        startY = 0,
                        x = 0,
                        y = 0;
                    element.css({
                        position: 'relative',
                        border: '1px solid rgb(206, 199, 199)',
                        cursor: 'pointer'
                    });
                    element.on('mousedown', function(event) {
                        event.preventDefault();
                        startX = event.pageX - x;
                        startY = event.pageY - y;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });
                    function mousemove(event) {
                        y = event.pageY - startY;
                        x = event.pageX - startX;
                        element.css({
                            top: y + 'px',
                            left: x + 'px'
                        });
                    }
                    function mouseup() {
                        $document.off('mousemove', mousemove);
                        $document.off('mouseup', mouseup);
                    }
                }
            };
        }
    };
});
