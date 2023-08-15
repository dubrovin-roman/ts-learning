"use strict";
class TelegramProvider {
    sendMessage(message) {
        console.log(message);
    }
    connect(config) {
        console.log(config);
    }
    disconnect() {
        console.log("Disconnect Telegram");
    }
}
class WhatsAppProvider {
    sendMessage(message) {
        console.log(message);
    }
    connect(config) {
        console.log(config);
    }
    disconnect() {
        console.log("Disconnect WhatsApp");
    }
}
class NotificationSender {
    constructor(provider) {
        this.provider = provider;
    }
    send(message) {
        this.provider.connect("Connect by Id");
        this.provider.sendMessage(message);
        this.provider.disconnect();
    }
}
class DelayedNotificationSender extends NotificationSender {
    constructor(provider) {
        super(provider);
    }
    sendDelay(message, ms) {
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
