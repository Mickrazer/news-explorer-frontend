const burgerButton = document.querySelector('.header__burger-button');

const headerMenu = document.querySelector('.header__menu');

const logo = document.querySelector('.header__logo');
const save = document.querySelector('.header__menu_active_black');
const glav = document.querySelector('.header__menu_info');
const login = document.querySelector('.header__menu_border');
const iconlogout = document.querySelector('.header__menu_logout')

const popup = document.querySelector('.popup');
const header = document.querySelector('.header');

burgerButton.addEventListener('click', function(){
event.preventDefault();
headerMenu.classList.toggle('active');
header.classList.toggle('active');
burgerButton.classList.toggle('header__burger-button_close');
});

//login.addEventListener('click', function(){
//	popup.classList.toggle('popup_is-opened');
//});