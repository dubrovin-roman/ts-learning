"use strict";
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 0] = "SUCCESS";
    StatusCode[StatusCode["IN_PROCESS"] = 1] = "IN_PROCESS";
    StatusCode[StatusCode["FAILED"] = 2] = "FAILED";
})(StatusCode || (StatusCode = {}));
