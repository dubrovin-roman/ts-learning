interface IMediator {
  notify(sender: string, event: string): void;
}

abstract class Mediated {
  public mediator: IMediator;
  setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
}

class MyNotification {
  send(message: string): void {
    console.log(message);
  }
}

class MyLoggerNew {
  log(message: string): void {
    console.log(message);
  }
}

class EventHendler extends Mediated {
  event() {
    this.mediator.notify("EventHendler", "myEvent");
  }
}

class NotificationMediator implements IMediator {
  constructor(
    private notification: MyNotification,
    private logger: MyLoggerNew
  ) {}

  notify(sender: string, event: string): void {
    switch (event) {
      case "myEvent":
        this.logger.log(`Запись в логах: отправка сообщения от ${sender}`);
        this.notification.send(`сообщение отправленно`);
        break;
    }
  }
}

const logger = new MyLoggerNew();
const myNotification = new MyNotification();

const nMediator = new NotificationMediator(myNotification, logger);
const eventHendler = new EventHendler();
eventHendler.setMediator(nMediator);

eventHendler.event();