interface IProvider {
  sendMessage(message: string): void;
  connect(config: string): void;
  disconnect(): void;
}

class TelegramProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disconnect(): void {
    console.log("Disconnect Telegram");
  }
}

class WhatsAppProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message);
  }
  connect(config: string): void {
    console.log(config);
  }
  disconnect(): void {
    console.log("Disconnect WhatsApp");
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}
  send(message: string) {
    this.provider.connect("Connect by Id");
    this.provider.sendMessage(message);
    this.provider.disconnect();
  }
}

class DelayedNotificationSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDelay(message: string, ms: number) {
    setTimeout(() => {
      super.send(message);
    }, ms);
  }
}

const telegramProvider = new TelegramProvider();
const whatsAppProvider = new WhatsAppProvider();

const telegramSender = new NotificationSender(telegramProvider);
telegramSender.send("message text telegram");

const whatsAppSender = new NotificationSender(whatsAppProvider);
whatsAppSender.send("message text whatsApp");

const telegramDelayedSender = new DelayedNotificationSender(telegramProvider);
telegramDelayedSender.sendDelay("message text delay telegram", 2000);
