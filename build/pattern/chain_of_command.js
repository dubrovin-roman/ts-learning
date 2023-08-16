"use strict";
class AbstractMiddleware {
    next(mid) {
        this.nextMid = mid;
        return this.nextMid;
    }
    handle(request) {
        if (this.nextMid) {
            return this.nextMid.handle(request);
        }
        return;
    }
}
class AuthMiddleware extends AbstractMiddleware {
    handle(request) {
        console.log("AuthMiddleware");
        if (request.userId === 2) {
            super.handle(request);
        }
        else {
            console.log("Вы не авторизовались");
        }
    }
}
class ValidateMiddleware extends AbstractMiddleware {
    handle(request) {
        console.log("ValidateMiddleware");
        if (request.body) {
            super.handle(request);
        }
        else {
            console.log("У запроса отсутствует body");
        }
    }
}
class Controller extends AbstractMiddleware {
    handle(request) {
        console.log("Controller");
        console.log({ success: request });
    }
}
const auth = new AuthMiddleware();
const valid = new ValidateMiddleware();
const controller = new Controller();
auth.next(valid).next(controller);
auth.handle({ userId: 2, body: "some body" });
