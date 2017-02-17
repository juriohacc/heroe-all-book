'use strict';
var cassandra_driver_1 = require("cassandra-driver");
var ConfigManager_1 = require("../config/ConfigManager");
var CassandraOperations = (function () {
    function CassandraOperations() {
    }
    CassandraOperations.client = new cassandra_driver_1.Client({ contactPoints: [ConfigManager_1.ConfigManager.getCurrentConfig().getConfigCassandraAddress()], keyspace: ConfigManager_1.ConfigManager.getCurrentConfig().getConfigCassandraKeyspace() });
    return CassandraOperations;
}());
exports.CassandraOperations = CassandraOperations;
//# sourceMappingURL=CassandraOperations.js.map