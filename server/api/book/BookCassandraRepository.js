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
var CassandraOperations_1 = require("../../cassandra/CassandraOperations");
var book_1 = require("../../../src/app/book/model/book");
var winston_1 = require("winston");
var _ = require("lodash");
var ServiceResponse_1 = require("../../common/repository/ServiceResponse");
var ServiceStatusResponse_1 = require("../../common/repository/ServiceStatusResponse");
var inversify_1 = require("inversify");
var node_uuid_1 = require("node-uuid");
var BookCassandraRepository = (function () {
    function BookCassandraRepository() {
    }
    // private static _instance:BookCassandraRepository = new BookCassandraRepository();
    //
    // constructor() {
    //     if(BookCassandraRepository._instance){
    //         throw new Error("Error: Instantiation failed. Singleton module! Use .getInstance() instead of new.");
    //     }
    //     BookCassandraRepository._instance = this;
    // }
    //
    // public static getInstance():BookCassandraRepository {
    //     return BookCassandraRepository._instance;
    // }
    BookCassandraRepository.prototype.add = function (book) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (book == null || _.isEmpty(book.title)) {
                reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "The book and title must not be null"));
            }
            _this.exists(book.title)
                .then(function (res) {
                winston_1.info("Result found from exists book : " + res);
                if (res) {
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS, "The book title  : " + book.title + " already exists"));
                }
                else {
                    var query = 'INSERT INTO book (id,title,description,cover_picture,author_pseudo) VALUES (?,?,?,?,?)';
                    var params = [node_uuid_1.v4(), book.title, book.description, book.fileCoverPic == null ? null : book.fileCoverPic.buffer, book.authorPseudo];
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
                }
            })
                .catch(function (res) {
                reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "Problem to find book " + res));
            });
        });
    };
    BookCassandraRepository.prototype.find = function (title) {
        return new Promise(function (resolve, reject) {
            if (_.isEmpty(title)) {
                reject('The book and title must not be null');
            }
            var query = 'SELECT * from book where title = ?';
            var params = [title];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err, result) {
                if (err) {
                    winston_1.error('Something when wrong' + JSON.stringify(err));
                    reject('Something when wrong' + JSON.stringify(err));
                }
                else {
                    var bookFound = result.first();
                    if (!bookFound) {
                        resolve(null);
                    }
                    else {
                        var book = new book_1.Book(bookFound.get("id")[0], bookFound.get("title")[0], bookFound.get("description")[0], null, bookFound.get("authorPseudo")[0]);
                        winston_1.info("book : " + bookFound);
                        resolve(book);
                    }
                }
            });
        });
    };
    BookCassandraRepository.prototype.findAll = function () {
        return new Promise(function (resolve, reject) {
            var books = Array();
            CassandraOperations_1.CassandraOperations.client.execute('SELECT * FROM book', function (err, result) {
                if (err) {
                    winston_1.error("ERROR " + err);
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "Problem to find all book " + err));
                }
                else {
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var bookFound = result.rows[i];
                            winston_1.info("current book from db : " + bookFound.title);
                            books.push(new book_1.Book(bookFound.id, bookFound.title, bookFound.description, bookFound.cover_picture, bookFound.auhor_pseudo));
                        }
                    }
                    resolve(books);
                }
            });
        });
    };
    BookCassandraRepository.prototype.findBooksByAuthor = function (authorUsername) {
        return new Promise(function (resolve, reject) {
            if (_.isEmpty(authorUsername)) {
                reject('The authorUsername must not be null');
            }
            var books = Array();
            var query = 'SELECT * FROM book where author_pseudo = ?';
            var params = [authorUsername];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err, result) {
                if (err) {
                    winston_1.error("ERROR " + err);
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "Problem to find findBooksByAuthor  " + err));
                }
                else {
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var bookFound = result.rows[i];
                            winston_1.info("current book from db : " + bookFound.title);
                            books.push(new book_1.Book(bookFound.id, bookFound.title, bookFound.description, bookFound.cover_picture, bookFound.auhor_pseudo));
                        }
                    }
                    resolve(books);
                }
            });
        });
    };
    BookCassandraRepository.prototype.exists = function (title) {
        return this.find(title)
            .then(function (res) {
            return Promise.resolve(res != null);
        })
            .catch(function (res) {
            return Promise.resolve(false);
        });
    };
    BookCassandraRepository = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], BookCassandraRepository);
    return BookCassandraRepository;
}());
exports.BookCassandraRepository = BookCassandraRepository;
//# sourceMappingURL=BookCassandraRepository.js.map