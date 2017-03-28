/*global skycanopy, angular, $, document*/

app.factory('questionService', function (baseService,$interval,$timeout,$cookieStore, $state, $localStorage, $http) {
    'use strict';
    var service = Object.create(baseService);
    var baseURL = 'question';
    var URLObj={
        GET_QUESTION_TYPES:'/get_question_types',
        GET_QUESTIONS:'/get_questions',
        DELETE_QUESTIONS:'/delete_questions',
        ADD_QUESTION:'/add_question',
        DELETE_QUESTION_ITEM: '/delete_question_item',
        GET_PAPERS:'/get_papers',
        ADD_PAPER:'/add_paper',
        DELETE_PAPERS: '/delete_papers',
        VIEW_PAPER:'/view_paper'

    }
    service.setUrl(baseURL);
    service.get_question_types = function () {
        return $http({
            url: service.getUrl() + URLObj.GET_QUESTION_TYPES,
            method: 'GET',
            dataType:"json",
            contentType:"application/json"
        }).error();
    };
    service.view_papers = function (id) {
        return $http({
            url: service.getUrl() + URLObj.VIEW_PAPER,
            method: 'GET',
            dataType:"json",
            contentType:"application/json",
            params: {
                'id':id
            }
        }).error();
    };
    service.get_papers = function (paper) {
        return $http({
            url: service.getUrl() + URLObj.GET_PAPERS,
            method: 'POST',
            dataType:"json",
            contentType:"application/json",
            params: {
                'exprimentId': paper.exprimentId,
                'title':paper.title
            }
        }).error();
    };
    service.get_questions = function (question) {
        return $http({
            url: service.getUrl() + URLObj.GET_QUESTIONS,
            method: 'POST',
            dataType:"json",
            contentType:"application/json",
            params: {
                'exprimentId': question.exprimentId
            }
        }).error();
    };
    service.delete_questions = function (ids) {
        return $http({
            url: service.getUrl() + URLObj.DELETE_QUESTIONS,
            method: 'POST',
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(ids)
            //data: {
            //    ids: ids
            //}
        }).error();
    };
    service.delete_papers = function (ids) {
        return $http({
            url: service.getUrl() + URLObj.DELETE_PAPERS,
            method: 'POST',
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(ids)
        }).error();
    };

    service.delete_question_item = function (id) {
        return $http({
            url: service.getUrl() + URLObj.DELETE_QUESTION_ITEM,
            method: 'POST',
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(id)
        }).error();
    };
    service.add_question = function (eid,question) {
        return $http({
            url: service.getUrl() + URLObj.ADD_QUESTION,
            method: 'POST',
            params:{
                eid:eid,
                id:question.id,
                exprimentId:question.exprimentId,
                title:question.title,
                type:question.type,
                test:1,
                items:JSON.stringify(question.questionItems)
            }
           }).error();
    };
    service.add_paper = function (eid,paper) {
        return $http({
            url: service.getUrl() + URLObj.ADD_PAPER,
            method: 'POST',
            params:{
                eid:eid,
                id:paper.id,
                exprimentId:paper.exprimentId,
                title:paper.title,
                passScore:paper.passScore,
                testCount:paper.testCount,
                items:JSON.stringify(paper.types)
            }
        }).error();
    };
    return service;

});
