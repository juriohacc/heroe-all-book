"use strict";
var winston_1 = require("winston");
var AuthentUtils = (function () {
    function AuthentUtils() {
    }
    AuthentUtils.login = function (req, resp, res) {
        req.login(resp.getUser(), function (err) {
            if (!err) {
                winston_1.info("after log session id : " + req.sessionID);
                res.sendStatus(200);
            }
            else {
                res.status(500).send({ error: "problem to login" });
            }
        });
    };
    AuthentUtils.checkUserIsLogged = function (req, res, next) {
        winston_1.info("check user is logged");
        if (req.user) {
            winston_1.info("=> user is logged");
            return res.sendStatus(200);
        }
        else {
            winston_1.info("user not logged");
            next();
        }
    };
    AuthentUtils.userShouldBeLogged = function (req, res, next) {
        winston_1.info("check user is logged");
        if (req.user) {
            winston_1.info("=> user is logged");
            next();
        }
        else {
            winston_1.info("user not logged");
            return res.sendStatus(401);
        }
    };
    return AuthentUtils;
}());
exports.AuthentUtils = AuthentUtils;
//# sourceMappingURL=AuthentUtils.js.map