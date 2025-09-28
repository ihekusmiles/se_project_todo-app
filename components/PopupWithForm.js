import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector }); // Object literal with property -> popupSelector: popupSelector
  }
  _getInputValues() {
    // code here
  }
}

export default PopupWithForm;
