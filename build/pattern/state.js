"use strict";
class DocumentItem {
    constructor() {
        this.setState(new DraftDocumentItemState(this));
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    publishDoc() {
        this.state.publish();
    }
    deleteDoc() {
        this.state.delete();
    }
}
class DocumentItemState {
    constructor(item) {
        this.item = item;
    }
}
class DraftDocumentItemState extends DocumentItemState {
    constructor(item) {
        super(item);
        this.name = "DraftDocument";
    }
    publish() {
        console.log(`На сайт отправлен текст ${this.item.text}`);
        this.item.setState(new PublishDocumentItemState(this.item));
    }
    delete() {
        console.log("Документ удален.");
    }
}
class PublishDocumentItemState extends DocumentItemState {
    constructor(item) {
        super(item);
        this.name = "PublishDocument";
    }
    publish() {
        console.log("Документ уже опубликован.");
    }
    delete() {
        console.log("Документ снят с публикации.");
        this.item.setState(new DraftDocumentItemState(this.item));
    }
}
const doc = new DocumentItem();
doc.text = "text";
console.log(doc.getState());
doc.publishDoc();
console.log(doc.getState());
doc.publishDoc();
doc.deleteDoc();
console.log(doc.getState());
doc.deleteDoc();
