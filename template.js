;(function(){

'use strict';

angular.module('tmpl', []).run(['$templateCache', function($templateCache) {

  $templateCache.put('slide-img/slide-img.html', '<div class="slide-img" ng-class="c.class" ng-style="c.style"><button type="button" ng-mouseenter="play(1)" ng-mouseleave="play()" class="prev" ng-click="prev()"><span><</span></button> <button type="button" ng-mouseenter="play(1)" ng-mouseleave="play()" class="next" ng-click="next()"><span>></span></button><ul ng-style="d.ulStyle"><li ng-repeat="i in imgs track by $index" ng-class="getClass($index)" ng-style="d.liStyle"><img ng-src="{{i}}" alt="$index" ng-style="c.imgStyle"></li></ul></div>');

}]);

})();