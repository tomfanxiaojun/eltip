/**
 * Created by Administrator on 2017/3/11.
 */
'use strict';
app.controller('PaperController',  function($scope,$state,$modal, $log,questionService) {

    $scope.queryObj={}
    $scope.viewpaper=false;
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
    $scope.errorObj={
        error:false,
        msg:''
    }
    $scope.paper={}
    $scope.setError=function(error,msg){
        $scope.errorObj={
            error:error,
            msg:msg
        }
    }
    $scope.onSearch=function(){
        $scope.get_papers();
    }
    $scope.get_papers = function() {
        $scope.questions=[];
        questionService.get_papers($scope.queryObj).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.papers=rep.data.data;
                }else {
                    $scope.papers=rep.data.data;
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
    $scope.get_papers();
    $scope.getCount=function(paper){
        var count =0;
        paper.types.forEach(function(p){
            count=count+ p.count;
        })
        return count;
    }
    $scope.clickItem =function (id,name,parentName) {
        $scope.setError(false)
        $scope.queryObj.exprimentId=id;
        $scope.queryObj.exprimentName=name;
        $scope.queryObj.coourseName=parentName;
        $scope.get_papers()
    }
    $scope.get_question_types = function() {
        questionService.get_question_types().error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.questionTypes=rep.data.data;
                    $scope.questionTypes.forEach(function(t){
                        t.checked=false;
                        t.type= t.id;
                        delete t.id;
                    })
                    $scope.getCountScore();
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
    $scope.onAdd=function(){
        if(!$scope.queryObj.exprimentId){
            $scope.setError(true,'请选择一个实验！')
            return;
        }
        $scope.setError(false)
        $scope.add=true;
    }
    $scope.$watch('questionTypes', function(newval,oldval){
        if(newval!=oldval){
            $scope.getCountScore();
        }
    },true);
    $scope.getCountScore=function(){
        var items=$scope.questionTypes.filter(function(e){
            return e.checked==true;
        })
        var count=0;
        items.forEach(function(e){
            if(e.count&& e.score){
                count=count+ e.count* e.score;
            }
        })
       $scope.paper.total=count;
    }
    $scope.choicePaper=function( q){
        q.deleted ? q.deleted=false:q.deleted=true;
    }
    $scope.deletePaper=function(){
        var ids=[]
        $scope.papers.forEach(function(e,i){
            if(e.deleted){
                ids.push(e.id)
            }
        })
        questionService.delete_papers(ids).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                $scope.get_papers();
            }else {
                console.log("error")
            }
        });
    }
    $scope.addPaper=function(){
        var items=$scope.questionTypes.filter(function(e){
            return e.id||e.checked==true;
        })
        $scope.paper.types=items;
        if(!$scope.paper.title){
            $scope.setError(true,'请输入试卷题目!');
            return ;
        }
        if(!$scope.paper.passScore){
            $scope.setError(true,'请输入及格分数!');
            return ;
        }
        if(!$scope.paper.testCount){
            $scope.setError(true,'请输入测试次数!');
            return ;
        }
        if(!$scope.paper.total||$scope.paper.total==0){
            $scope.setError(true,'请选择题目类型，并输入相关数据!');
            return ;
        }
        if($scope.paper.total<$scope.paper.passScore){
            $scope.setError(true,'及格分数不能大于总分!');
            return ;
        }
        !$scope.paper.exprimentId ?$scope.paper.exprimentId= $scope.queryObj.exprimentId:null;
        questionService.add_paper($scope.queryObj.exprimentId,$scope.paper).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                if(rep.data.success){
                    $scope.papers=rep.data.data;
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
    $scope.edit=function(item){
        //$scope.paper=angular.copy(item);
        $scope.paper=item;
        $scope.paper.types.forEach(function(i){
            $scope.questionTypes.forEach(function(y){
                if(y.type== i.type){
                    y.checked=true;
                    y.count= i.count;
                    y.score= i.score;
                    y.id= i.id;
                }
            })
        })
        //questionTypes
        //$scope.optionsList=angular.copy(question.questionItems);
        $scope.add=true;
    }
    $scope.checkNumber=function(type,value){
        !/^[0-9]*$/.test(type[value]) ? type[value]='':null;
    }
    $scope.resetData=function(){
        $scope.add=false;
        $scope.paper={};
        $scope.questionTypes.forEach(function(e){
            e.checked=false;
            e.count='';
            e.score='';
        })
    }
    $scope.onCancel=function(){
        $scope.resetData();
    }
    $scope.currentPaper={};
    $scope.view=function(p){
        $scope.viewpaper=true;
        $scope.loading=true;
        $scope.currentPaper=p;
        $scope.currentPaper.items=[];
        questionService.view_papers(p.id).error(function(){
            console.log("后台报错");
        }).then(function(rep){
            if(rep.statusText === 'OK'){
                var qs= rep.data.data;
                $scope.currentPaper.qTotalScore=0;
                $scope.currentPaper.qCount=0;
                Object.keys(qs).forEach(function(key){
                    !$scope.currentPaper.qCount?$scope.currentPaper.qCount=0:null;
                    !$scope.currentPaper.qTotalScore? $scope.currentPaper.qTotalScore=0:null;
                    $scope.currentPaper.qCount= $scope.currentPaper.qCount+qs[key].length;
                    var tScore={}
                    $scope.currentPaper.types.forEach(function(type){
                        if(type.questionType.id==key){
                            $scope.currentPaper.qTotalScore= $scope.currentPaper.qTotalScore+qs[key].length
                            *type.score;
                            tScore[type.type]=type.score;
                        }
                    })
                    $scope.questionTypes.forEach(function(t){
                        if(t.type==key){
                            if(t.type==4){
                                qs[key].forEach(function(i){
                                    i.options= i.title.split(/\$\[填空 \d*?\]/)
                                })
                            }
                            $scope.currentPaper.items.push({
                                type:t,
                                qitems:qs[key],
                                qitemsTotalScore: tScore[key]*qs[key].length,
                                qitemsCount:qs[key].length,
                                qscore: tScore[key]
                            })
                        }
                    })
                    $scope.loading=false;
                })

            }else {
                console.log("error")
            }
        });
        $scope.goBack=function(){
            $scope.viewpaper=false;
        }
    }
});