if (!directive) {
    var directive = angular.module('directive', []);
}
directive.directive('placeholder', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, e, attr, ctrl) {
            try {
                var str = '<style>.placeholder-style{color: gray;};</style>';
                if (document.getElementsByClassName('placeholder-style').length === 0) {
                    angular.element(document).find('head').append(str);
                }
                var isIE = function(min, max) {
                    var navAgent = window.navigator.userAgent.toLowerCase(),
                        flag;
                    if (navAgent.indexOf('msie') !== -1) {
                        var IE = navAgent.match(/msie\s([0-9]*)/);
                        flag = (arguments.length === 0) ? IE[1] :
                            (arguments.length === 1) ? (parseInt(IE[1]) === min) :
                            (IE[1] >= min && IE[1] <= max) ? IE[1] : false;
                    }
                    return flag;
                };
                if (isIE(8, 9)) {
                    if (!ctrl.$modelValue && ctrl.$modelValue !== false && ctrl.$modelValue !== 0) {
                        e.val(attr.placeholder);
                        e.addClass('placeholder-style');
                    }
                    try {
                        ctrl.$setViewValue();
                    } catch (err) {}
                    //对password框的特殊处理
                    if (attr.type === 'password') {
                        e.removeClass('placeholder-style');
                        var temId = new Date().getTime();
                        var s = attr.style || '';
                        var c = attr.class || '';
                        e.after('<input id="' + temId +
                            '" type="text" value="' + attr.placeholder +
                            '" autocomplete="off" style="' + s +
                            '" class="' + c +
                            ' placeholder-style" />');
                        var pwd = e.next();
                        pwd.css('display', 'inline-block');
                        e.css('display', 'none');
                        pwd.on('focus', function() {
                            e.css('display', 'inline-block');
                            pwd.css('display', 'none');
                            e.on('focus', function() {});
                        });
                    }
                    var isFocus = false;
                    e.on('focus', function() {
                        isFocus = true;
                        if (attr.type === 'password') {
                            if (!ctrl.$modelValue) {
                                e.val('');
                            }
                        } else {
                            e.removeClass('placeholder-style');
                            if (e.val() === attr.placeholder && (!ctrl.$modelValue || ctrl.$modelValue === attr.placeholder)) {
                                e.val('');
                            }
                        }
                    });
                    e.on('blur', function() {
                        isFocus = false;
                        if (attr.type === 'password') {
                            if (e.val() === '') {
                                pwd.css('display', 'inline-block');
                                e.css('display', 'none');
                            }
                        } else {
                            if (!e.val() && !ctrl.$modelValue) {
                                e.val(attr.placeholder);
                                e.addClass('placeholder-style');
                            }
                        }
                    });
                    scope.$watch(function() {
                        return ctrl.$modelValue;
                    }, function(v) {
                        if (v) {
                            e.removeClass('placeholder-style');
                        } else if (isFocus === false) {
                            e.val(attr.placeholder);
                            e.addClass('placeholder-style');
                        }
                    });
                }
            } catch (err) {}
        }
    };
});
