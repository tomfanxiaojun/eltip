app
    // Flot Chart controller
    .controller('pieCtrl', ['$scope', function($scope) {
        alert(2);
        $scope.legend = ['聊天', '游戏', '办公', '视频广告', '搜索引擎','test'];
        $scope.data = [];
        $scope.getData = function() {
            $scope.data = [];
            for (var i = 0; i < $scope.legend.length; i++) {
                var value = Math.floor((Math.random() * 100)); //生成随机数，作为对应软件的值
                var obj = {};
                obj.value = value;
                obj.name = $scope.legend[i];
                $scope.data.push(obj);
            }
        }
        $scope.getData();
        // setInterval(function() {
        //     $scope.getData();
        // }, 1000 * 3);


    }]);

app.directive('pie', function() {
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
            option = {
                title: {
                    text: '办公行为分析',
                    subtext: '天幕',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: $scope.legend
                },
                toolbox: {
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
                },
                calculable: true,
                series: [{
                    name: '用户访问',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: $scope.data
                }]
            };

            // 为echarts对象加载数据
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(option);

            setInterval(function() {
                var myChart = echarts.init(document.getElementById('main'));
                myChart.setOption(option);
            }, 1000 * 3);

        }
    };
});