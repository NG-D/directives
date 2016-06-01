try {
    if (typeof directive !== 'object') {
        var directive = angular.module('directive', []);
    }
} catch (e) {
    var directive = angular.module('directive', []);
}
directive.directive('lRipple', function() {
    return {
        restrict: 'ACE',
        link: function($scope, e, attr) {
            e.addClass('ripple-p');
            e.on('click', function(event) {
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
                setTimeout(function() {
                    ripple.classList.remove('show');
                }, 2000);
            });
        }
    };
});
