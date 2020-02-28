const burgerButton = document.querySelector('.header__burger-button');
const headerMenu = document.querySelector('.header__menu');
const header = document.querySelector('.header');

burgerButton.addEventListener('click', function(){
	event.preventDefault();
	headerMenu.classList.toggle('active');
	header.classList.toggle('active');
	burgerButton.classList.toggle('header__burger-button_close');
});
