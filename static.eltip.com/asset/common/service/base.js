/*global skycanopy, angular, MESSAGE, $*/

app.service('baseService', function ($location, $state, $http, $q, toaster) {
	'use strict';

    this.setUrl = function (url) {
        this.url = url;
    };

    this.getUrl = function () {
        return this.url;
    };

    this.errorHandler = function (result, status) {
        var message = '';
//console.log(result);
        if (angular.isDefined(result.success)) {
			if (result.data === "SYS001") {
				//$state.go('lockme', {redirect: $state.current.name});

				return;
			}

            if (result.message) {
                message += message;
            }

            if (result.data) {
                message += MESSAGE.ERROR.CODE.format(result.data);
            }
        } else {
            message += MESSAGE.ERROR.SERVER.format(status);
        }

        toaster.pop("error", MESSAGE.ERROR.OPERATE, message);
    };

    this.create = function (model) {
        return $http({
            method: 'POST',
            url: this.url + '/create',
            data: $.param(model),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).error(this.errorHandler);
    };

    this.update = function (model) {
        return $http({
            method: 'POST',
            url: this.url + '/update',
            data: $.param(model),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).error(this.errorHandler);
    };

    this.remove = function (id) {
        return $http({
            method: 'GET',
            url: this.url + '/remove',
            params: {
                id: id
            }
        }).error(this.errorHandler);
    };

    this.batchRemove = function (ids) {
        return $http({
            method: 'GET',
            url: this.url + '/batchRemove',
            params: {
                ids: ids
            }
        }).error(this.errorHandler);
    };

    this.findById = function (id) {
        return $http({
            method: 'GET',
            url: this.url + '/findById',
            params: {
                id: id
            }
        }).error(this.errorHandler);
    };

    this.getList = function () {
        return $http({
            method: 'GET',
            url: this.url + '/getList'
        }).error(this.errorHandler);
    };

    this.query = function (params) {
        return $http({
            method: 'GET',
            url: this.url + '/query',
            params: params
        }).error(this.errorHandler);
    };

});