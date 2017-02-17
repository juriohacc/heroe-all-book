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
var bookPage_1 = require("../../../../src/app/book/book-edit-pages/bookPage");
var ServiceStatusResponse_1 = require("../../../common/repository/ServiceStatusResponse");
var EditBookPagesController = (function () {
    function EditBookPagesController() {
        this.editBookPagesRepository = inversify_config_1.default.get(aop_definition_1.default.EditBookPagesRepository);
    }
    EditBookPagesController.prototype.createRouter = function (inputCtrl) {
        var _this = this;
        return express.Router()
            .get('/book-edit-pages', AuthentUtils_1.AuthentUtils.userShouldBeLogged, function (req, resGet, next) {
            winston_1.info("book pages");
            _this.editBookPagesRepository.findPagesByBookId(req.query.bookId)
                .then(function (res) {
                winston_1.info("results success from find findPagesByBookId ");
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
                winston_1.info("results error from findPagesByBookId : " + JSON.stringify(res));
                resGet.status(500).send({ error: res.msg });
            });
        })
            .
                post('/book-edit-pages', AuthentUtils_1.AuthentUtils.userShouldBeLogged, inputCtrl.multer.single("coverPicFile"), function (req, resPost, next) {
            var contentText = req.body.contentText;
            var num = req.body.numPage;
            var bookId = req.body.bookId;
            var newPage = req.body.newPage;
            winston_1.info("body : " + JSON.stringify(req.body));
            if (newPage) {
                _this.editBookPagesRepository.add(new bookPage_1.BookPage(bookId, num, contentText, null))
                    .then(function (res) {
                    winston_1.info("results success from add pages : " + JSON.stringify(res));
                    resPost.sendStatus(200);
                })
                    .catch(function (res) {
                    winston_1.info("results error from add pages : " + JSON.stringify(res));
                    if (res.status == ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS) {
                        resPost.status(409).send({ error: res.msg });
                    }
                    else if (res.status == ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR) {
                        resPost.status(500).send({ error: res.msg });
                    }
                });
            }
            else {
                _this.editBookPagesRepository.update(new bookPage_1.BookPage(bookId, num, contentText, null))
                    .then(function (res) {
                    winston_1.info("results success from update pages : " + JSON.stringify(res));
                    resPost.sendStatus(200);
                })
                    .catch(function (res) {
                    winston_1.info("results error from update pages : " + JSON.stringify(res));
                    if (res.status == ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR) {
                        resPost.status(500).send({ error: res.msg });
                    }
                });
            }
        });
    };
    EditBookPagesController = __decorate([
        ControllerDecorator_1.ControllerDecorator(), 
        __metadata('design:paramtypes', [])
    ], EditBookPagesController);
    return EditBookPagesController;
}());
exports.EditBookPagesController = EditBookPagesController;
//# sourceMappingURL=EditBookPagesController.js.map