/*global skycanopy, angular, $, document*/

app.factory('authService', function (baseService,$interval,$timeout,$cookieStore, $state, $localStorage, $http) {
	'use strict';
	
	var user = null,
		inputTimer = null,
		kickTimer = null,
		admin = null,
		ticket = 0;
	var service = Object.create(baseService);

	service.setUrl('user');
	service.login = function (email, password) {
		return $http({
			url: service.getUrl() + '/login',
			method: 'GET',
			params: {
				email: email,
				password: password
			}
		}).error();
	};
	//var user = null,
	//	inputTimer = null,
	//	kickTimer = null,
	//	admin = null,
	//	ticket = 0,
	//	url='user';
	//var service = {};
    //
    //
	//service.login = function (email, password) {
	//	return $http({
	//		url: url + '/login',
	//		method: 'GET',
	//		params: {
	//			email: email,
	//			password: password
	//		}
	//	}).error();
	//};
	return service;
	//service.login = function (email, password) {
	//	return $http({
	//		url: service.getUrl() + '/login',
	//		method: 'GET',
	//		params: {
	//			email: email,
	//			password: password
	//		}
	//	}).success(function(data){
	//		alert("success");
	//	}).error(function(data){
	//			alert("error");
	//		}
	//	);
	//};
	//function init() {
    //
	//	function operateHandler() {
	//		ticket = 0;
	//	}
	//	$(document).mousedown(operateHandler);
	//	$(document).keydown(operateHandler);
	//}
	//
	//service.uncheck = function () {
	//	$interval.cancel(inputTimer);
	//};
	//service.startThread = function(){
	//	var u = $cookieStore.get('user');
	//	if(u!=null){
	//		service.startKickCheck();
	//	}
	//}
	//service.startCheck = function () {
	//	inputTimer = $interval(function () {
	//		if (ticket === 10 * 60) {
	//			$interval.cancel(kickTimer);
	//			//$state.go('lockme', {redirect: $state.current.name});
	//		}
	//		ticket += 1;
	//	}, 1000);
	//};
	//service.gosin = function(num){
	//	service.stopKickCheck();
	//	var modalInstance = $modal.open({
	//		templateUrl: 'asset/app/common/view/loginout.html',
	//		controller:logoutCtr,
	//		resolve: {
	//			num: function () {
	//				return num;
	//			}
	//		}
	//	});
	//	modalInstance.opened.then(function () {//模态窗口打开之后执行的函数
    //
	//	});
	//	modalInstance.result.then(function (result) {
	//	}, function (reason) {
	//	});
	//};
	//service.startKickCheck = function () {
    //
	//	kickTimer = $interval(function () {
	//		var u = $cookieStore.get('user');
    //
	//		if(typeof(u)=='undefined'){
    //
	//		}else{
	//			enterpriseService.checktag(u.id).success(function(result){
    //
	//			}).error(function (result) {
	//				$cookieStore.remove('user');
	//				service.logout2();
	//				if(result.message=="会话超时"){
	//					service.gosin(false);
	//				}else{
	//					service.gosin(true);
	//				}
    //
	//			});
	//		}
	//	}, 1000);
	//};
	//
	//service.stopKickCheck = function () {
	//	$interval.cancel(kickTimer);
	//};
    //
	//service.login = function (email, password,captcha) {
	//	return enterpriseService.login(email, password,captcha).success(function (result) {
	//		if (result.data !== null) {
	//			admin = result.data.admin;
	//			enterprise = result.data.enterprise;
	//			user = result.data.user;
	//			$cookieStore.put('user',user);
	//			$cookieStore.put('admin',admin);
	//			$cookieStore.put('enterprise',enterprise);
	//			$localStorage.enterprise = enterprise;
	//			$localStorage.admin = admin;
	//			$localStorage.user = user;
	//			//service.startCheck();
	//			//service.startKickCheck();
	//			service.startThread();
	//		}
	//	});
	//};
	//service.openServer = function (email, password) {
	//	return $http({
	//		method: 'GET',
	//		url:  'enterprise/openServer',
	//		params: {
	//			email: email,
	//			password:password
	//		}
	//	});
	//};
	//service.logout = function () {
	//	admin = null;
	//	enterprise = null;
	//	user = null;
	//	$cookieStore.remove('user');
	//	delete $localStorage.enterprise;
	//	delete $localStorage.user;
	//	delete $localStorage.admin;
	//	enterpriseService.logout();
	//	//this.uncheck();
	//};
	//service.logout2 = function () {
	//	admin = null;
	//	enterprise = null;
	//	user = null;
	//	delete $localStorage.enterprise;
	//	delete $localStorage.user;
	//	delete $localStorage.admin;
	//	//this.uncheck();
	//};
    //
	//service.unlock = function (password) {
	//	var userName;
    //
	//	if (angular.isDefined($localStorage.admin)) {
	//		userName = $localStorage.user.username;   //原来userName是邮箱
	//	} else {
	//		userName = user.username;
	//	}
	//	return this.login(userName, password);
	//};
	//service.relogin = function (id) {
	//	return enterpriseService.relogin(id).success(function (result) {
	//		if (result.data !== null) {
	//			enterprise = result.data;
	//			$localStorage.enterprise = enterprise;
	//		}
	//	});
	//};
	//service.saveUser=function(user1){
	//	user = user1;
	//	$localStorage.user = user;
	//}
	//service.changePw=function(id,password,oldPw){
	//	return $http({
	//		method: 'GET',
	//		url:  'user/changePw',
	//		params: {
	//			id: id,
	//			password:password,
	//			oldPw:oldPw
	//		}
	//	}).error(this.errorHandler);
	//};
	//service.checkPw=function(id,pw){
	//	return $http({
	//		method: 'GET',
	//		url:  'user/checkPw',
	//		params: {
	//			id: id,
	//			pw:pw
	//		}
	//	});
	//};
	//service.changeEmail=function(id,email,pw,oldEmail){
	//	return $http({
	//		method: 'GET',
	//		url:  'user/changeEmail',
	//		params: {
	//			id: id,
	//			email:email,
	//			pw:pw,
	//			oldEmail:oldEmail
	//		}
	//	}).error(this.errorHandler);
	//};
	//service.getEnterprise = function () {
	//	if (angular.isDefined($localStorage.enterprise)) {
	//		return $localStorage.enterprise;
	//	} else {
	//		return enterprise;
	//	}
	//};
	//service.getAdmin = function () {
	//	if (angular.isDefined($localStorage.admin)) {
    //
	//		return $localStorage.admin;
	//	} else {
	//		return admin;
	//	}
	//};
	//service.getUser = function () {
	//	if (angular.isDefined($localStorage.user)) {
    //
	//		return $localStorage.user;
	//	} else {
	//		return user;
	//	}
	//};
	//service.getCapt=function(){
	//	return $http({
	//		method: 'GET',
	//		url:  'enterprise/captcha'
	//	});
	//}
	//service.startThread();

});
//var logoutCtr= function($scope, $modalInstance,$state,num){
//	$scope.showmsg = false;
//	if(num){
//		$scope.showmsg = true;
//	}
//	$scope.ok=function(){
//		$state.go('access.signin');
//		$modalInstance.dismiss('cancel');
//	}
//}