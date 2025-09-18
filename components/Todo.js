const todoTemplate = document.querySelector("#todo-template");

class Todo {
  constructor(data, selector) {
    this._selector = selector;
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
  }
  _getTemplate() {
    const todoElement = todoTemplate.content

      .querySelector(this._selector)
      .cloneNode(true);
    return todoElement;
  }

  _setEventListeners() {
    this._todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._todoElement.remove();
      });
  }

  getView() {
    this._todoElement = this._getTemplate();

    this._todoElement.querySelector(".todo__name").textContent = this._name;
    this._todoElement.querySelector(".todo__date").textContent = this._date;
    this._todoElement.querySelector(".todo__completed").checked =
      this._completed;
    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    this._todoElement.querySelector(".todo__completed").id = `todo-${this._id}`;
    this._todoElement
      .querySelector(".todo__label")
      .setAttribute("for", `todo-${this._id}`);

    this._setEventListeners();
    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoElement.querySelector(
        ".todo__date"
      ).textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    return this._todoElement;
  }
}

export default Todo;
