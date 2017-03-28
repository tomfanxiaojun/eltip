/**
 * Created by gengzy on 2016/4/6.
 */

angular.module('app')
    .directive('tree', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs, ngModel) {
            var setting = {
                view: {
                    addHoverDom: addHoverDom,
                    removeHoverDom: removeHoverDom,
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
                },

                edit: {
                    enable: true,
                    editNameSelectAll: true,
                    showRemoveBtn: showRemoveBtn,
                    showRenameBtn: showRenameBtn
                },

                callback: {
                    beforeDrag: beforeDrag,
                    beforeEditName: beforeEditName,
                    beforeRemove: beforeRemove,
                    beforeRename: beforeRename,
                    onRemove: onRemove,
                    onRename: onRename
                }
                /*
                callback: {
                    beforeClick: function(treeId, treeNode) {
                        var zTree = $.fn.zTree.getZTreeObj("tree");
                        if (treeNode.isParent) {
                            zTree.expandNode(treeNode);
                            return false;
                        } else {
                            window.location.href=treeNode.file + ".view";
                            return true;
                        }
                    }
                }
                */
            };

            var zNodes =[
                { id:0, pId:-1, name:"全部", open:true,iconOpen:"css/zTreeStyle/img/diy/root_open.png", iconClose:"css/zTreeStyle/img/diy/root_close.png"},
                { id:1, pId:0, name:"研发部", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
                { id:11, pId:1, name:"研发一部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:12, pId:1, name:"研发二部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:13, pId:1, name:"研发三部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:2, pId:0, name:"市场部", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
                { id:21, pId:2, name:"市场一部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:22, pId:2, name:"市场二部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:23, pId:2, name:"市场三部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:3, pId:0, name:"广州分公司", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
                { id:31, pId:3, name:"市场部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:32, pId:3, name:"行政部",icon:"css/zTreeStyle/img/diy/group.png"},
                { id:33, pId:3, name:"渠道部",icon:"css/zTreeStyle/img/diy/group.png"}
            ];

            var log, className = "dark";
            function beforeDrag(treeId, treeNodes) {
                return false;
            }
            function beforeEditName(treeId, treeNode) {
                className = (className === "dark" ? "":"dark");
                showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.selectNode(treeNode);
            }
            function beforeRemove(treeId, treeNode) {
                className = (className === "dark" ? "":"dark");
                showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.selectNode(treeNode);
                return confirm("确认删除部门：" + treeNode.name + "吗？");
            }
            function onRemove(e, treeId, treeNode) {
                showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
            }
            function beforeRename(treeId, treeNode, newName, isCancel) {
                className = (className === "dark" ? "":"dark");
                showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
                if (newName.length == 0) {
                    alert("节点名称不能为空.");
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    setTimeout(function(){zTree.editName(treeNode)}, 10);
                    return false;
                }
                return true;
            }
            function onRename(e, treeId, treeNode, isCancel) {
                showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
            }
            function showRemoveBtn(treeId, treeNode) {
                var parentTId =  treeNode.parentTId;
                if(parentTId == null) {
                    return false;
                }
                return true;
            }
            function showRenameBtn(treeId, treeNode) {
                var parentTId =  treeNode.parentTId;
                if(parentTId == null) {
                    return false;
                }
                return true;
            }
            function showLog(str) {
                if (!log) log = $("#log");
                log.append("<li class='"+className+"'>"+str+"</li>");
                if(log.children("li").length > 8) {
                    log.get(0).removeChild(log.children("li")[0]);
                }
            }
            function getTime() {
                var now= new Date(),
                    h=now.getHours(),
                    m=now.getMinutes(),
                    s=now.getSeconds(),
                    ms=now.getMilliseconds();
                return (h+":"+m+":"+s+ " " +ms);
            }

            var newCount = 1;
            function addHoverDom(treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                    + "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_"+treeNode.tId);
                if (btn) btn.bind("click", function(){
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"部门" + (newCount++),icon:"css/zTreeStyle/img/diy/group.png"});
                    return false;
                });
            };
            function removeHoverDom(treeId, treeNode) {
                $("#addBtn_"+treeNode.tId).unbind().remove();
            };
            function selectAll() {
                var zTree = $.fn.zTree.getZTreeObj('tree');
                zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
            }

            $.fn.zTree.init(element, setting, zNodes);
            $("#selectAll").bind("click", selectAll);
        }
    };
});