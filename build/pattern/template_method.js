"use strict";
class Form {
    constructor(name) {
        this.name = name;
    }
}
class SendForm {
    save(form) {
        const res = this.fill(form);
        this.log(res);
        this.send(res);
    }
    log(data) {
        console.log(data);
    }
}
class FirstAPI extends SendForm {
    fill(form) {
        return form.name;
    }
    send(data) {
        console.log(`Send: ${data}`);
    }
}
class SecondAPI extends SendForm {
    fill(form) {
        return { name: form.name };
    }
    send(data) {
        console.log(`Send: { name: ${data.name} }`);
    }
}
const myForm = new Form("new_form");
new FirstAPI().save(myForm);
new SecondAPI().save(myForm);
