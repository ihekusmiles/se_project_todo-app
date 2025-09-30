import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// Instantiating TodoCounter class.
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Form elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

// Handle check function
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false); // Decreased the completed count (only when deleting completed items)
  }
  todoCounter.updateTotal(false); // Decreased the total count (needed for ALL deletions)
}

// Creating new instance of child class PopupWithForm
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    // Create unique ID's with uuiv4
    const id = uuidv4();
    const values = { name, date, id, completed: false };
    const todoElement = generateTodo(values, ".todo");
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    // Call resetValidation method to reset form and disable button
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

// Calling setEventListener method
addTodoPopup.setEventListeners();

// Instatiating Section class
const section = new Section({
  items: initialTodos, // pass initial todos
  renderer: (item) => {
    const todoElement = generateTodo(item, ".todo");
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

// Calling  section instance's renderItems method.
section.renderItems();

function generateTodo(data, selector) {
  const todoInstance = new Todo(data, selector, handleCheck, handleDelete);
  const todoElement = todoInstance.getView();
  return todoElement;
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Creating an instance of the FormValidator class and calling its enableValidation() method.
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
