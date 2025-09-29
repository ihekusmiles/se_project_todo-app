import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Form elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todosList = document.querySelector(".todos__list");

// Creating new instance of child class PopupWithForm
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    // // Create a date object and adjust for timezone
    // const date = new Date(dateInput);
    // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    // // Create unique ID's with uuiv4
    // const id = uuidv4();
    // const values = { name, date, id, completed: false };
    // const todoElement = generateTodo(values, ".todo");
    // section.addItem(todoElement);
    // // Call resetValidation method to reset form and disable button
    // newTodoValidator.resetValidation();
    // addTodoPopup.close();
  },
});
// Calling setEventListener method
addTodoPopup.setEventListeners();

// Instantiating a Section class.
// In renderer: generate todo item, add it to the todo list.
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

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function generateTodo(data, selector) {
  const todoInstance = new Todo(data, selector);
  const todoElement = todoInstance.getView();
  return todoElement;
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//   // Create unique ID's with uuiv4
//   const id = uuidv4();
//   const values = { name, date, id, completed: false };
//   const todoElement = generateTodo(values, ".todo");
//   section.addItem(todoElement);
//   // Call resetValidation method to reset form and disable button
//   newTodoValidator.resetValidation();
//   addTodoPopup.close();
//   // closeModal(addTodoPopupEl); DELETE
// });

// Creating an instance of the FormValidator class and calling its
// enableValidation() method. It is here where the settings object and
// the formElement (addTodoForm) is passed.
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
