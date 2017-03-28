
skycanopy.directive('line', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:302px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs,TerminalManageCtr) {
            $scope.$on('sevenData', function (event,data) {
               var sevenData=data;
                var option = {
                    backgroundColor: 'rgba(0,0,0,0)',
                    title : {
                        text: '七天在线状态',
                        textStyle: {
                            fontFamily: 'Arial',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontColor: '#993366'
                        },
                    },
                    // 提示框，鼠标悬浮交互时的信息提示
                    tooltip: {
                        trigger: 'axis',
                        formatter: "7天在线 : <br/>{b}号 : {c}在线"
                    },
                    // 图例
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [

                        {
                            type : 'category',
                            axisLine: {onZero: false},
                            axisLabel: {
                                formatter: '{value}'
                            },
                            boundaryGap : false,

                            data: sevenData.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],

                    grid: {
                        x:30,
                        x2:30,
                        y:30,
                        y2: 30  //轴与图的间距高度
                    },
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    width: 3,
                                    shadowColor: 'rgba(0,0,0,0.4)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 10
                                }
                            },
                            data:sevenData.online
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                myChart.setOption(option);
            });
        }
    };
});

skycanopy.directive('pie', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:125px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {
            $scope.$on('todayStatus', function (event,data) {
                var labelTop = {
                    normal : {
                        color :'#32CD32',
                        label : {
                            show : false,
                            position : 'center',
                            formatter : '{b}',
                            textStyle: {
                                baseline : 'bottom'
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                var labelTop2 = {
                    normal : {
                        color :'#33CCFF',
                        label : {
                            show : false,
                            position : 'center',
                            formatter : '{b}',
                            textStyle: {
                                baseline : 'bottom'
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                var labelTop3 = {
                    normal : {
                        color :'#FF9933',
                        label : {
                            show : false,
                            position : 'center',
                            formatter : '{b}',
                            textStyle: {
                                baseline : 'bottom'
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                var labelFromatter = {
                    normal : {
                        label : {
                            formatter : function (params){
                                return 100 - params.value + '%'

                            },
                            textStyle: {
                                color:'black',
                                baseline : 'middle'
                            }
                        }
                    },
                }
                var labelBottom = {
                    normal : {
                        color: '#D3D3D3',
                        label : {
                            show : true,
                            position : 'center'
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
                var radius = [30, 35];
                option1 = {
                    legend: {
                        x : 'center',
                        y : 'center',
                        data:[]
                    },

                    toolbox: {
                        show : false,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: false,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        width: '5%',
                                        height: '10%',
                                        itemStyle : {
                                            normal : {
                                                label : {
                                                    formatter : function (params){
                                                        return 'other\n' + params.value + '%\n'
                                                    },
                                                    textStyle: {
                                                        baseline : 'middle'
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            type : 'pie',
                            center : ['50%', '50%'],
                            radius : radius,
                            x: '0%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:100-data.online_count, itemStyle : labelBottom},
                                {name:'在线', value:data.online_count,itemStyle : labelTop}
                            ]
                        },
                    ]
                };

                option2 = {
                    legend: {
                        x : 'center',
                        y : 'center',
                        data:[]
                    },

                    toolbox: {
                        show : false,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: false,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        width: '5%',
                                        height: '100%',
                                        itemStyle : {
                                            normal : {
                                                label : {
                                                    formatter : function (params){
                                                        return 'other\n' + params.value + '%\n'
                                                    },
                                                    textStyle: {
                                                        baseline : 'middle'
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            type : 'pie',
                            center : [ '50%', '50%'],
                            radius : radius,
                            x:'20%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:100-data.offline, itemStyle : labelBottom},
                                {name:'离线', value:data.offline,itemStyle : labelTop2}
                            ]
                        },
                    ]
                };

                option3 = {
                    legend: {
                        x : 'center',
                        y : 'center',
                        data:[ ]
                    },

                    toolbox: {
                        show : false,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: false,
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        width: '5%',
                                        height: '10%',
                                        itemStyle : {
                                            normal : {
                                                label : {
                                                    formatter : function (params){
                                                        return 'other\n' + params.value + '%\n'
                                                    },
                                                    textStyle: {
                                                        baseline : 'middle'
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            type : 'pie',
                            center : ['50%', '50%'],
                            radius : radius,
                            x:'40%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:100-data.except_count, itemStyle : labelBottom},
                                {name:'异常', value:data.except_count,itemStyle : labelTop3}
                            ]
                        },
                    ]
                };

                // 为echarts对象加载数据
                var myChart = echarts.init(document.getElementById('mainPin1'));
                myChart.setOption(option1);
                var myChart = echarts.init(document.getElementById('mainPin2'));
                myChart.setOption(option2);
                var myChart = echarts.init(document.getElementById('mainPin3'));
                myChart.setOption(option3)
            });
        }
    };
})
