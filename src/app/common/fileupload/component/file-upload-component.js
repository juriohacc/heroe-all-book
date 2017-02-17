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
var forms_1 = require("@angular/forms");
var FileUploadComponent = (function () {
    function FileUploadComponent() {
        this.propagateChange = function () { };
    }
    FileUploadComponent.prototype.fileChangeEvent = function (fileInput) {
        this.propagateChange(fileInput.target.files[0]);
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    FileUploadComponent.prototype.writeValue = function (obj) { };
    FileUploadComponent.prototype.setDisabledState = function (isDisabled) { };
    FileUploadComponent.prototype.ngOnChanges = function (changes) { };
    FileUploadComponent.prototype.registerOnTouched = function () { };
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'custom-file-upload',
            template: '<input id="filesToUpload" (change)="fileChangeEvent($event)" name="filesToUpload"   type="file"  placeholder="Upload file..." />',
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return FileUploadComponent; }), multi: true }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload-component.js.map