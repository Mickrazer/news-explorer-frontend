import {
  popupClose,
  form,
  popupButton,
  popupButtonReg
} from '../constants/constants';

const inputEmail = form.elements.email;
const inputPas = form.elements.password;

export default class Popup {
  constructor(popupElement){
    this.popupElement = popupElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.popupClose = popupClose;
    this.popupClose.addEventListener('click', this.close);
  }
  open() {
    this.popupElement.classList.remove('disabled');
    popupButton.classList.remove('popup__button_active');
    popupButtonReg.classList.remove('popup__button_active');
  }
  close() {
    this.popupElement.classList.add('disabled');
    inputEmail.value = '';
    inputPas.value = '';
  }
}