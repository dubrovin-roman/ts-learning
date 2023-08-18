class Form {
  constructor(public name: string) {}
}

abstract class SendForm<T> {
  public save(form: Form) {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected abstract fill(form: Form): T;
  protected log(data: T) {
    console.log(data);
  }
  protected abstract send(data: T): void;
}

class FirstAPI extends SendForm<string> {
  protected override fill(form: Form): string {
    return form.name;
  }
  protected override send(data: string): void {
    console.log(`Send: ${data}`);
  }
}

class SecondAPI extends SendForm<{ name: string }> {
  protected override fill(form: Form): { name: string } {
    return { name: form.name };
  }
  protected override send(data: { name: string }): void {
    console.log(`Send: { name: ${data.name} }`);
  }
}

const myForm = new Form("new_form");

new FirstAPI().save(myForm);
new SecondAPI().save(myForm);