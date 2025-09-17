import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

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

function generateTodo(data, selector) {}

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
