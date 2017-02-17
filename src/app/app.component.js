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
var core_1 = require('@angular/core');
var ContextUserService_1 = require("./common/context/ContextUserService");
var user_service_1 = require("./user/service/user.service");
var AppComponent = (function () {
    function AppComponent(contextUserService, userService) {
        this.contextUserService = contextUserService;
        this.userService = userService;
    }
    AppComponent.prototype.isGuestUser = function () {
        return !this.contextUserService.getCurrentContextUser().isLogged();
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.userService.logout().then(function (r) {
            _this.contextUserService.reset();
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "  \n    <custom-loader></custom-loader>\n    <h1>Are you a Heroe </h1>\n    <nav>\n        <a *ngIf=\"isGuestUser()\" routerLink=\"/login\"  routerLinkActive=\"active\">Se connecter</a> \n        <a *ngIf=\"!isGuestUser()\"  (click)=\"logout()\">Se d\u00E9connecter</a> \n        <a *ngIf=\"isGuestUser()\" routerLink=\"/user\" routerLinkActive=\"active\">Cr\u00E9er un compte</a> \n        <a *ngIf=\"!isGuestUser()\" routerLink=\"/book\" routerLinkActive=\"active\">R\u00E9diger un bouquin</a> \n        <a *ngIf=\"!isGuestUser()\" routerLink=\"/my-written-books\" routerLinkActive=\"active\">Voir mes cr\u00E9ations</a> \n        <a routerLink=\"/allbooks\" routerLinkActive=\"active\">Consulter la biblioth\u00E9que</a> \n        <!--<a routerLink=\"/heroes\" routerLinkActive=\"active\">Menu 1</a>-->\n        <!--<a routerLink=\"/dashboard\" routerLinkActive=\"active\">Menu 2</a> -->\n    </nav>\n \n     <router-outlet></router-outlet>\n  ",
            styleUrls: ['/app/app.component.css']
        }), 
        __metadata('design:paramtypes', [ContextUserService_1.ContextUserService, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map