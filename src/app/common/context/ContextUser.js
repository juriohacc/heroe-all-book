"use strict";
var ContextUser = (function () {
    function ContextUser() {
        this.logged = false;
    }
    ContextUser.prototype.setLogged = function (val) {
        this.logged = val;
    };
    ContextUser.prototype.isLogged = function () {
        return this.logged;
    };
    return ContextUser;
}());
exports.ContextUser = ContextUser;
//# sourceMappingURL=ContextUser.js.map