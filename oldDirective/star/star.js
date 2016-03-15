module.directive('star', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            n: "=n"
        },
        transclude: true,
        template: "<span class='star'></span>",
        link: function(scope, element, attrs) {

            scope.$watch('n', function(value) {
                if (value === undefined) {
                    return;
                }

                if (!attrs["isrcc"]) {
                    attrs["isrcc"] = "/img/star-gray.png";
                }
                var i = 0;
                var n = Math.floor(scope.n);
                var html = "";
                var count = 0;
                for (i = 0; i < n; i = i + 1) {
                    html += "<img src='" + attrs["isrca"] + "'>";
                    count = count + 1;
                }
                if (scope.n > n) {
                    html += "<img src='" + attrs["isrcb"] + "'>";
                    count = count + 1;
                }
                if (count < 5) {
                    for (i = Math.ceil(scope.n); i < 5; i = i + 1) {
                        html += "<img src='" + attrs["isrcc"] + "'>";
                    }
                }
                element[0].innerHTML = html;
            });
        }
    };
});
