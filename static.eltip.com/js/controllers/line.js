app.controller('app', function($scope, $timeout) {
    $scope.legend = ["上传", "下载"];
    $scope.item = [];
    $scope.data=[];


    $scope.legendPie = ['进行中', '游戏', '办公', '视频广告', '搜索引擎','test'];
    $scope.dataPie = [];

    var item_length=24*60/10;
    $scope.getData = function() {
        for (var i = 0; i <  $scope.legend.length; i++) {
            var tempArr = [];
            for (var j = 0; j <item_length; j++) {  //这里要注意，因为时间是根据折线数据算出来的，所有折线数据是固定的，
                var value = Math.floor((Math.random() * 100)); //生成随机数，作为对应软件的值
                tempArr.push(value);
            }
            $scope. data.push(tempArr);
        }
        var h = 0,
            m = 0;
        for (var i = 0; i <item_length; i++) {

            //0.10   0.20  0.30  0.40  0.50  1.00 这样类推
            $scope.item.push((h > 9 ? h : '0' + h) + ':' + (m > 9 ? m : '0' + m));
            m += 10;//时间最小刻度为10分钟
            if (m > 50) {     //如果大于50了，就加一个小时
                m = 0;
                h += 1;
            }
        }

        $scope.dataPie = [];
        for (var i = 0; i < $scope.legendPie.length; i++) {
            var value = Math.floor((Math.random() * 100)); //生成随机数，作为对应软件的值
            var obj = {};
            obj.value = value;
            obj.name = $scope.legendPie[i];
            $scope.dataPie.push(obj);
        }
    }
    $scope.getData();

});


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


            var dataStr="{\"down\":[0,0,0],\"up\":[0,0,0,0,0]}";
            var data = angular.fromJson(dataStr);//把JSON字符串转换成对象



            for(var i=0;i<100;i++){
                var value = Math.floor((Math.random() * 100)); //生成随机数，作为对应软件的值
                data.down.push(value);

                var value = Math.floor((Math.random() * 100)); //生成随机数，作为对应软件的值
                data.up.push(value);
            }


            var timeData = [];
            var h = 0,
                m = 0;
            for (var i = 0; i < data.down.length; i++) {
                m += 10;
                if (m > 50) {
                    m = 0;
                    h += 1;
                }
                timeData.push((h > 9 ? h : '0' + h) + ':' + (m > 9 ? m : '0' + m));
            }

            var option = {

                title : {
                    text: '上传下载情况',
                    subtext: '天幕网络'
                },

                // 提示框，鼠标悬浮交互时的信息提示
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                // 图例
                legend: {
                    data: $scope.legend
                },

                toolbox: {
                    show : true,
                    feature : {
                        /*mark : {show: true},*/
                        /* dataView : {show: true, readOnly: false},*/
                        /*  magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},*/
                        /* restore : {show: true},*/
                        /*  saveAsImage : {show: true}*/
                    }
                },
                calculable : true,

                dataZoom : {
                    show : true,
                    realtime : true,
                    y: 25,
                    height: 20,
                    start : 50

                },

                grid: {
                    y2: 80  //轴与图的间距高度
                },
                // 横轴坐标轴
                xAxis: [{
                    type: 'category',
                    boundaryGap : false,
                    data: timeData,
                    splitNumber:10,
                    axisLine: {onZero: false}
                }],
                // 纵轴坐标轴
                yAxis: [{
                    type: 'value'
                }],
                /*  // 数据内容数组
                 series: function() {
                 var serie = [];
                 for (var i = 0; i < $scope.legend.length; i++) {
                 var item = {
                 name: $scope.legend[i],
                 type: 'line',
                 symbolSize: 5,//原点大小
                 showAllSymbol: true,
                 smooth:true,
                 itemStyle: {normal: {areaStyle: {type: 'default'}}},
                 data: $scope.data[i]
                 };
                 serie.push(item);
                 }
                 return serie;
                 }()*/

                /*  // 数据内容数组
                 series: function() {
                 var serie = [];
                 for (var i = 0; i < $scope.legend.length; i++) {
                 var item = {
                 name: $scope.legend[i],
                 type: 'line',
                 symbolSize: 5,//原点大小
                 showAllSymbol: true,
                 smooth:true,
                 itemStyle: {normal: {areaStyle: {type: 'default'}}},
                 data: $scope.data[i]
                 };
                 serie.push(item);
                 }
                 return serie;
                 }()*/


                series : [
                    {
                        name:'上传流量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {color:'rgba(35,183,229,0.7)',type: 'default'}}},
                        data:data.up,
                        symbolSize:2//原点大小

                    },
                    {
                        name:'下载流量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {color:'rgba(245,162,43,0.7)',type: 'default'}}},
                        data:data.down,
                        symbolSize:2//原点大小
                    }


                ]


            };
            var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
            myChart.setOption(option);
            setInterval(function() {
                var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                myChart.setOption(option);
            }, 10000 * 3);


        }
    };
});



app.directive('pie', function() {
    return {
        scope: {
            id: "@",
            legend: "=",
            item: "=",
            data: "="
        },
        restrict: 'E',
        template: '<div style="height:295px;"></div>',
        replace: true,
        link: function($scope, $element, $attrs) {
            option = {
                title: {
                    text: '办公行为分析',
                    subtext: '天幕',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: $scope.legend
                },
                /*toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },*/
                calculable: true,
                series: [
                    {
                    name: '用户访问',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: $scope.data
                }

                ]
            };

            // 为echarts对象加载数据
            var myChart = echarts.init(document.getElementById('mainPin'));
            myChart.setOption(option);



        }
    };
});