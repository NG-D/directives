angular.module('app').directive('bigImg', function () {
    return function (scope, element, attr) {
        element.on('click', function () {
            var dw = $(element).attr('d-width');
            var dh = $(element).attr('d-height');
            var pswpElement = angular.element('.pswp').get(0);
            var items = [
                {
                    src: this.src,
                    w: dw || 20,
                    h: dh || 20
                }
            ];
            var options = {
                index: 0,
                history: false
            };
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
            gallery.listen('close', function () {
                gallery.destroy();
            });
            if(!dw && !dh){
                gallery.listen('imageLoadComplete', function(index, item) {
                    var img = new Image();
                    img.src = item.src;
                    img.onload = function (){
                        $(element).attr('d-width', this.width);
                        $(element).attr('d-height', this.height);
                        item.w = this.width;
                        item.h = this.height;
                        gallery.updateSize(true);
                        img = null;
                    };
                });
            }
        });
    };
});