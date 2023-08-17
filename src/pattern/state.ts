class DocumentItem {
  public text: string;
  private state: DocumentItemState;

  constructor() {
    this.setState(new DraftDocumentItemState(this));
  }

  getState(): DocumentItemState {
    return this.state;
  }

  setState(state: DocumentItemState): void {
    this.state = state;
  }

  publishDoc() {
    this.state.publish();
  }
  deleteDoc() {
    this.state.delete();
  }
}

abstract class DocumentItemState {
  public name: string;

  constructor(public item: DocumentItem) {}

  public abstract publish(): void;
  public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
  constructor(item: DocumentItem) {
    super(item);
    this.name = "DraftDocument";
  }

  public override publish(): void {
    console.log(`На сайт отправлен текст ${this.item.text}`);
    this.item.setState(new PublishDocumentItemState(this.item));
  }
  public override delete(): void {
    console.log("Документ удален.");
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor(item: DocumentItem) {
    super(item);
    this.name = "PublishDocument";
  }

  public override publish(): void {
    console.log("Документ уже опубликован.");
  }
  public override delete(): void {
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