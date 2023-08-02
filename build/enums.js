"use strict";
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "success";
    StatusCode["IN_PROCESS"] = "in_process";
    StatusCode["FAILED"] = "failed";
})(StatusCode || (StatusCode = {}));
const result = {
    statusCode: StatusCode.SUCCESS,
    message: "перевод выполнен",
};
const userRole = 1 /* Role.ADMIN */;
