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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.userUrl = '/api/user';
        this.userLoginUrl = '/api/user/login';
        this.userLogoutUrl = '/api/user/logout';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.create = function (user) {
        var _this = this;
        console.log("create user : " + JSON.stringify(user));
        return new Promise(function (resolve, reject) {
            return _this.http
                .post(_this.userUrl, JSON.stringify(user), { headers: _this.headers })
                .toPromise()
                .then(function (res) {
                console.log("success from add user");
                resolve(ServiceStatusResponse_1.ServiceStatusResponse.CREATED);
            })
                .catch(function (errorResp) {
                console.log(" error from add user : " + JSON.stringify(errorResp));
                alert(HttpUtils_1.HttpUtils.find(errorResp.status));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                return reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    UserService.prototype.authenticate = function (user) {
        var _this = this;
        console.log("authenticate user : " + JSON.stringify(user));
        return new Promise(function (resolve, reject) {
            return _this.http
                .post(_this.userLoginUrl, JSON.stringify(user), { headers: _this.headers })
                .toPromise()
                .then(function (res) {
                console.log("success from authenticate user");
                resolve(ServiceStatusResponse_1.ServiceStatusResponse.CREATED);
            })
                .catch(function (errorResp) {
                console.log(" error from authenticate user : " + JSON.stringify(errorResp));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                return reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    UserService.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.http
                .get(_this.userLogoutUrl, { headers: _this.headers })
                .toPromise()
                .then(function (res) {
                console.log("success from logout user");
                resolve(ServiceStatusResponse_1.ServiceStatusResponse.CREATED);
            })
                .catch(function (errorResp) {
                console.log(" error from logout user : " + JSON.stringify(errorResp));
                console.log("status resp : " + HttpUtils_1.HttpUtils.find(errorResp.status));
                return reject(HttpUtils_1.HttpUtils.find(errorResp.status));
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map