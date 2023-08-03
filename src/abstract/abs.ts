abstract class ALogger {
  abstract log(message: string): void;
  printDate(): void {
    console.log(new Date());
  }
}

class LoggerExt extends ALogger {
  log(message: string): void {
    console.log(message);
  }

  logWithDate(message: string): void {
    this.printDate();
    this.log(message);
  }
}

new LoggerExt().logWithDate("message");
