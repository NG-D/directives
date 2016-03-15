(function () {
    var tmpl = [
    '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">',
        '<div class="pswp__bg"></div>',
        '<div class="pswp__scroll-wrap">',
            '<div class="pswp__container">',
                '<div class="pswp__item"></div>',
                '<div class="pswp__item"></div>',
                '<div class="pswp__item"></div>',
            '</div>',
            '<div class="pswp__ui pswp__ui--hidden">',
                '<div class="pswp__top-bar">',
                    '<div class="pswp__counter"></div>',
                    '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>',
                    '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>',
                    '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>',
                    '<div class="pswp__preloader">',
                        '<div class="pswp__preloader__icn">',
                          '<div class="pswp__preloader__cut">',
                            '<div class="pswp__preloader__donut"></div>',
                          '</div>',
                        '</div>',
                    '</div>',
                '</div>',
                '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">',
                '</button>',
                '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">',
                '</button>',
                '<div class="pswp__caption">',
                    '<div class="pswp__caption__center"></div>',
                '</div>',
            '</div>',
        '</div>',
    '</div>',
    ].join('');

    angular.module('app').directive('gallery', function () {
        return {
            restrict: 'EA',
            scope: {
                key: '@',
                list: '=',
                prefix: '='
            },
            link: function (scope, element, attr) {
                if (!angular.element('.pswp').length) {
                    var e = angular.element(tmpl);
                    angular.element('body').append(e);
                }
                element.on('click', 'li', function (e) {
                    var pswpElement = angular.element('.pswp').get(0);
                    var items = [];
                    var index = element.find('li').index(this);
                    angular.forEach(scope.list, function (item) {
                        if (scope.key) {
                            items.push({src: scope.prefix + item[scope.key], w: 20, h:20});
                        } else {
                            items.push({src: scope.prefix + item, w: 20, h:20});
                        }
                    });
                    var options = {
                        index: index,
                        history: false
                    };
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    e.preventDefault();
                    e.stopPropagation();
                    gallery.init();
                    gallery.listen('close', function () {
                        gallery.destroy();
                    });
                    gallery.listen('imageLoadComplete', function(index, item) {
                        var img = new Image();
                        img.src = item.src;
                        img.onload = function (){
                            item.w = this.width;
                            item.h = this.height;
                            gallery.updateSize(true);
                            img = null;
                        };
                    });
                });
            }
        };
    });
})();