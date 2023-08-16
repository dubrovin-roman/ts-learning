interface IMiddleware {
  next(mid: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
  public nextMid: IMiddleware;

  next(mid: IMiddleware): IMiddleware {
    this.nextMid = mid;
    return this.nextMid;
  }
  handle(request: any) {
    if (this.nextMid) {
      return this.nextMid.handle(request);
    }
    return;
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log("AuthMiddleware");
    if (request.userId === 2) {
      super.handle(request);
    } else {
      console.log("Вы не авторизовались");
    }
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log("ValidateMiddleware");
    if (request.body) {
      super.handle(request);
    } else {
      console.log("У запроса отсутствует body");
    }
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any) {
    console.log("Controller");
    console.log({ success: request });
  }
}

const auth = new AuthMiddleware();
const valid = new ValidateMiddleware();
const controller = new Controller();

auth.next(valid).next(controller);

auth.handle({ userId: 2, body: "some body" });
