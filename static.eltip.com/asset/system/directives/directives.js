/**
 * Created by gengzy on 2016/4/6.
 */

angular.module('app')
    .directive('paper', function () {
        return {
            restrict: 'E',
            templateUrl: 'asset/system/view/question/paper.html',
            replace: true
        };
    });