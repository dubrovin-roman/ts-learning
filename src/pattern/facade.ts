class Notify {
  send(template: string, to: string) {
    console.log(`Отправляю ${template}: ${to}`);
  }
}

class MyLogger {
  log(message: string) {
    console.log(message);
  }
}

class Template {
  private templates: { name: string; template: string }[] = [
    { name: "other", template: "<h1>Шаблон</h1>" },
  ];

  getByName(name: string) {
    return this.templates.find((t) => t.name === name);
  }
}

class NotificationFacade {
    private notify: Notify;
    private logger: MyLogger;
    private template: Template;
  
    constructor() {
        this.notify = new Notify();
        this.logger = new MyLogger();
        this.template = new Template();
    }

  sendTemplateMessage(to: string, templateName: string) {
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