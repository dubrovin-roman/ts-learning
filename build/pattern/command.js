"use strict";
class CommandHistory {
    constructor() {
        this.commands = [];
    }
    push(command) {
        this.commands.push(command);
    }
    remove(command) {
        this.commands = this.commands.filter((c) => c.commandId !== command.commandId);
    }
}
class AbstractCommand {
    constructor(history) {
        this.history = history;
        this.commandId = Math.random();
    }
}
class AddUserCommand extends AbstractCommand {
    constructor(user, receiver, history) {
        super(history);
        this.user = user;
        this.receiver = receiver;
    }
    execute() {
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
    constructor(userId) {
        this.userId = userId;
    }
}
class UserService {
    saveUser(user) {
        console.log(`В БД добавлен пользователь с id ${user.userId}`);
    }
    deleteUser(userId) {
        console.log(`Из БД удален пользователь с id ${userId}`);
    }
}
class UserController {
    constructor() {
        this.history = new CommandHistory();
    }
    setReceiver(receiver) {
        this.receiver = receiver;
    }
    run() {
        const addUserCommand = new AddUserCommand(new UserC(1), this.receiver, this.history);
        addUserCommand.execute();
        console.log(this.history);
        addUserCommand.undo();
        console.log(this.history);
    }
}
const userController = new UserController();
userController.setReceiver(new UserService());
userController.run();
