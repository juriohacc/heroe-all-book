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
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.bookUrl = '/api/book';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    BookService.prototype.create = function (book) {
        var _this = this;
        console.log("create book : " + JSON.stringify(book));
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log("success from add book");
                        resolve(ServiceStatusResponse_1.ServiceStatusResponse.CREATED);
                    }
                    else {
                        console.log("error from add book : " + JSON.stringify(xhr.response));
                        console.log("status de base xhr : " + xhr.status);
                        console.log("status resp : " + HttpUtils_1.HttpUtils.find(xhr.status));
                        return reject(HttpUtils_1.HttpUtils.find(xhr.status));
                    }
                }
            };
            var formData = new FormData();
            formData.append("coverPicFile", book.fileCoverPic, book.fileCoverPic.name);
            formData.append("title", book.title);
            formData.append("description", book.description);
            xhr.open('POST', _this.bookUrl, true);
            xhr.send(formData);
            //
            // return this.http
            //     .post(this.bookUrl, JSON.stringify(book), {headers: this.headers})
            //     .toPromise()
            //     .then(res => {
            //         console.log("succes from add book");
            //         resolve(ServiceStatusResponse.CREATED);
            //     })
            //     .catch((errorResp : Response) => {
            //         console.log(" error from add book : "+JSON.stringify(errorResp));
            //         alert(HttpUtils.find(errorResp.status));
            //         console.log("status resp : "+ HttpUtils.find(errorResp.status));
            //         return reject(HttpUtils.find(errorResp.status));
            //     });
        });
    };
    BookService.prototype.getAll = function () {
        var _this = this;
        console.log("find all book");
        return new Promise(function (resolve, reject) {
            _this.http
                .get(_this.bookUrl, { headers: _this.headers })
                .map(function (response) { return response.json(); })
                .toPromise().then(function (res) {
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var entry = res_1[_i];
                    if (entry.fileCoverPic != null) {
                        entry.fileCoverPic = new Buffer(entry.fileCoverPic).toString('base64');
                    }
                }
                return resolve(res);
            })
                .catch(function (errorResp) {
                console.log("error from getAll book : " + JSON.stringify(errorResp));
                alert(HttpUtils_1.HttpUtils.find(errorResp.status));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    BookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map