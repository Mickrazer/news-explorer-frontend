import Popup from './popup';
import MainApi from '../api/mainApi';

const mainApi = new MainApi('https://mestoekbmik.site');


import {
  popupClose,
  headerButton,
  popupReg,
  form,
  saveArticles,
  popup,
  popupButton,
  popupButtonReg,
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
    this.form.addEventListener('submit', this.login);
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
    this.popupElement.classList.remove('disabled');
    popupReg.classList.add('disabled');

  }
  login(e) {
    e.preventDefault();
    mainApi.userLogin(inputEmail.value, inputPas.value).then((res)=> {
      mainApi.getUser().then((res)=> {
        headerButton.textContent=res.name.name;
        let logoutButton = document.createElement('button');
        logoutButton.classList.add('header__logout-white');
        headerButton.appendChild(logoutButton);
      })
      saveArticles.classList.remove('disabled');
      popup.classList.add('disabled');
      document.location.reload(true);
    })
    inputEmail.value = '';
    inputPas.value = '';
  }
}