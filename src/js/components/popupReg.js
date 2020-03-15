import Popup from './popup';
import MainApi from '../api/mainApi';
import errorHandler from '../utils/errorHandler'

const mainApi = new MainApi('https://api.mestoekbmik.site');

import {
  popupClose,
  headerLogoutButton,
  regClose,
  formReg,
  popup,
  popupReg,
  popupButton,
  popupButtonReg
} from '../constants/constants';

const formRegName = formReg.elements.name;
const formRegEmail = formReg.elements.email;
const formRegPas = formReg.elements.password;

export default class PopupReg extends Popup {
  constructor(popupElement, button, signin) {
    super(popupElement);
    this.button = button;
    this.form = formReg;
    this.button.addEventListener('click', this.open);
    regClose.addEventListener('click', this.close);
    this.form.addEventListener('submit', this._registaration);
    this.headerLogoutButton = headerLogoutButton;
    this.form.addEventListener('input', function() {
      if(formReg.checkValidity()){
        popupButtonReg.classList.add('popup__button_active');
      } else {
        popupButtonReg.classList.remove('popup__button_active');
      };
    })
  }
  open(e) {
    e.preventDefault();
    popup.classList.add('disabled');
    this.popupElement.classList.remove('disabled');
  }
  _registaration(e) {
    e.preventDefault();
    formRegName.setAttribute('disabled', true);
    formRegEmail.setAttribute('disabled', true);
    formRegPas.setAttribute('disabled', true);
    popupButton.setAttribute('disabled', true);
    mainApi.userCreate(formRegName.value, formRegEmail.value, formRegPas.value).then((res)=> {
      popupReg.classList.add('disabled');
      formRegName.value = ''
      formRegEmail.value = '';
      formRegPas.value = '';
      formRegName.removeAttribute('disabled');
      formRegEmail.removeAttribute('disabled');
      formRegPas.removeAttribute('disabled');
      popupButton.removeAttribute('disabled');
      formReg.classList.remove('input-container__invalid');
    })
    .catch((err) => {
      errorHandler(err);
      formReg.classList.add('input-container__invalid');
      formRegName.removeAttribute('disabled');
      formRegEmail.removeAttribute('disabled');
      formRegPas.removeAttribute('disabled');
      popupButton.removeAttribute('disabled');
    })
  }
}