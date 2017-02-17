"use strict";
var bodyParser = require("body-parser");
var express = require('express');
var morgan = require('morgan');
var multer = require('multer');
var compression = require('compression');
var passport = require('passport');
var bCrypt = require('bCrypt-nodejs');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var Path = require("path");
require("reflect-metadata");
var RoutingInjection_1 = require("./RoutingInjection");
var winston_1 = require("winston");
var ConfigManager_1 = require("./config/ConfigManager");
var Server = (function () {
    function Server() {
        var storage = multer.memoryStorage();
        var upload = multer({ storage: storage });
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('short'));
        this.app.use(compression());
        this.initMiddlewareSession();
        this.initMiddlewareAuthent();
        RoutingInjection_1.RoutingExpressInjection.getInstance().init(Path.resolve(__dirname) + "/api/**/**Controller.js", this.app, upload, passport);
        //manage crash app
        process.on('uncaughtException', function (ex) {
            winston_1.error("uncaughtException " + ex);
        });
        this.app.use(this.errorHandler);
        var server = this.app.listen(6080, "localhost", function () {
            var _a = server.address(), address = _a.address, port = _a.port;
            console.log('Listening on http://localhost:' + port);
        });
    }
    Server.prototype.initMiddlewareSession = function () {
        // this.app.use(session({ secret: 'anything' }));
        this.app.use(session({
            store: new RedisStore({
                url: ConfigManager_1.ConfigManager.getCurrentConfig().getConfigRedisAddress()
            }),
            secret: "anything"
        }));
    };
    Server.prototype.initMiddlewareAuthent = function () {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    };
    Server.prototype.errorHandler = function (error, request, response, next) {
        if (response.headersSent) {
            return next(error);
        }
        response.status(error.status || 500).send("Internal Error");
        next(error);
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map