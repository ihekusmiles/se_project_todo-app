import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector }); // Object literal with property -> popupSelector: popupSelector
    this._popupForm = this._element.querySelector(".popup__form"); // Form element
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      console.log(inputValues);

      // Pass result of _getInputValues to submission handler

      this._handleFormSubmit(evt); // Gets call to handle the form submit
    });
  }

  _getInputValues() {
    const values = {};
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._inputList.forEach((input) => {
      // add a key/value pair for each input
      // key is input.name and value is input.value
      values[input.name] = input.value;
    });
    return values;
  }
}

export default PopupWithForm;
