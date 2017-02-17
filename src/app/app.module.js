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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var hero_detail_component_1 = require('./heroes/hero-detail/hero-detail.component');
var heroes_component_1 = require('./heroes/heroes-list/heroes.component');
var hero_service_1 = require('./heroes/common/hero.service');
var app_routing_1 = require('./app.routing');
var dashboard_components_1 = require("./dashboard/dashboard.components");
var http_1 = require('@angular/http');
var hero_search_component_1 = require("./heroes/hero-search/hero-search.component");
var book_add_component_1 = require("./book/book-add/book-add-component");
var book_service_1 = require("./book/service/book.service");
var CustomHttp_1 = require("./error/CustomHttp");
var router_1 = require("@angular/router");
var indispo_component_1 = require("./error/indispo/indispo-component");
var books_component_1 = require("./book/book-list/books.component");
var file_upload_component_1 = require("./common/fileupload/component/file-upload-component");
var loader_component_1 = require("./common/loader/loader.component");
var user_add_component_1 = require("./user/user-add/user-add-component");
var user_service_1 = require("./user/service/user.service");
var user_login_component_1 = require("./user/user-login/user-login-component");
var StorageService_1 = require("./common/storage/StorageService");
var ContextUserService_1 = require("./common/context/ContextUserService");
var CanActivateAuthRequired_1 = require("./routing/CanActivateAuthRequired");
var my_written_books_component_1 = require("./book/my-written-book/my-written-books.component");
var book_edit_pages_component_1 = require("./book/book-edit-pages/book-edit-pages.component");
var book_edit_pages_service_1 = require("./book/service/book-edit-pages.service");
var unauthorized_component_1 = require("./error/unauthorized/unauthorized-component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                hero_detail_component_1.HeroDetailComponent,
                heroes_component_1.HeroesComponent,
                dashboard_components_1.DashBoardComponent,
                hero_search_component_1.HeroSearchComponent,
                book_add_component_1.BookAddComponent,
                user_add_component_1.UserAddComponent,
                user_login_component_1.UserLoginComponent,
                indispo_component_1.IndispoComponent,
                books_component_1.BooksComponent,
                file_upload_component_1.FileUploadComponent,
                loader_component_1.CustomLoaderComponent,
                my_written_books_component_1.MyWrittenBookComponent,
                book_edit_pages_component_1.BookEditPagesComponent,
                unauthorized_component_1.UnauthorizedComponent
            ],
            providers: [
                hero_service_1.HeroService,
                book_service_1.BookService,
                user_service_1.UserService,
                StorageService_1.StorageService,
                ContextUserService_1.ContextUserService,
                book_edit_pages_service_1.BookEditPagesService,
                CanActivateAuthRequired_1.CanActivateAuthRequired,
                {
                    provide: http_1.Http, useFactory: function (backend, options, router, contextUserService) {
                        return new CustomHttp_1.CustomHttp(backend, options, router, contextUserService);
                    }, deps: [http_1.XHRBackend, http_1.RequestOptions, router_1.Router, ContextUserService_1.ContextUserService]
                },
            ],
            entryComponents: [loader_component_1.CustomLoaderComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map