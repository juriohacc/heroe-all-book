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
var CustomLoaderComponent = (function () {
    function CustomLoaderComponent() {
        this.active = false;
    }
    CustomLoaderComponent.prototype.show = function () {
        this.active = true;
    };
    CustomLoaderComponent.prototype.hide = function () {
        this.active = false;
    };
    CustomLoaderComponent.prototype.ngOnInit = function () {
    };
    CustomLoaderComponent = __decorate([
        core_1.Component({
            selector: 'custom-loader',
            template: '<div *ngIf="active" class="loading-progress"></div>',
            styleUrls: ['app/common/loader/loader.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CustomLoaderComponent);
    return CustomLoaderComponent;
}());
exports.CustomLoaderComponent = CustomLoaderComponent;
//# sourceMappingURL=loader.component.js.map