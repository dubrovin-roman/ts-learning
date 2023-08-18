interface IObserver {
  update(subject: ISubject): void;
}

interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

class Lead {
  constructor(public name: string, public phone: string) {}
}

class NewLead implements ISubject {
  private observers: IObserver[] = [];
  public state: Lead;

  attach(observer: IObserver): void {
    if (this.observers.includes(observer)) return;
    this.observers.push(observer);
  }
  detach(observer: IObserver): void {
    const indexObserver = this.observers.indexOf(observer);
    if (indexObserver === -1) return;
    this.observers = this.observers.splice(indexObserver, 1);
  }
  notify(): void {
    this.observers.forEach((ob) => ob.update(this));
  }
  setState(lead: Lead): void {
    this.state = lead;
    this.notify();
  }
}

class NotificationService implements IObserver {
  update(subject: ISubject): void {
    console.log("NotificationService получил уведомление.");
    console.log(subject);
  }
}

class LeadService implements IObserver {
  update(subject: ISubject): void {
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