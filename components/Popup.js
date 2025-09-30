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
      this.close();
    });

    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._element) {
        this.close();
      }
    });
  }
}

export default Popup;
