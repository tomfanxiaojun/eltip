/**
 * Created by Administrator on 2017/3/11.
 */
'use strict';
app.controller('QuestionController',  function($scope,$state,$modal, $log,questionService) {
    $scope.queryObj = {
        exprimentId:null
    };
    $scope.questions=[];
    $scope.item={}
    $scope.items=[];
    $scope.errorObj={
        error:false,
        msg:''
    }
    $scope.add=false;
    $scope.edit=false;
    $scope.exprimentID=0;
    $scope.exprimentName='';
    $scope.coourseName='';
    $scope.questionTypes=[];
    $scope.right=true;
    $scope.questionResult={
        id:0
    };
    $scope.opinion={
        id:1
    }
    $scope.get_question_types = function() {
        $scope.questions=[];
        questionService.get_question_types().error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.questionTypes=rep.data.data;
                    $scope.question={
                        type:$scope.questionTypes[0].id
                    };
                }else {
                    $scope.errorObj={
                        error:true,
                        msg:rep.data.message
                    }
                }
            }else {
                console.log("error")
            }
        });
    };
    $scope.get_question_types();
    $scope.zNodes =[
        { id:0, pId:-1, name:"全部", open:true,iconOpen:"css/zTreeStyle/img/diy/root_open.png", iconClose:"css/zTreeStyle/img/diy/root_close.png"},
        { id:1, pId:0, name:"电子实验题", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
        { id:11, pId:1,eID:1, name:"示波器",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:12, pId:1,eID:2, name:"电阻",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:13, pId:1,eID:3, name:"电流",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:2, pId:0, name:"专业实验题", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
        { id:21, pId:2,eID:4, name:"数字电路",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:22, pId:2,eID:5, name:"模拟电路",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:23, pId:2,eID:6, name:"集成电路",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:3, pId:0, name:"物理实验题", open:true,icon:"css/zTreeStyle/img/diy/group.png"},
        { id:31, pId:3,eID:7, name:"质量",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:32, pId:3,eID:8, name:"光学",icon:"css/zTreeStyle/img/diy/group.png"},
        { id:33, pId:3,eID:9, name:"电磁波",icon:"css/zTreeStyle/img/diy/group.png"}
    ];
    $scope.get_questions = function() {
        $scope.questions=[];
        questionService.get_questions($scope.queryObj).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.questions=rep.data.data;
                }else {
                    $scope.questions=rep.data.data;
                    $scope.errorObj={
                        error:true,
                        msg:rep.data.message
                    }
                }

            }else {
                console.log("error")
            }
        });
    };
    $scope.get_questions();
    $scope.choiceQuestion=function( q){
        q.deleted ? q.deleted=false:q.deleted=true;
    }
    $scope.deleteQuestion=function(){
        var ids=[]
        $scope.questions.forEach(function(e,i){
            if(e.deleted){
                ids.push(e.id)
            }
        })
        questionService.delete_questions(ids).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                $scope.get_questions();

            }else {
                console.log("error")
            }
        });
    }
    $scope.clickItem =function (id,name,parentName) {
        $scope.setError(false)
        $scope.queryObj.exprimentId=id;
        $scope.exprimentID=id;
        $scope.question.exprimentId=id;
        $scope.exprimentName=name;
        $scope.coourseName=parentName;
        $scope.get_questions()
    }
    $scope.onAdd=function(){
        if(!$scope.queryObj.exprimentId){
            $scope.setError(true,'请选择一个实验！')
            return;
        }
        $scope.setError(false)
        $scope.add=true;
    }
    $scope.showItemsPanel=false;
    $scope.onCancel=function(){
        $scope.resetData();
    }
    $scope.setError=function(error,msg){
        $scope.errorObj={
            error:error,
            msg:msg
        }
    }
    $scope.addItem=function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13&&$scope.item.name){
            if($scope.item.id){
                $scope.question.questionItems.forEach(function(item,i){
                    if(item.id===$scope.item.id){
                        $scope.question.questionItems[i]=angular.copy($scope.item)
                    }
                })
            }else {
                !$scope.question.questionItems?$scope.question.questionItems=[]:null;
                var arr=$scope.question.questionItems.filter(function(i){
                       return  i.name==$scope.item.name
                    })
                if(arr.length<1){
                    $scope.question.questionItems.push( angular.copy($scope.item))
                }

            }
            $scope.item={};
        }

    }
    $scope.resetData=function(){
        // 重置数据
        $scope.question={ type:$scope.questionTypes[0].id};
        $scope.items=[];
        $scope.add=false;
        $scope.showItemsPanel=false;
    }
    $scope.isActiveAnswer=function(item){
        if($scope.question.type==1){
            if(item.id){
                return item.id==$scope.questionResult.id ?  true :  false;
            }else{
                return item.name==$scope.questionResult.id ?  true :  false;
            }

        }else {
            if(item.isTure==1){
                return true;
            }
        }
        return false;
    }
    $scope.optionsList=[];
    $scope.onAddOptions=function(){
       ! $scope.question.questionItems?$scope.question.questionItems=[]:null;
        var o={};
        o.name='$[填空 '+ ($scope.question.questionItems.length+1)+']'
        $scope.question.questionItems.push(o)
        $scope.question.title=$scope.question.title+ o.name;
    }
    $scope.addQuestion=function(){
        $scope.setError(false);
        if(!$scope.question.title){
            $scope.setError(true,'请输入问题标题.');
            return ;
        }
        if($scope.question.type==1 ||$scope.question.type==2){
            // 单选题和多选题
            if($scope.question.questionItems.length<2){
                $scope.setError(true,'问题选项不能低于两个，请维护问题选项!');
                return ;
            }
            var answerCount=0;

            //if($scope.question.type==1 && $scope.questionResult.id){
            //    $scope.setError(true,'必须有一个选项是正确答案!');
            //    return ;
            //}

            $scope.question.questionItems.forEach(function(e,i){
                if($scope.question.type===1){
                    if(e.id){
                        if(e.id==$scope.questionResult.id){
                            e.isTure=1;
                        }else{
                            e.isTure=0;
                        }
                    }else {
                        if(e.name==$scope.questionResult.id){
                            e.isTure=1;
                        }else{
                            e.isTure=0;
                        }
                    }

                }else{
                    if(e.isTure){
                        e.isTure=1;
                        answerCount++;
                    }else {
                        e.isTure=0;
                    }
                }

            })

            if(answerCount>1 &&$scope.question.Type ===  1 ){
                $scope.setError(true,'单选题只能有一个正确答案!');
                return ;
            }
        }
        if($scope.question.type==3){
            //判断题
            $scope.items=[]
            if( $scope.opinion.id==1){
                $scope.items.push({
                    name:'正确',
                    isTure:1
                })
                $scope.items.push({
                    name:'错误',
                    isTure:0
                })
            }else {
                $scope.items.push({
                    name:'正确',
                    isTure:0
                })
                $scope.items.push({
                    name:'错误',
                    isTure:1
                })
            }
            if($scope.question.id){
                $scope.question.questionItems.forEach(function(item){
                    if(item.name=='正确'){
                        item.isTure=$scope.items[0].isTure;
                    }else {
                        item.isTure=$scope.items[1].isTure;
                    }
                })
            }else {
                $scope.question.questionItems= $scope.items;
            }

        }
        //if($scope.question.type==4){//判断题
        //    $scope.question.questionItems=$scope.optionsList;
        //}
       !$scope.question.exprimentId ?$scope.question.exprimentId= $scope.exprimentID:null;
        questionService.add_question($scope.exprimentId,$scope.question).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.questions=rep.data.data;
                    $scope.resetData();
                }else {
                    $scope.errorObj={
                        error:true,
                        msg:rep.data.message
                    }
                }
            }else {
                console.log("error")
            }
        });
    }
    $scope.removeItem=function(item){
       var index=  $scope.question.questionItems.indexOf(item);
        if(item.id){
            questionService.delete_question_item(item.id).error(function(){
                console.log("后台报错");
            }).then(function(rep){
                if(rep.statusText === 'OK'){
                    $scope.question.questionItems.splice(index,1);
                    if($scope.question.type==4){
                        $scope.question.title.replace(item.name,'')
                    }

                }else {
                    console.log("error")
                }
            });
        }else {
            $scope.question.questionItems.splice(index,1);
            if($scope.question.type==4){
                $scope.question.title.replace(item.name,'')
            }
        }

    }
    $scope.editItem=function(item){
        $scope.item=angular.copy(item);
    }
    var ModalInstanceCtrl = function($scope, $modalInstance, question) {
        $scope.question = question;

        $scope.ok = function() {
            $modalInstance.close($scope.selected);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.edit=function(question){
        $scope.question=question;
        $scope.question.questionItems.forEach(function(i){
            if(i.isTure===1){
                $scope.questionResult.id= i.id;
            }
        })
        //$scope.optionsList=angular.copy(question.questionItems);
        $scope.add=true;
        $scope.showItemsPanel=true;
    }
    $scope.view=function(question){
        if(question.type ===4){
            question.inputs=question.title.split(/\$\[填空 \d*?\]/);
        }
        var modalInstance = $modal.open({
            templateUrl : 'viewQuestion.html',
            controller : ModalInstanceCtrl,
            resolve : {
                question : function() {
                    return question;
                }
            }
        });
        modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
            console.log('modal is opened');
        });
        modalInstance.result.then(function(result) {
            console.log(result);
        }, function(reason) {
            console.log(reason);// 点击空白区域，总会输出backdrop
            // click，点击取消，则会暑促cancel
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
})
;