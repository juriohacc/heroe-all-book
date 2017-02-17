"use strict";
var router_1 = require('@angular/router');
var heroes_component_1 = require('./heroes/heroes-list/heroes.component');
var dashboard_components_1 = require("./dashboard/dashboard.components");
var hero_detail_component_1 = require("./heroes/hero-detail/hero-detail.component");
var book_add_component_1 = require("./book/book-add/book-add-component");
var indispo_component_1 = require("./error/indispo/indispo-component");
var books_component_1 = require("./book/book-list/books.component");
var user_add_component_1 = require("./user/user-add/user-add-component");
var user_login_component_1 = require("./user/user-login/user-login-component");
var CanActivateAuthRequired_1 = require("./routing/CanActivateAuthRequired");
var my_written_books_component_1 = require("./book/my-written-book/my-written-books.component");
var book_edit_pages_component_1 = require("./book/book-edit-pages/book-edit-pages.component");
var unauthorized_component_1 = require("./error/unauthorized/unauthorized-component");
var appRoutes = [
    {
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'dashboard',
        component: dashboard_components_1.DashBoardComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    },
    {
        path: 'book',
        component: book_add_component_1.BookAddComponent,
        canActivate: [CanActivateAuthRequired_1.CanActivateAuthRequired]
    },
    {
        path: 'book/pages/edit/:id',
        component: book_edit_pages_component_1.BookEditPagesComponent
    },
    {
        path: 'user',
        component: user_add_component_1.UserAddComponent
    },
    {
        path: 'login',
        component: user_login_component_1.UserLoginComponent
    },
    {
        path: 'indispo',
        component: indispo_component_1.IndispoComponent
    },
    {
        path: 'unauthorized',
        component: unauthorized_component_1.UnauthorizedComponent
    },
    {
        path: 'allbooks',
        component: books_component_1.BooksComponent
    },
    {
        path: 'my-written-books',
        component: my_written_books_component_1.MyWrittenBookComponent,
        canActivate: [CanActivateAuthRequired_1.CanActivateAuthRequired]
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map