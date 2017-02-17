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
var router_1 = require('@angular/router');
var forms_1 = require("@angular/forms");
var ServiceStatusResponse_1 = require("../../../../server/common/repository/ServiceStatusResponse");
var user_service_1 = require("../service/user.service");
var user_1 = require("../model/user");
var ContextUserService_1 = require("../../common/context/ContextUserService");
var UserLoginComponent = (function () {
    function UserLoginComponent(userService, contextUserService, router, formBuilder) {
        this.userService = userService;
        this.contextUserService = contextUserService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.userUnknown = false;
    }
    UserLoginComponent.prototype.onSubmit = function (userForm, valid) {
        var _this = this;
        this.submitted = true;
        if (valid) {
            this.resetFormControlUserUnknown();
            var user = new user_1.User(userForm.username, userForm.password);
            console.log("user " + JSON.stringify(user));
            this.userService.authenticate(user)
                .then(function (res) {
                console.log("loge OK!!!");
                _this.contextUserService.setLogged(true);
                _this.router.navigate(['/allbooks']);
            })
                .catch(function (res) {
                console.log("error log, resp : " + res);
                if (res == ServiceStatusResponse_1.ServiceStatusResponse.UNAUTHORIZED) {
                    console.log("unauthorized error form handle");
                    _this.addErrorFormControlUserUnknown();
                }
            });
        }
    };
    UserLoginComponent.prototype.resetFormControlUserUnknown = function () {
        var formControlUserUnknown = this.form.get("userUnknown");
        formControlUserUnknown.setErrors(null);
    };
    UserLoginComponent.prototype.addErrorFormControlUserUnknown = function () {
        var formControlUserUnknown = this.form.get("userUnknown");
        formControlUserUnknown.setErrors({
            "userUnknown": true
        });
    };
    UserLoginComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required),
            userUnknown: new forms_1.FormControl('')
        });
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: 'user-login',
            providers: [user_service_1.UserService],
            templateUrl: 'app/user/user-login/user-login.component.html',
            styleUrls: ['app/user/user-login/user-login.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, ContextUserService_1.ContextUserService, router_1.Router, forms_1.FormBuilder])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login-component.js.map