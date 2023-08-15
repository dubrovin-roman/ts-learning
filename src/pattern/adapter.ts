function run(db: KVDatabase) {
  db.saveInDB("key", "myValue");
}

class KVDatabase {
  private db: Map<string, string> = new Map();

  saveInDB(key: string, value: string) {
    this.db.set(key, value);
  }
}

class PersistentDB {
  savePersist(obj: Object) {
    console.log(obj);
  }
}

class PersistentDBAdapter extends KVDatabase {
  constructor(private persistentDB: PersistentDB) {
    super();
  }

  override saveInDB(key: string, value: string): void {
    this.persistentDB.savePersist({ key, value });
  }
}

run(new PersistentDBAdapter(new PersistentDB()));