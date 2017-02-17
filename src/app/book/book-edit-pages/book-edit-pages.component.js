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
var common_1 = require('@angular/common');
var book_edit_pages_service_1 = require("../service/book-edit-pages.service");
var bookPage_1 = require("./bookPage");
var forms_1 = require("@angular/forms");
var bookPageForm_1 = require("./bookPageForm");
var _ = require("lodash");
var BookEditPagesComponent = (function () {
    // currentBookPage : BookPageForm = new BookPageForm();
    function BookEditPagesComponent(bookEditPagesService, route, location, formBuilder) {
        this.bookEditPagesService = bookEditPagesService;
        this.route = route;
        this.location = location;
        this.formBuilder = formBuilder;
        this.bookPages = new Array();
        this.submitted = false;
    }
    BookEditPagesComponent.prototype.onSelect = function (bookPageSelected) {
        this.form.controls['contentText'].setValue(bookPageSelected.contentText);
        this.form.controls['numPage'].setValue(bookPageSelected.numPage);
    };
    BookEditPagesComponent.prototype.onSubmit = function (bookPageForm, valid) {
        var _this = this;
        this.submitted = true;
        console.log("form : ", bookPageForm);
        if (valid) {
            var bookPage_2 = new bookPage_1.BookPage(this.bookId, !_.isEmpty(bookPageForm.numPage) ? bookPageForm.numPage : this.bookPages.length + 1, bookPageForm.contentText, !_.isEmpty(bookPageForm.numPage) ? false : true);
            console.log("bookPage " + JSON.stringify(bookPage_2));
            this.bookEditPagesService.create(bookPage_2)
                .then(function (res) {
                console.log("cree!!!");
                if (bookPage_2.newPage) {
                    _this.bookPages.push(bookPage_2);
                }
            })
                .catch(function (res) {
                console.log("error creation, resp : " + res);
            });
        }
    };
    BookEditPagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.bookId = id;
            _this.bookEditPagesService.findPagesByBookId(id)
                .then(function (bookPages) {
                for (var _i = 0, bookPages_1 = bookPages; _i < bookPages_1.length; _i++) {
                    var bp = bookPages_1[_i];
                    var bookPageForm = new bookPageForm_1.BookPageForm();
                    bookPageForm.numPage = bp.numPage;
                    bookPageForm.contentText = bp.contentText;
                    _this.bookPages.push(bookPageForm);
                }
            });
        });
        this.form = this.formBuilder.group({
            contentText: new forms_1.FormControl('', forms_1.Validators.required),
            numPage: new forms_1.FormControl('')
        });
    };
    BookEditPagesComponent = __decorate([
        core_1.Component({
            selector: 'book-edit-pages',
            providers: [book_edit_pages_service_1.BookEditPagesService],
            templateUrl: 'app/book/book-edit-pages/book-edit-pages.component.html',
            styleUrls: ['app/book/book-edit-pages/book-edit-pages.component.css']
        }), 
        __metadata('design:paramtypes', [book_edit_pages_service_1.BookEditPagesService, router_1.ActivatedRoute, common_1.Location, forms_1.FormBuilder])
    ], BookEditPagesComponent);
    return BookEditPagesComponent;
}());
exports.BookEditPagesComponent = BookEditPagesComponent;
//# sourceMappingURL=book-edit-pages.component.js.map