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
var UserAddComponent = (function () {
    function UserAddComponent(userService, router, formBuilder, contextUserService) {
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.contextUserService = contextUserService;
        this.submitted = false;
        this.userAlreadyExists = false;
    }
    UserAddComponent.prototype.onSubmit = function (userForm, valid) {
        var _this = this;
        this.submitted = true;
        if (valid) {
            this.resetFormControlUsernameUnique();
            var user = new user_1.User(userForm.username, userForm.password);
            console.log("user " + JSON.stringify(user));
            this.userService.create(user)
                .then(function (res) {
                console.log("cree!!!");
                _this.contextUserService.setLogged(true);
                _this.router.navigate(['/allbooks']);
            })
                .catch(function (res) {
                console.log("error creation, resp : " + res);
                if (res == ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS) {
                    _this.addErrorFormControlUsernameUnique();
                }
            });
        }
    };
    UserAddComponent.prototype.resetFormControlUsernameUnique = function () {
        var formControlUsernameUnique = this.form.get("usernameUnique");
        formControlUsernameUnique.setErrors(null);
    };
    UserAddComponent.prototype.addErrorFormControlUsernameUnique = function () {
        var formControlUsernameUnique = this.form.get("usernameUnique");
        formControlUsernameUnique.setErrors({
            "notUnique": true
        });
    };
    UserAddComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required),
            usernameUnique: new forms_1.FormControl('')
        });
    };
    UserAddComponent = __decorate([
        core_1.Component({
            selector: 'user-add',
            providers: [user_service_1.UserService],
            templateUrl: 'app/user/user-add/user-add.component.html',
            styleUrls: ['app/user/user-add/user-add.component.css']
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, forms_1.FormBuilder, ContextUserService_1.ContextUserService])
    ], UserAddComponent);
    return UserAddComponent;
}());
exports.UserAddComponent = UserAddComponent;
//# sourceMappingURL=user-add-component.js.map