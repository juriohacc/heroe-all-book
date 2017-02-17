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
var winston_1 = require("winston");
var ServiceResponse_1 = require("../../../common/repository/ServiceResponse");
var ServiceStatusResponse_1 = require("../../../common/repository/ServiceStatusResponse");
var user_1 = require("../../../../src/app/user/model/user");
var _ = require("lodash");
var UserAccountResp_1 = require("./UserAccountResp");
var inversify_config_1 = require("../../../common/aop/inversify.config");
var inversify_1 = require("inversify");
var aop_definition_1 = require("../../../common/aop/aop-definition");
var bCrypt = require('bCrypt-nodejs');
var UserAccountServiceImpl = (function () {
    function UserAccountServiceImpl() {
        this.userAccountRepository = inversify_config_1.default.get(aop_definition_1.default.UserAccountRepository);
    }
    UserAccountServiceImpl.prototype.subscribe = function (username, password) {
        var _this = this;
        if (_.isEmpty(username) || _.isEmpty(password)) {
            throw new Error("Error: username and password should be not null");
        }
        return new Promise(function (resolve, reject) {
            _this.userAccountRepository.find(username)
                .then(function (res) {
                winston_1.info("results success from find user : " + res);
                if (res) {
                    reject(UserAccountResp_1.UserAccountResp.createFailResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS, "The username  : " + username + " already exists")));
                }
                else {
                    var user_2 = new user_1.User(username, bCrypt.hashSync(password, bCrypt.genSaltSync(10), null));
                    _this.userAccountRepository.add(user_2)
                        .then(function (res) {
                        winston_1.info("results success from add user : " + JSON.stringify(res));
                        resolve(UserAccountResp_1.UserAccountResp.createSuccessResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.CREATED), user_2));
                    })
                        .catch(function (res) {
                        winston_1.info("results error from add user : " + JSON.stringify(res));
                        reject(UserAccountResp_1.UserAccountResp.createFailResponse(res));
                    });
                }
            })
                .catch(function (res) {
                winston_1.info("results error from find user : " + JSON.stringify(res));
                reject(UserAccountResp_1.UserAccountResp.createFailResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, res)));
            });
        });
    };
    ;
    UserAccountServiceImpl.prototype.authenticate = function (username, password) {
        var _this = this;
        if (_.isEmpty(username) || _.isEmpty(password)) {
            throw new Error("Error: username and password should be not null");
        }
        return new Promise(function (resolve, reject) {
            _this.userAccountRepository.find(username)
                .then(function (res) {
                winston_1.info("results success from find user : " + JSON.stringify(res));
                if (res && bCrypt.compareSync(password, res.password)) {
                    winston_1.info("password OK");
                    resolve(UserAccountResp_1.UserAccountResp.createSuccessResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.CREATED), res));
                }
                else {
                    winston_1.info("problem to authenticate");
                    reject(UserAccountResp_1.UserAccountResp.createFailResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.UNAUTHORIZED, "The login is not authorized")));
                }
            })
                .catch(function (res) {
                winston_1.info("results error from login user : " + JSON.stringify(res));
                reject(UserAccountResp_1.UserAccountResp.createFailResponse(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, res)));
            });
        });
    };
    UserAccountServiceImpl = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], UserAccountServiceImpl);
    return UserAccountServiceImpl;
}());
exports.UserAccountServiceImpl = UserAccountServiceImpl;
//# sourceMappingURL=UserAccountServiceImpl.js.map