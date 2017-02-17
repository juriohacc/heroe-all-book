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
var CassandraOperations_1 = require("../../../cassandra/CassandraOperations");
var winston_1 = require("winston");
var _ = require("lodash");
var ServiceResponse_1 = require("../../../common/repository/ServiceResponse");
var ServiceStatusResponse_1 = require("../../../common/repository/ServiceStatusResponse");
var user_1 = require("../../../../src/app/user/model/user");
var inversify_1 = require("inversify");
var UserAccountCassandraRepository = (function () {
    function UserAccountCassandraRepository() {
    }
    UserAccountCassandraRepository.prototype.add = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (user == null || _.isEmpty(user.username) || _.isEmpty(user.password)) {
                reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR, "The user username and password must not be null"));
            }
            _this.exists(user.username)
                .then(function (res) {
                winston_1.info("Result found from exists user : " + res);
                if (res) {
                    reject(new ServiceResponse_1.ServiceResponse(ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS, "The user title  : " + user.username + " already exists"));
                }
                else {
                    var query = 'INSERT INTO user (username,password) VALUES (?,?)';
                    var params = [user.username, user.password];
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
    UserAccountCassandraRepository.prototype.find = function (username) {
        return new Promise(function (resolve, reject) {
            if (_.isEmpty(username)) {
                reject('The username must not be null');
            }
            var query = 'SELECT * from user where username = ?';
            var params = [username];
            CassandraOperations_1.CassandraOperations.client.execute(query, params, { prepare: true }, function (err, result) {
                if (err) {
                    winston_1.error('Something when wrong' + JSON.stringify(err));
                    reject('Something when wrong' + JSON.stringify(err));
                }
                else {
                    var userFound = result.first();
                    if (!userFound) {
                        resolve(null);
                    }
                    else {
                        winston_1.info('User found : ' + JSON.stringify(userFound));
                        resolve(new user_1.User(userFound.username, userFound.password));
                    }
                }
            });
        });
    };
    UserAccountCassandraRepository.prototype.exists = function (username) {
        return this.find(username)
            .then(function (res) {
            return Promise.resolve(res != null);
        })
            .catch(function (res) {
            return Promise.resolve(false);
        });
    };
    UserAccountCassandraRepository = __decorate([
        inversify_1.injectable(), 
        __metadata('design:paramtypes', [])
    ], UserAccountCassandraRepository);
    return UserAccountCassandraRepository;
}());
exports.UserAccountCassandraRepository = UserAccountCassandraRepository;
//# sourceMappingURL=UserAccountCassandraRepository.js.map