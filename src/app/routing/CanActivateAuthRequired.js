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
var router_1 = require('@angular/router');
var ContextUserService_1 = require("../common/context/ContextUserService");
var core_1 = require("@angular/core");
var CanActivateAuthRequired = (function () {
    function CanActivateAuthRequired(router, contextUserService) {
        this.router = router;
        this.contextUserService = contextUserService;
    }
    CanActivateAuthRequired.prototype.canActivate = function (route, state) {
        if (!this.contextUserService.getCurrentContextUser().isLogged()) {
            console.log("not logged");
            this.router.navigate(['/login']);
            return false;
        }
        console.log("logged");
        return true;
    };
    CanActivateAuthRequired = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, ContextUserService_1.ContextUserService])
    ], CanActivateAuthRequired);
    return CanActivateAuthRequired;
}());
exports.CanActivateAuthRequired = CanActivateAuthRequired;
//# sourceMappingURL=CanActivateAuthRequired.js.map