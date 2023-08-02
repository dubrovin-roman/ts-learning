"use strict";
class ALogger {
    printDate() {
        console.log(new Date());
    }
}
class LoggerExt extends ALogger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate();
        this.log(message);
    }
}
new LoggerExt().logWithDate("message");
