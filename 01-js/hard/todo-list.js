/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  taskList = [];
  add(task) {
    this.taskList.push(task);
    return `taskAdded ${task}`;
  }

  update(index, task) {
    if (index >= this.taskList.length) {
      return;
    }
    this.taskList.splice(index, 1, task);
    return this.taskList;
  }
  remove(index) {
    this.taskList.splice(index, 1);
    return this.taskList;
  }
  get(index) {
    if (index >= this.taskList.length) {
      return null;
    }
    return this.taskList[index];
  }
  getAll() {
    return this.taskList;
  }
  clear() {
    this.taskList = [];
    return this.taskList;
  }
}

module.exports = Todo;
