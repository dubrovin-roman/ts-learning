"use strict";
class Notify {
    send(template, to) {
        console.log(`Отправляю ${template}: ${to}`);
    }
}
class MyLogger {
    log(message) {
        console.log(message);
    }
}
class Template {
    constructor() {
        this.templates = [
            { name: "other", template: "<h1>Шаблон</h1>" },
        ];
    }
    getByName(name) {
        return this.templates.find((t) => t.name === name);
    }
}
class NotificationFacade {
    constructor() {
        this.notify = new Notify();
        this.logger = new MyLogger();
        this.template = new Template();
    }
    sendTemplateMessage(to, templateName) {
        const templateMessage = this.template.getByName(templateName);
        if (!templateMessage) {
            this.logger.log(`Шаблона с именем ${templateName} не существует.`);
            throw new Error(`Шаблона с именем ${templateName} не существует.`);
        }
        this.logger.log(`Получен шаблон ${templateMessage.template}`);
        this.notify.send(templateMessage.template, to);
        this.logger.log(`Шаблон с именем ${templateName} успешно отправлен ${to}`);
    }
}
const service = new NotificationFacade();
service.sendTemplateMessage("my_email@yandex.ru", "other");
