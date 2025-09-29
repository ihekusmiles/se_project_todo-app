class Popup {
  constructor({ popupSelector }) {
    this._element = document.querySelector(popupSelector);
    this._popupCloseBtn = this._element.querySelector(".popup__close");
  }

  open() {
    this._element.classList.add("popup_visible");
    this._handleKeydown = (evt) => {
      this._handleEscapeClose(evt);
    };
    document.addEventListener("keydown", this._handleKeydown);
  }

  close() {
    this._element.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleKeydown);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close(); // To call a method on the current instance use this.methodName()
    });

    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._element) {
        this.close();
      }
    });
  }
}

export default Popup;

//Note: evt.currentTarget is what the element that has the event listener attached to it
// and evt.target is the speific element that is actually clicked
// So on line 31: overlay click detection should check evt.target against the popup element itself
