const todoTemplate = document.querySelector("#todo-template");

class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._selector = selector;
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }
  _getTemplate() {
    const todoElement = todoTemplate.content

      .querySelector(this._selector)
      .cloneNode(true);
    return todoElement;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    this._todoCompleted.addEventListener("change", () => {
      this._handleCheck(this._todoCompleted.checked);
    });
  }

  getView() {
    this._todoElement = this._getTemplate();
    // Cached variables
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoName = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoCompleted = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoName.textContent = this._name;

    this._todoCompleted.checked = this._completed;
    // Apply id and for attributes. The id will initially be undefined for new todos.
    this._todoCompleted.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);

    this._setEventListeners();
    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._todoDate.textContent = "";
    }
    return this._todoElement;
  }
}

export default Todo;
