"use strict";
var ConfigDev = (function () {
    function ConfigDev() {
    }
    ConfigDev.prototype.getConfigCassandraAddress = function () {
        return "127.0.0.1:9042";
    };
    ConfigDev.prototype.getConfigRedisAddress = function () {
        return "redis://127.0.0.1:6379";
    };
    ConfigDev.prototype.getConfigCassandraKeyspace = function () {
        return "cassandrademocql";
    };
    return ConfigDev;
}());
exports.ConfigDev = ConfigDev;
//# sourceMappingURL=ConfigDev.js.map