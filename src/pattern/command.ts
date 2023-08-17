class CommandHistory {
  private commands: AbstractCommand[] = [];

  push(command: AbstractCommand): void {
    this.commands.push(command);
  }

  remove(command: AbstractCommand): void {
    this.commands = this.commands.filter(
      (c) => c.commandId !== command.commandId
    );
  }
}

abstract class AbstractCommand {
  public commandId: number;

  constructor(public history: CommandHistory) {
    this.commandId = Math.random();
  }

  abstract execute(): void;
}

class AddUserCommand extends AbstractCommand {
  constructor(
    private user: UserC,
    private receiver: UserService,
    history: CommandHistory
  ) {
    super(history);
  }

  override execute(): void {
    this.receiver.saveUser(this.user);
    this.history.push(this);
  }

  // откат команды
  undo() {
    this.receiver.deleteUser(this.user.userId);
    this.history.remove(this);
  }
}

class UserC {
  constructor(public userId: number) {}
}

class UserService {
  saveUser(user: UserC) {
    console.log(`В БД добавлен пользователь с id ${user.userId}`);
  }

  deleteUser(userId: number) {
    console.log(`Из БД удален пользователь с id ${userId}`);
  }
}

class UserController {
  receiver: UserService;
  history: CommandHistory = new CommandHistory();

  setReceiver(receiver: UserService) {
    this.receiver = receiver;
  }

  run() {
    const addUserCommand = new AddUserCommand(
      new UserC(1),
      this.receiver,
      this.history
    );

    addUserCommand.execute();
    console.log(this.history);
    addUserCommand.undo();
    console.log(this.history);
  }
}

const userController = new UserController();
userController.setReceiver(new UserService());
userController.run();