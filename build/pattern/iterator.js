"use strict";
class Task {
    constructor(priority) {
        this.priority = priority;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if (a.priority > b.priority) {
                return 1;
            }
            else if (a.priority === b.priority) {
                return 0;
            }
            else {
                return -1;
            }
        });
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getPriorityIterator() {
        this.sortByPriority();
        return new PriorityTaskListIterator(this);
    }
}
class PriorityTaskListIterator {
    constructor(taskList) {
        this.taskList = taskList;
        this.currentIndex = 0;
    }
    current() {
        return this.taskList.getTasks()[this.currentIndex];
    }
    next() {
        this.currentIndex++;
        return this.current();
    }
    prev() {
        this.currentIndex--;
        return this.current();
    }
    index() {
        return this.currentIndex;
    }
    haveNext() {
        const nextIndex = this.currentIndex + 1;
        const nextTask = this.taskList.getTasks()[nextIndex];
        if (nextTask)
            return true;
        return false;
    }
    havePrev() {
        const prevIndex = this.currentIndex - 1;
        const prevTask = this.taskList.getTasks()[prevIndex];
        if (prevTask)
            return true;
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
