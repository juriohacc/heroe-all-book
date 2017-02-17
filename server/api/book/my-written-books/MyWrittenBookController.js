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
var express = require('express');
var winston_1 = require("winston");
var ControllerDecorator_1 = require("../../../decorator/ControllerDecorator");
var inversify_config_1 = require("../../../common/aop/inversify.config");
var aop_definition_1 = require("../../../common/aop/aop-definition");
var AuthentUtils_1 = require("../../../common/authent/passport/AuthentUtils");
var MyWrittenBookController = (function () {
    function MyWrittenBookController() {
        this.bookRepository = inversify_config_1.default.get(aop_definition_1.default.BookRepository);
    }
    MyWrittenBookController.prototype.createRouter = function (inputCtrl) {
        var _this = this;
        return express.Router()
            .get('/my-written-books', AuthentUtils_1.AuthentUtils.userShouldBeLogged, function (req, resGet, next) {
            winston_1.info("find my-written-books");
            _this.bookRepository.findBooksByAuthor(req.user.username)
                .then(function (res) {
                winston_1.info("results success from find findBooksByAuthor ");
                if (res.length > 0) {
                    resGet.status(200).json(res);
                    resGet.end();
                }
                else {
                    resGet.status(200).json(new Array());
                }
                resGet.end();
            })
                .catch(function (res) {
                winston_1.info("results error from findBooksByAuthor : " + JSON.stringify(res));
                resGet.status(500).send({ error: res.msg });
            });
        });
    };
    MyWrittenBookController = __decorate([
        ControllerDecorator_1.ControllerDecorator(), 
        __metadata('design:paramtypes', [])
    ], MyWrittenBookController);
    return MyWrittenBookController;
}());
exports.MyWrittenBookController = MyWrittenBookController;
//# sourceMappingURL=MyWrittenBookController.js.map