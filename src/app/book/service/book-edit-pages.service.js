"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ServiceStatusResponse_1 = require("../../../../server/common/repository/ServiceStatusResponse");
var HttpUtils_1 = require("../../common/service/HttpUtils");
var ContextUserService_1 = require("../../common/context/ContextUserService");
var BookEditPagesService = (function () {
    function BookEditPagesService(http, contextService) {
        this.http = http;
        this.contextService = contextService;
        this.bookUrl = '/api/book-edit-pages';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    BookEditPagesService.prototype.findPagesByBookId = function (bookId) {
        var _this = this;
        console.log("find pages of  book ", bookId);
        var params = new http_1.URLSearchParams();
        params.set('bookId', bookId);
        return new Promise(function (resolve, reject) {
            _this.http
                .get(_this.bookUrl, { search: params })
                .map(function (response) { return response.json(); })
                .toPromise().then(function (res) {
                return resolve(res);
            })
                .catch(function (errorResp) {
                console.log("error from pages book : " + JSON.stringify(errorResp));
                alert(HttpUtils_1.HttpUtils.find(errorResp.status));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    BookEditPagesService.prototype.create = function (bookPage) {
        var _this = this;
        console.log("create bookPage : " + JSON.stringify(bookPage));
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("success from add bookPage");
                        resolve(ServiceStatusResponse_1.ServiceStatusResponse.CREATED);
                    }
                    else {
                        console.log("error from add bookPage : " + JSON.stringify(xhr.response));
                        console.log("status de base xhr : " + xhr.status);
                        console.log("status resp : " + HttpUtils_1.HttpUtils.find(xhr.status));
                        return reject(HttpUtils_1.HttpUtils.find(xhr.status));
                    }
                }
            };
            var formData = new FormData();
            formData.append("contentText", bookPage.contentText);
            formData.append("bookId", bookPage.bookId);
            formData.append("numPage", bookPage.numPage);
            formData.append("newPage", bookPage.newPage);
            xhr.open('POST', _this.bookUrl, true);
            xhr.send(formData);
        });
    };
    BookEditPagesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ContextUserService_1.ContextUserService])
    ], BookEditPagesService);
    return BookEditPagesService;
}());
exports.BookEditPagesService = BookEditPagesService;
//# sourceMappingURL=book-edit-pages.service.js.map