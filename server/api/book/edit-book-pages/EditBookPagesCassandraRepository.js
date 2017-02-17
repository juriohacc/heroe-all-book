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
var _ = require("lodash");
var inversify_1 = require("inversify");
var bookPage_1 = require("../../../../src/app/book/book-edit-pages/bookPage");
var CassandraOperations_1 = require("../../../cassandra/CassandraOperations");
var ServiceResponse_1 = require("../../../common/repository/ServiceResponse");
var ServiceStatusResponse_1 = require("../../../common/repository/ServiceStatusResponse");
var EditBookPagesCassandraRepository = (function () {
    function EditBookPagesCassandraRepository() {
    }
    EditBookPagesCassandraRepository.prototype.findPagesByBookId = function (bookId) {
        return new Promise(function (resolve, reject) {
            var bookPages = Array();
            if (_.isEmpty(bookId)) {
                reject('The bookId must not be null');
            }
            var query = 'SELECT * from book_page where book_id = ?';
            var params = [bookId];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err, result) {
                if (err) {
                    winston_1.error('Something when wrong' + JSON.stringify(err));
                    reject('Something when wrong' + JSON.stringify(err));
                }
                else {
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var bookFound = result.rows[i];
                            winston_1.info("current numPage from db : " + bookFound.num_page);
                            bookPages.push(new bookPage_1.BookPage(bookFound.book_id, bookFound.num_page, bookFound.content_text, null));
                        }
                    }
                    resolve(bookPages);
                }
            });
        });
    };
    EditBookPagesCassandraRepository.prototype.add = function (bookPage) {
        winston_1.info("ajoute page pour livre : " + bookPage.bookId + " et page text : " + bookPage.contentText);
        return new Promise(function (resolve, reject) {
            //FIXME ajout controle coherence valeur des champs selon type de page (image? text ? choix ?)
            if (bookPage == null) {
                reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "The BookPage must not be null"));
            }
            //FIXME verifier que la page numéro n'existe pas déja OU remplacer ancienne par nouvelle ?!
            // info("Result found from exists bookPage : "+res);
            // if(res){
            //     reject(new ServiceResponse(ServiceStatusResponse.RESOURCE_ALREADY_EXISTS,"The book title  : "+book.title+" already exists"));
            // }else{
            var query = 'INSERT INTO book_page (book_id,num_page,content_text) VALUES (?,?,?)';
            var params = [bookPage.bookId, bookPage.numPage, bookPage.contentText];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err) {
                if (err) {
                    winston_1.error('Something when wrong and the row was not updated ' + err);
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "Something when wrong and the row was not updated " + JSON.stringify(err)));
                }
                else {
                    winston_1.info('Updated on the cluster');
                    resolve(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.CREATED));
                }
            });
            // }
        });
    };
    EditBookPagesCassandraRepository.prototype.update = function (bookPage) {
        winston_1.info("update page pour livre : " + bookPage.bookId + " et page text : " + bookPage.contentText);
        return new Promise(function (resolve, reject) {
            //FIXME ajout controle coherence valeur des champs selon type de page (image? text ? choix ?)
            if (bookPage == null) {
                reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "The BookPage must not be null"));
            }
            // info("Result found from exists bookPage : "+res);
            // if(res){
            //     reject(new ServiceResponse(ServiceStatusResponse.RESOURCE_ALREADY_EXISTS,"The book title  : "+book.title+" already exists"));
            // }else{
            var query = 'UPDATE book_page set content_text = ? where numPage = ?';
            var params = [bookPage.contentText, bookPage.numPage];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err) {
                if (err) {
                    winston_1.error('Something when wrong and the row was not updated ' + err);
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "Something when wrong and the row was not updated " + JSON.stringify(err)));
                }
                else {
                    winston_1.info('Updated on the cluster');
                    resolve(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.CREATED));
                }
            });
            // }
        });
    };
    EditBookPagesCassandraRepository = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], EditBookPagesCassandraRepository);
    return EditBookPagesCassandraRepository;
}());
exports.EditBookPagesCassandraRepository = EditBookPagesCassandraRepository;
//# sourceMappingURL=EditBookPagesCassandraRepository.js.map