"use strict";
var inversify_1 = require("inversify");
var BookCassandraRepository_1 = require("../../api/book/BookCassandraRepository");
var UserAccountCassandraRepository_1 = require("../../api/user/account/UserAccountCassandraRepository");
var UserAccountServiceImpl_1 = require("../../api/user/account/UserAccountServiceImpl");
var aop_definition_1 = require("./aop-definition");
var EditBookPagesCassandraRepository_1 = require("../../api/book/edit-book-pages/EditBookPagesCassandraRepository");
var container = new inversify_1.Container();
container.bind(aop_definition_1.default.BookRepository).to(BookCassandraRepository_1.BookCassandraRepository);
container.bind(aop_definition_1.default.UserAccountRepository).to(UserAccountCassandraRepository_1.UserAccountCassandraRepository);
container.bind(aop_definition_1.default.EditBookPagesRepository).to(EditBookPagesCassandraRepository_1.EditBookPagesCassandraRepository);
container.bind(aop_definition_1.default.UserAccountService).to(UserAccountServiceImpl_1.UserAccountServiceImpl);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = container;
//# sourceMappingURL=inversify.config.js.map