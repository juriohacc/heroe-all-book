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
var HttpUtils_1 = require("../../common/service/HttpUtils");
var ContextUserService_1 = require("../../common/context/ContextUserService");
var MyWrittenBookService = (function () {
    function MyWrittenBookService(http, contextService) {
        this.http = http;
        this.contextService = contextService;
        this.bookUrl = '/api/my-written-books';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    MyWrittenBookService.prototype.findMyBooks = function () {
        var _this = this;
        console.log("find my books");
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
                console.log("error from findMyBooks book : " + JSON.stringify(errorResp));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    MyWrittenBookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ContextUserService_1.ContextUserService])
    ], MyWrittenBookService);
    return MyWrittenBookService;
}());
exports.MyWrittenBookService = MyWrittenBookService;
//# sourceMappingURL=my-written-book.service.js.map