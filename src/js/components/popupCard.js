import Popup from './popup';

export default class PopupCard extends Popup {
  constructor(popupElement, button) {
    super(popupElement);
    this.button = button;
    this.button.addEventListener('click', this.open);
  }
}