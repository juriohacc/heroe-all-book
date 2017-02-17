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
var ControllerDecorator_1 = require("../../decorator/ControllerDecorator");
var book_1 = require("../../../src/app/book/model/book");
var express = require('express');
var winston_1 = require("winston");
var ServiceStatusResponse_1 = require("../../common/repository/ServiceStatusResponse");
var AuthentUtils_1 = require("../../common/authent/passport/AuthentUtils");
var inversify_config_1 = require("../../common/aop/inversify.config");
var aop_definition_1 = require("../../common/aop/aop-definition");
var BookController = (function () {
    function BookController() {
        this.bookRepository = inversify_config_1.default.get(aop_definition_1.default.BookRepository);
    }
    BookController.prototype.createRouter = function (inputCtrl) {
        var _this = this;
        return express.Router().
            post('/book', AuthentUtils_1.AuthentUtils.userShouldBeLogged, inputCtrl.multer.single("coverPicFile"), function (req, resPost, next) {
            var title = req.body.title;
            var description = req.body.description;
            var coverPicData = req.file;
            winston_1.info("coverPicData: " + coverPicData);
            winston_1.info("body : " + JSON.stringify(req.body));
            winston_1.info("title to create: " + title);
            _this.bookRepository.add(new book_1.Book(null, title, description, coverPicData, req.user.username))
                .then(function (res) {
                winston_1.info("results success from add book : " + JSON.stringify(res));
                resPost.sendStatus(200);
            })
                .catch(function (res) {
                winston_1.info("results error from add book : " + JSON.stringify(res));
                if (res.status == ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS) {
                    resPost.status(409).send({ error: res.msg });
                }
                else if (res.status == ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR) {
                    resPost.status(500).send({ error: res.msg });
                }
            });
        })
            .get('/book', function (req, resGet, next) {
            winston_1.info("find all books");
            _this.bookRepository.findAll()
                .then(function (res) {
                winston_1.info("results success from find all book");
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
                winston_1.info("results error from find all book : " + JSON.stringify(res));
                resGet.status(500).send({ error: res.msg });
            });
        });
    };
    BookController = __decorate([
        ControllerDecorator_1.ControllerDecorator(), 
        __metadata('design:paramtypes', [])
    ], BookController);
    return BookController;
}());
exports.BookController = BookController;
//# sourceMappingURL=BookController.js.map