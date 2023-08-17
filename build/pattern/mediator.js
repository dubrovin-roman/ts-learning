"use strict";
class Mediated {
    setMediator(mediator) {
        this.mediator = mediator;
    }
}
class MyNotification {
    send(message) {
        console.log(message);
    }
}
class MyLoggerNew {
    log(message) {
        console.log(message);
    }
}
class EventHendler extends Mediated {
    event() {
        this.mediator.notify("EventHendler", "myEvent");
    }
}
class NotificationMediator {
    constructor(notification, logger) {
        this.notification = notification;
        this.logger = logger;
    }
    notify(sender, event) {
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
