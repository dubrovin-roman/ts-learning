"use strict";
class Lead {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}
class NewLead {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        if (this.observers.includes(observer))
            return;
        this.observers.push(observer);
    }
    detach(observer) {
        const indexObserver = this.observers.indexOf(observer);
        if (indexObserver === -1)
            return;
        this.observers = this.observers.splice(indexObserver, 1);
    }
    notify() {
        this.observers.forEach((ob) => ob.update(this));
    }
    setState(lead) {
        this.state = lead;
        this.notify();
    }
}
class NotificationService {
    update(subject) {
        console.log("NotificationService получил уведомление.");
        console.log(subject);
    }
}
class LeadService {
    update(subject) {
        console.log("LeadService получил уведомление.");
        console.log(subject);
    }
}
const lead = new Lead("Roman", "000000000");
const lead2 = new Lead("Valera", "000000000");
const subject = new NewLead();
const observer1 = new NotificationService();
const observer2 = new LeadService();
subject.attach(observer1);
subject.attach(observer2);
subject.setState(lead);
subject.detach(observer1);
subject.setState(lead2);
