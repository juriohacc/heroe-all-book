"use strict";
var ServiceStatusResponse_1 = require("../../../../server/common/repository/ServiceStatusResponse");
var HttpUtils = (function () {
    function HttpUtils() {
    }
    HttpUtils.find = function (statusCode) {
        switch (statusCode) {
            case 401:
                return ServiceStatusResponse_1.ServiceStatusResponse.UNAUTHORIZED;
            case 409:
                return ServiceStatusResponse_1.ServiceStatusResponse.RESOURCE_ALREADY_EXISTS;
            case 500:
                return ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR;
            default:
                return ServiceStatusResponse_1.ServiceStatusResponse.TECHNICAL_ERROR;
        }
        // for(var enumV in HttpStatusResponseMapper){
        //     if(parseInt(enumV) == statusCode){
        //         return  HttpStatusResponseMapper[<string>enumV];
        //     }
        //     return null;
        // }
    };
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
//# sourceMappingURL=HttpUtils.js.map