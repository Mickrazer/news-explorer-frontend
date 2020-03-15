import {
  popupClose,
  form,
  formReg,
  popupButton,
  popupButtonReg
} from '../constants/constants';

const inputEmail = form.elements.email;
const inputPas = form.elements.password;
const formRegName = formReg.elements.name;
const formRegEmail = formReg.elements.email;
const formRegPas = formReg.elements.password;

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
    this._clearWarning;
    form.classList.remove('input-container__invalid');
    formReg.classList.remove('input-container__invalid');
  }
  close() {
    this.popupElement.classList.add('disabled');
    inputEmail.value = '';
    inputPas.value = '';
    this._clearWarning;
    form.classList.remove('input-container__invalid');
    formReg.classList.remove('input-container__invalid');
    formRegName.value = ''
    formRegEmail.value = '';
    formRegPas.value = '';
  }
}