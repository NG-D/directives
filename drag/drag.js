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
directive.directive('drag', ['$document', function($document) {
    return {
        restrict: 'ACE',
        replace: true,
        scope: {
            c: "=",
        },
        compile: function(element, attr) {
            return {
                pre: function(scope, element, attr) {
                    try {
                        var startX = 0,
                            startY = 0,
                            x = 0,
                            y = 0;
                        var temElement = element;
                        scope.dragClass = '';
                        scope.dragAll = false;
                        element.css({
                            position: 'relative',
                        });

                        function init() {
                            if (scope.c) {
                                angular.forEach(scope.c, function(value, key) {
                                    scope[key] = value;
                                });
                            }

                            if (scope.dragClass) {
                                var childrenLen = element.children().length;
                                var noClass = true;
                                for (var i = 0; i < childrenLen; i++) {
                                    temElement = angular.element(element.children()[i]);
                                    if (temElement.hasClass(scope.dragClass)) {
                                        lisent(scope.dragClass);
                                        noClass = false;
                                        if (!scope.dragAll) {
                                            return;
                                        }
                                    }
                                }
                                if (noClass) {
                                    lisent(false);
                                }
                            } else {
                                lisent(scope.dragClass);
                            }
                        }

                        function lisent(argType) {
                            if (!argType) {
                                element.css({
                                    cursor: 'all-scroll'
                                });
                                element.on('mousedown', function(event) {
                                    event.preventDefault();
                                    startX = event.pageX - x;
                                    startY = event.pageY - y;
                                    $document.on('mousemove', mousemove);
                                    $document.on('mouseup', mouseup);
                                });
                            } else {
                                temElement.css({
                                    cursor: 'all-scroll'
                                });
                                temElement.on('mousedown', function(event) {
                                    event.preventDefault();
                                    startX = event.pageX - x;
                                    startY = event.pageY - y;
                                    $document.on('mousemove', mousemove);
                                    $document.on('mouseup', mouseup);
                                });
                            }
                        }

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
                        init();
                    } catch (e) { console.log(e); }
                }
            };
        }
    };
}]);
