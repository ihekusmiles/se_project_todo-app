class Popup {
  constructor({ popupSelector }) {
    this._element = document.querySelector(popupSelector);
    this._popupCloseBtn = this._element.querySelector(".popup__close");
    // console.log(this._element);
  }
  open() {
    this._element.classList.add("popup_visible");
  }
  close() {
    this._element.classList.remove("popup_visible");
  }

  _handleEscapeClose() {
    // code here
  }
  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close(); // To call a method on the current instance use this.methodName()
    });

    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_visible")) {
        this.close();
      }
    });
  }
}
//Note: evt.currentTarget is what the element that has the event listener attached to it
// and evt.target is the speific element that is actually clicked
export default Popup;
