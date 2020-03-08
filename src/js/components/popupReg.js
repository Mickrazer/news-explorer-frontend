import Popup from './popup';
import MainApi from '../api/mainApi';
import errorHandler from '../utils/errorHandler'

const mainApi = new MainApi('https://mestoekbmik.site');

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
    this.form.addEventListener('submit', this.registaration);
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
  registaration(e) {
    e.preventDefault();
    mainApi.userCreate(formRegName.value, formRegEmail.value, formRegPas.value).then((res)=> {
      popupReg.classList.add('disabled');
      formRegName.value = ''
      formRegEmail.value = '';
      formRegPas.value = '';
    })
    .catch((err) => {
      errorHandler(err);
    })
  }
}