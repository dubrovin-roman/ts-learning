"use strict";
function run(db) {
    db.saveInDB("key", "myValue");
}
class KVDatabase {
    constructor() {
        this.db = new Map();
    }
    saveInDB(key, value) {
        this.db.set(key, value);
    }
}
class PersistentDB {
    savePersist(obj) {
        console.log(obj);
    }
}
class PersistentDBAdapter extends KVDatabase {
    constructor(persistentDB) {
        super();
        this.persistentDB = persistentDB;
    }
    saveInDB(key, value) {
        this.persistentDB.savePersist({ key, value });
    }
}
run(new PersistentDBAdapter(new PersistentDB()));
