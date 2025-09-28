// This class adds elements to the DOM.
export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); // DOM element
  }
  // This public function creates and adds a single item to the page.
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }
  // Takes DOM element and adds it to the container.
  addItem(element) {
    this._container.append(element);
  }
}
