"use strict";
var ConfigProd = (function () {
    function ConfigProd() {
    }
    ConfigProd.prototype.getConfigCassandraAddress = function () {
        return "dazdaz";
    };
    ConfigProd.prototype.getConfigCassandraKeyspace = function () {
        return "daz";
    };
    ConfigProd.prototype.getConfigRedisAddress = function () {
        return "redis://127.0.0.1:6379";
    };
    return ConfigProd;
}());
exports.ConfigProd = ConfigProd;
//# sourceMappingURL=ConfigProd.js.map