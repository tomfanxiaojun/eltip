app
    // Flot Chart controller
    .controller('app', ['$scope', function($scope) {

        $scope.legend = ['聊天', '游戏', '办公', '视频广告', '搜索引擎','test'];
        $scope.data = [];


    }]);
<!--终端状态统计-->
app.directive('line', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {

            var option = {

                title : {
                    text: '终端状态统计',
                    textStyle: {
                        fontFamily: 'Arial',

                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        color:'rgb(22,170,216)'
                    }

                },
                tooltip : {
                    trigger: 'axis'
                },
              /*  legend: {
                    data:['最高流量','最低流量']
                },*/
                toolbox: {
                    /*  show : true,
                  feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }*/
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} MB'
                        }
                    }
                ],
                series : [
                    {
                        name:'最高流量',
                        type:'line',
                        data:[11, 21, 35, 43, 52, 63, 70],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }



                ]


            };
            var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
            myChart.setOption(option);


        }
    };
});


<!--硬件统计-->
app.directive('linegb', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {

            var option = {

                title : {
                    text: '本周终端流量统计',
                    subtext: '天幕网络'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高流量','最低流量']
                },
                toolbox: {
                    /*  show : true,
                     feature : {
                     mark : {show: true},
                     dataView : {show: true, readOnly: false},
                     magicType : {show: true, type: ['line', 'bar']},
                     restore : {show: true},
                     saveAsImage : {show: true}
                     }*/
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} MB'
                        }
                    }
                ],
                series : [
                    {
                        name:'最高流量',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'最低流量',
                        type:'line',
                        data:[40, 41, 45,50,45,42,40],
                        markPoint : {
                            data : [
                                {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }


                ]


            };
            var myChart = echarts.init(document.getElementById($scope.id), 'mnn');
            myChart.setOption(option);



        }
    };
});

app.directive('twopies', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {
            var option = {

                title : {
                    text: '时间',

                    x:'center',
                    y:'bottom'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    /*data:['聊天','开发','QQ(7小时)','微信（6小时）','RTX（2小时）','MyEclipse（2小时）','webstorm（2小时）','eclipse（2小时）','其他（5小时）']*/
                    data:[]



                },
                calculable : false,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius : [0, 70],

                        // for funnel
                        x: '20%',
                        width: '40%',
                        funnelAlign: 'right',
                        max: 1548,

                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner'
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[

                            {value:679, name:'聊天'},
                            {value:1548, name:'开发', selected:true},
                            {value:335, name:'其他'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : [100, 140],

                        // for funnel
                        x: '60%',
                        width: '35%',
                        funnelAlign: 'left',
                        max: 1048,

                        data:[

                            {value:310, name:'QQ(7小时)'},
                            {value:234, name:'微信（6小时）'},
                            {value:135, name:'RTX（2小时）'},
                            {value:1048, name:'MyEclipse（12小时）'},
                            {value:251, name:'webstorm（2小时）'},
                            {value:147, name:'eclipse（2小时）'},
                            {value:335, name:'其他（5小时）'}
                        ]


                    }
                ]
            };




            var myChart = echarts.init(document.getElementById($scope.id), 'mn');
            myChart.setOption(option);



        }
    };
});

app.directive('twopiess', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {




            var option = {

                title : {
                    text: '流量',

                    x:'center',
                    y:'bottom'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    /* data:['聊天','开发','QQ（50MB）','微信（100MB）','RTX（30MB）','MyEclipse（5MB）','webstorm（15MB）','eclipse（12MB）','其他（50MB）']*/
                    data:[]






                },
                calculable : false,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius : [0, 70],

                        // for funnel
                        x: '20%',
                        width: '40%',
                        funnelAlign: 'right',
                        max: 1548,

                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner'
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[

                            {value:679, name:'聊天'},
                            {value:1548, name:'开发', selected:true},
                            {value:335, name:'其他'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : [100, 140],

                        // for funnel
                        x: '60%',
                        width: '35%',
                        funnelAlign: 'left',
                        max: 1048,

                        data:[

                            {value:310, name:'QQ（50MB）'},
                            {value:234, name:'微信（100MB）'},
                            {value:135, name:'RTX（30MB）'},
                            {value:1048, name:'MyEclipse（50MB）'},
                            {value:251, name:'webstorm（15MB）'},
                            {value:147, name:'eclipse（12MB）'},
                            {value:335, name:'其他（50MB）'}
                        ]


                    }
                ]
            };


            var myChart = echarts.init(document.getElementById($scope.id), 'mns');
            myChart.setOption(option);



        }
    };
});

app.directive('webcountpies', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {

            var option = {

                title : {
                    text: '网页',

                    x:'center',
                    y:'bottom'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    /*data:['聊天','开发','QQ(7小时)','微信（6小时）','RTX（2小时）','MyEclipse（2小时）','webstorm（2小时）','eclipse（2小时）','其他（5小时）']*/
                    data:[]



                },
                calculable : false,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius : [0, 70],

                        // for funnel
                        x: '20%',
                        width: '40%',
                        funnelAlign: 'right',
                        max: 1548,

                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner'
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[

                            {value:679, name:'论坛'},
                            {value:1548, name:'新闻', selected:true},
                            {value:335, name:'其他'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : [100, 140],

                        // for funnel
                        x: '60%',
                        width: '35%',
                        funnelAlign: 'left',
                        max: 1048,

                        data:[

                            {value:310, name:'百家姓(7次)'},
                            {value:234, name:'舌尖上的IT（6次）'},
                            {value:135, name:'轻松一刻（2次）'},
                            {value:1048, name:'腾讯新闻（12次）'},
                            {value:251, name:'新浪微博（2次）'},
                            {value:147, name:'凤凰新闻（2次）'},
                            {value:335, name:'其他（5次）'}
                        ]


                    }
                ]
            };

            var myChart = echarts.init(document.getElementById($scope.id), 'maaa');
            myChart.setOption(option);



        }
    };
});



app.directive('hardwarepies', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:400px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {


            var option = {

                title : {
                    text: '硬件',

                    x:'center',
                    y:'bottom'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    /*data:['聊天','开发','QQ(7小时)','微信（6小时）','RTX（2小时）','MyEclipse（2小时）','webstorm（2小时）','eclipse（2小时）','其他（5小时）']*/
                    data:[]



                },
                calculable : false,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius : [0, 70],

                        // for funnel
                        x: '20%',
                        width: '40%',
                        funnelAlign: 'right',
                        max: 1548,

                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner'
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[

                            {value:679, name:'内存条'},
                            {value:1548, name:'硬盘', selected:true},
                            {value:335, name:'其他'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : [100, 140],

                        // for funnel
                        x: '60%',
                        width: '35%',
                        funnelAlign: 'left',
                        max: 1048,

                        data:[

                            {value:310, name:'4G(7台)'},
                            {value:234, name:'8G（6台）'},
                            {value:135, name:'16G（2台）'},
                            {value:1048, name:'1T（10台）'},
                            {value:251, name:'520MB（20台）'},
                            {value:147, name:'300MB（2台）'},
                            {value:335, name:'其他（5台）'}
                        ]


                    }
                ]
            };

            var myChart = echarts.init(document.getElementById($scope.id), 'maa');
            myChart.setOption(option);



        }
    };
});


