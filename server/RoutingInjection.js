"use strict";
var winston_1 = require("winston");
var InputCtrl_1 = require("./common/InputCtrl");
var RoutingExpressInjection = (function () {
    function RoutingExpressInjection() {
        this.controllers = [];
        if (RoutingExpressInjection._instance) {
            throw new Error("Error: Instantiation failed. Singleton module! Use .getInstance() instead of new.");
        }
        RoutingExpressInjection._instance = this;
    }
    RoutingExpressInjection.getInstance = function () {
        return RoutingExpressInjection._instance;
    };
    RoutingExpressInjection.prototype.addController = function (targetClass) {
        winston_1.info("ctrl to add to injection " + targetClass.name);
        var ctrl = new targetClass();
        this.controllers.push(ctrl);
    };
    RoutingExpressInjection.prototype.init = function (pathControllers, app, multer, passport) {
        var files = require('glob').sync(pathControllers);
        files.forEach(function (file) {
            winston_1.info("current file to read : %s", file);
            require(file);
        });
        this.controllers.forEach(function (ctrl) {
            app.use('/api', ctrl.createRouter(new InputCtrl_1.InputCtrl(multer, passport)));
        });
    };
    RoutingExpressInjection._instance = new RoutingExpressInjection();
    return RoutingExpressInjection;
}());
exports.RoutingExpressInjection = RoutingExpressInjection;
//# sourceMappingURL=RoutingInjection.js.map