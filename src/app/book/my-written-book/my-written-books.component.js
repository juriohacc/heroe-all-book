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
var loader_service_1 = require("../../common/loader/loader-service");
var my_written_book_service_1 = require("../service/my-written-book.service");
var MyWrittenBookComponent = (function () {
    function MyWrittenBookComponent(myWrittenBookService, router, viewContainer, componentFactoryResolver, loaderService) {
        this.myWrittenBookService = myWrittenBookService;
        this.router = router;
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.loaderService = loaderService;
        this.loaderComponent = loaderService.addLoaderComponent(viewContainer);
    }
    MyWrittenBookComponent.prototype.editPages = function (book) {
        this.router.navigate(['/book/pages/edit', book.id]);
    };
    MyWrittenBookComponent.prototype.getBooks = function () {
        var _this = this;
        this.loaderComponent.instance.show();
        this.myWrittenBookService.findMyBooks().
            then(function (books) {
            console.log("books retreived : " + books);
            _this.books = books;
            _this.loaderComponent.instance.hide();
        });
    };
    MyWrittenBookComponent.prototype.ngOnInit = function () {
        this.getBooks();
    };
    MyWrittenBookComponent = __decorate([
        core_1.Component({
            selector: 'my-heroes',
            providers: [my_written_book_service_1.MyWrittenBookService, loader_service_1.LoaderService],
            templateUrl: 'app/book/my-written-book/my-written-books.component.html',
            styleUrls: ['app/book/my-written-book/my-written-books.component.css']
        }), 
        __metadata('design:paramtypes', [my_written_book_service_1.MyWrittenBookService, router_1.Router, core_1.ViewContainerRef, core_1.ComponentFactoryResolver, loader_service_1.LoaderService])
    ], MyWrittenBookComponent);
    return MyWrittenBookComponent;
}());
exports.MyWrittenBookComponent = MyWrittenBookComponent;
//# sourceMappingURL=my-written-books.component.js.map