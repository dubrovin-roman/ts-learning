class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  public addTask(task: Task): void {
    this.tasks.push(task);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public count(): number {
    return this.tasks.length;
  }
}
