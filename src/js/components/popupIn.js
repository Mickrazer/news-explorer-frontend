import Popup from './popup';
import MainApi from '../api/mainApi';
import errorHandler from '../utils/errorHandler';

const mainApi = new MainApi('https://api.mestoekbmik.site');

import {
  popupClose,
  headerButton,
  popupReg,
  form,
  saveArticles,
  popup,
  popupButton,
  popupButtonReg,
  errorEmail,
} from '../constants/constants';

const inputEmail = form.elements.email;
const inputPas = form.elements.password;

export default class PopupIn extends Popup {
  constructor(popupElement, button) {
    super(popupElement);
    this.button = button;
    this.form = form;
    this.button.addEventListener('click', this.open);
    popupClose.addEventListener('click', this.close);
    this.form.addEventListener('submit', this._login);
    this.form.addEventListener('input', function() {
      if(form.checkValidity()){
        popupButton.classList.add('popup__button_active');
      } else {
        popupButton.classList.remove('popup__button_active');
      };
    })
  }
  open(e) {
    e.preventDefault();
    form.classList.remove('input-container__invalid');
    this.popupElement.classList.remove('disabled');
    popupReg.classList.add('disabled');
  }
  _login(e) {
    //блокировка полей формы и кнопки
    inputEmail.setAttribute('disabled', true);
    inputPas.setAttribute('disabled', true);
    popupButton.setAttribute('disabled', true);
    e.preventDefault();
    mainApi.userLogin(inputEmail.value, inputPas.value).then((res)=> {
      mainApi.getUser().then((res)=> {
        headerButton.textContent=res.name.name;
        const logoutButton = document.createElement('button');
        logoutButton.classList.add('header__logout-white');
        headerButton.appendChild(logoutButton);
        saveArticles.classList.remove('disabled');
        popup.classList.add('disabled');
        document.location.reload(true);
        inputEmail.value = '';
        inputPas.value = '';
        form.classList.remove('input-container__invalid');
        //разблокировка полей формы и кнопки
        inputEmail.removeAttribute('disabled');
        inputPas.removeAttribute('disabled');
        popupButton.removeAttribute('disabled');
      })
      .catch((err) => {
        errorHandler(err);
        //разблокировка полей формы и кнопки
        form.classList.add('input-container__invalid');
        inputEmail.removeAttribute('disabled');
        inputPas.removeAttribute('disabled');
        popupButton.removeAttribute('disabled');
      });
    })
    .catch((err) => {
      errorHandler(err);
    });
  }
}