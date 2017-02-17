"use strict";
require("reflect-metadata");
var RoutingInjection_1 = require("../RoutingInjection");
function ControllerDecorator() {
    return function (targetClass) {
        RoutingInjection_1.RoutingExpressInjection.getInstance().addController(targetClass);
    };
}
exports.ControllerDecorator = ControllerDecorator;
//# sourceMappingURL=ControllerDecorator.js.map