"use strict";
var UserAccountResp = (function () {
    function UserAccountResp(serviceResponse, user) {
        this.serviceResponse = serviceResponse;
        this.user = user;
    }
    UserAccountResp.createSuccessResponse = function (serviceResponse, user) {
        return new UserAccountResp(serviceResponse, user);
    };
    UserAccountResp.createFailResponse = function (serviceResponse) {
        return new UserAccountResp(serviceResponse, null);
    };
    UserAccountResp.prototype.getServiceResponse = function () {
        return this.serviceResponse;
    };
    UserAccountResp.prototype.getUser = function () {
        return this.user;
    };
    return UserAccountResp;
}());
exports.UserAccountResp = UserAccountResp;
//# sourceMappingURL=UserAccountResp.js.map