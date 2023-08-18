class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.priority > b.priority) {
        return 1;
      } else if (a.priority === b.priority) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public count(): number {
    return this.tasks.length;
  }

  public getPriorityIterator(): IIterator<Task> {
    this.sortByPriority();
    return new PriorityTaskListIterator(this);
  }
}

interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
  haveNext(): boolean;
  havePrev(): boolean;
}

class PriorityTaskListIterator implements IIterator<Task> {
  private currentIndex: number = 0;

  constructor(private taskList: TaskList) {}

  current(): Task | undefined {
    return this.taskList.getTasks()[this.currentIndex];
  }
  next(): Task | undefined {
    this.currentIndex++;
    return this.current();
  }
  prev(): Task | undefined {
    this.currentIndex--;
    return this.current();
  }
  index(): number {
    return this.currentIndex;
  }
  haveNext(): boolean {
    const nextIndex = this.currentIndex + 1;
    const nextTask = this.taskList.getTasks()[nextIndex];
    if (nextTask) return true;
    return false;
  }
  havePrev(): boolean {
    const prevIndex = this.currentIndex - 1;
    const prevTask = this.taskList.getTasks()[prevIndex];
    if (prevTask) return true;
    return false;
  }
}

const taskList = new TaskList();
taskList.addTask(new Task(30));
taskList.addTask(new Task(5));
taskList.addTask(new Task(11));
taskList.addTask(new Task(3));
taskList.addTask(new Task(20));
taskList.addTask(new Task(8));

const priorityIterator = taskList.getPriorityIterator();
console.log(priorityIterator.current());
console.log(priorityIterator.havePrev());
console.log(priorityIterator.next());
console.log(priorityIterator.next());
console.log(priorityIterator.next());
console.log(priorityIterator.next());
console.log(priorityIterator.haveNext());
console.log(priorityIterator.next());
console.log(priorityIterator.haveNext());
console.log(priorityIterator.prev());