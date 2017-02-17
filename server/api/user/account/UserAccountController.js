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
var ControllerDecorator_1 = require("../../../decorator/ControllerDecorator");
var express = require('express');
var winston_1 = require("winston");
var ServiceStatusResponse_1 = require("../../../common/repository/ServiceStatusResponse");
var AuthentUtils_1 = require("../../../common/authent/passport/AuthentUtils");
var aop_definition_1 = require("../../../common/aop/aop-definition");
var inversify_config_1 = require("../../../common/aop/inversify.config");
var UserAccountController = (function () {
    function UserAccountController() {
        this.userAccountService = inversify_config_1.default.get(aop_definition_1.default.UserAccountService);
    }
    UserAccountController.prototype.createRouter = function (inputCtrl) {
        var _this = this;
        return express.Router().
            post('/user', function (req, res, next) {
            _this.userAccountService.subscribe(req.body.username, req.body.password)
                .then(function (resp) {
                winston_1.info("results success from add user : " + JSON.stringify(req.user));
                AuthentUtils_1.AuthentUtils.login(req, resp, res);
            })
                .catch(function (resp) {
                winston_1.info("results error from add user : " + JSON.stringify(resp.getServiceResponse().msg));
                if (resp.getServiceResponse().status == ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS) {
                    res.status(409).send({ error: resp.getServiceResponse().msg });
                }
                else if (resp.getServiceResponse().status == ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR) {
                    res.status(500).send({ error: resp.getServiceResponse().msg });
                }
            });
        }).
            post('/user/login', AuthentUtils_1.AuthentUtils.checkUserIsLogged, function (req, res, next) {
            _this.userAccountService.authenticate(req.body.username, req.body.password)
                .then(function (resp) {
                winston_1.info("results success from login user : " + JSON.stringify(req.user));
                AuthentUtils_1.AuthentUtils.login(req, resp, res);
            })
                .catch(function (resp) {
                winston_1.info("results error from login user : " + JSON.stringify(resp));
                if (resp.getServiceResponse().status == ServiceStatusResponse_1.ServiceStatusResponse.UNAUTHORIZED) {
                    res.status(401).send({ error: resp.getServiceResponse().msg });
                }
                else if (resp.getServiceResponse().status == ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR) {
                    res.status(500).send({ error: resp.getServiceResponse().msg });
                }
            });
        }).
            get('/user/logout', function (req, res) {
            winston_1.info("logout step start");
            req.logout();
            req.session.destroy();
            winston_1.info("logout step end");
            res.sendStatus(200);
        });
    };
    UserAccountController = __decorate([
        ControllerDecorator_1.ControllerDecorator(), 
        __metadata('design:paramtypes', [])
    ], UserAccountController);
    return UserAccountController;
}());
exports.UserAccountController = UserAccountController;
//# sourceMappingURL=UserAccountController.js.map