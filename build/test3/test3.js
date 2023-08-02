"use strict";
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "success";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
function isIPaymentResponseSuccess(response) {
    return response.status === PaymentStatus.SUCCESS;
}
function getDatabaseIdSuccess(resp) {
    if (isIPaymentResponseSuccess(resp)) {
        return resp.data.databaseId;
    }
    else {
        throw new Error(`${resp.data.errorMessage}`);
    }
}
