"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var ContextUserService_1 = require("../common/context/ContextUserService");
var CustomHttp = (function (_super) {
    __extends(CustomHttp, _super);
    function CustomHttp(backend, defaultOptions, _router, contextUserService) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
        this.contextUserService = contextUserService;
    }
    CustomHttp.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    CustomHttp.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    CustomHttp.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, options));
    };
    CustomHttp.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, options));
    };
    CustomHttp.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    CustomHttp.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            console.log("Handle global error , status  :", err.status);
            if (err.status == 500) {
                console.log("ERREUR 500 TECHNICAL => REDIRECT " + _this._router);
                _this._router.navigate(['/indispo']);
                return rxjs_1.Observable.empty();
            }
            else if (err.status == 401) {
                _this.contextUserService.reset();
                _this._router.navigate(['/unauthorized']);
                return rxjs_1.Observable.empty();
            }
            else {
                return rxjs_1.Observable.throw(err);
            }
        });
    };
    CustomHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router, ContextUserService_1.ContextUserService])
    ], CustomHttp);
    return CustomHttp;
}(http_1.Http));
exports.CustomHttp = CustomHttp;
//# sourceMappingURL=CustomHttp.js.map