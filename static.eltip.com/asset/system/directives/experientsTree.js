/**
 * Created by gengzy on 2016/4/6.
 */

angular.module('app')
    .directive('experientsTree', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            zNodes: '=',
            clickItem : "&",
            link: function ($scope, element, attrs, ngModel) {
                var setting = {
                    view: {
                        showLine : false,
                        selectedMulti: false
                    },
                    data: {
                        simpleData: {
                            enable:true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: ""
                        }
                    }
                    ,
                    callback: {
                        onClick: zTreeOnClick
                    }
                };
                function zTreeOnClick(event, treeId, treeNode) {
                    if(!treeNode.isParent){
                        var node = treeNode.getParentNode();
                        $scope.clickItem(treeNode.eID,treeNode.name,node.name)
                    }
                };
                var zNodes=$scope.zNodes;
                var newCount = 1;
                $.fn.zTree.init(element, setting, zNodes);
            }
        };
    });