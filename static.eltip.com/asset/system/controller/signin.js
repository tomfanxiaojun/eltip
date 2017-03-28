'use strict';
app.controller('SigninFormController',  function(toaster,$scope,$state,authService) {
    $scope.user = {
        email:'',
        password:''
    };
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
        authService.login($scope.user.email,$scope.user.password).error(function(){
            console.log("后台报错");
            //toaster.pop("error", "dasda");
            //authService.errorHandler;
        }).then(function(data){
                if(data.success){
                    console.log("success")
                }else {
                    $state.go('app.dashboard-v1');
                    console.log("error")
                }
                //authService.errorHandler;

            });
        
        // success(function(data){
        //    console.log(data)
        //}).error(function(){
        //    alert("出错");
        //});
      //$http.post('user/login', {email: $scope.user.email, password: $scope.user.password})
      //.then(function(response) {
      //  if ( !response.data.user ) {
      //    $scope.authError = '账号或密码错误';
      //  }else{
      //    $state.go('app.dashboard-v1');
      //  }
      //}, function(x) {
      //    /*
      //  $scope.authError = '服务错误';
      //  */
      //    $state.go('app.dashboard-v1');
      //});
    };
  })
;