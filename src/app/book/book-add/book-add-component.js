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
var book_service_1 = require("../service/book.service");
var book_1 = require("../model/book");
var forms_1 = require("@angular/forms");
var ServiceStatusResponse_1 = require("../../../../server/common/repository/ServiceStatusResponse");
var BookAddComponent = (function () {
    function BookAddComponent(bookService, router, formBuilder) {
        this.bookService = bookService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.bookAlreadyExists = false;
    }
    BookAddComponent.prototype.onSubmit = function (bookForm, valid) {
        var _this = this;
        this.submitted = true;
        if (valid) {
            this.resetFormControlTitleUnique();
            console.log("this.filesToUpload " + bookForm.filesToUpload);
            console.log("this.filesToUpload.name " + bookForm.filesToUpload.name);
            var book = new book_1.Book(null, bookForm.title, bookForm.description, bookForm.filesToUpload, null);
            console.log("book " + JSON.stringify(book));
            this.bookService.create(book)
                .then(function (res) {
                console.log("cree!!!");
            })
                .catch(function (res) {
                console.log("error creation, resp : " + res);
                if (res == ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS) {
                    _this.addErrorFormControlTitleUnique();
                }
            });
        }
    };
    BookAddComponent.prototype.resetFormControlTitleUnique = function () {
        var formControlTitleUnique = this.form.get("titleUnique");
        formControlTitleUnique.setErrors(null);
    };
    BookAddComponent.prototype.addErrorFormControlTitleUnique = function () {
        var formControlTitleUnique = this.form.get("titleUnique");
        formControlTitleUnique.setErrors({
            "notUnique": true
        });
    };
    BookAddComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            coverPic: new forms_1.FormControl(''),
            filesToUpload: new forms_1.FormControl(''),
            titleUnique: new forms_1.FormControl('')
        });
    };
    BookAddComponent = __decorate([
        core_1.Component({
            selector: 'book-add',
            providers: [book_service_1.BookService],
            templateUrl: 'app/book/book-add/book-add.component.html',
            styleUrls: ['app/book/book-add/book-add.component.css']
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService, router_1.Router, forms_1.FormBuilder])
    ], BookAddComponent);
    return BookAddComponent;
}());
exports.BookAddComponent = BookAddComponent;
//# sourceMappingURL=book-add-component.js.map