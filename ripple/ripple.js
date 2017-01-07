'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

try {
    if ((typeof directive === 'undefined' ? 'undefined' : _typeof(directive)) !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lRipple', function () {
    return {
        restrict: 'ACE',
        link: function link($scope, e, attr) {
            //cssStart
            var cssTpl = '<style type="text/css" id="tpl-ripple">.ripple-p{border:none;outline:0;cursor:pointer;overflow:hidden;display:inline-block;-webkit-transform:translate(0);-moz-transform:translate(0);-ms-transform:translate(0);-o-transform:translate(0);transform:translate(0)}.ripple{position:absolute;background:rgba(0,0,0,.5);border-radius:100%;-webkit-transform:scale(0);-moz-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);pointer-events:none}.ripple.show{-webkit-animation:ripple 1s ease-out;-moz-animation:ripple 1s ease-out;-o-animation:ripple 1s ease-out;animation:ripple 1s ease-out}@-webkit-keyframes ripple{to{-webkit-transform:scale(2);transform:scale(2);opacity:0}}@-moz-keyframes ripple{to{-moz-transform:scale(2);transform:scale(2);opacity:0}}@-o-keyframes ripple{to{-o-transform:scale(2);transform:scale(2);opacity:0}}@keyframes ripple{to{-webkit-transform:scale(2);-moz-transform:scale(2);-o-transform:scale(2);transform:scale(2);opacity:0}}</style>';
            if (!$("#tpl-ripple").length) {
                $("head").prepend(cssTpl);
            }
            //cssEnd
            e.addClass('ripple-p');
            e.on('click', function (event) {
                console.log(e);
                console.log(window.getComputedStyle(e[0])['background-color']);
                var css = {
                    position: window.getComputedStyle(e[0]).position,
                    bgColor: window.getComputedStyle(e[0])['background-color']
                };
                var target = e[0];
                var rect = target.getBoundingClientRect();
                var ripple = target.querySelector('.ripple');
                if (!css.position || css.position === 'static') {
                    e.css('position', 'relative');
                }
                if (!ripple) {
                    ripple = document.createElement('rip');
                    ripple.className = 'ripple';
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                    if (css.bgColor) {
                        // ripple.style['background-color'] = css.bgColor;
                    }
                    target.appendChild(ripple);
                }
                ripple.classList.remove('show');
                var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
                var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
                ripple.style.top = top + 'px';
                ripple.style.left = left + 'px';
                ripple.classList.add('show');
                setTimeout(function () {
                    ripple.classList.remove('show');
                }, 2000);
            });
        }
    };
});