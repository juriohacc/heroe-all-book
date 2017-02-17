"use strict";
var ConfigDev_1 = require("./ConfigDev");
var ConfigProd_1 = require("./ConfigProd");
var ConfigManager = (function () {
    function ConfigManager() {
    }
    ConfigManager.getCurrentConfig = function () {
        if (ConfigManager.config == null) {
            var env = process.env.NODE_ENV;
            if (env == "dev") {
                ConfigManager.config = new ConfigDev_1.ConfigDev();
            }
            else {
                ConfigManager.config = new ConfigProd_1.ConfigProd();
            }
        }
        return ConfigManager.config;
    };
    return ConfigManager;
}());
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=ConfigManager.js.map