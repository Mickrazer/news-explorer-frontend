import MainApi from './js/api/mainApi';
import Article from './js/components/article';
import PopupIn from './js/components/popupIn';
import PopupReg from './js/components/popupReg';
import PopupCard from './js/components/popupCard';
import NewsApi from './js/api/newsApi';
import SearchResults from './js/components/searchResults';
import newsApiToken from './js/constants/newsApiToken';
import mainApiAdress from './js/constants/mainApiAdress';
import errorHandler from './js/utils/errorHandler';


import {
  burgerButton,
  headerMenu,
  header,
  headerButton,
  popup,
  popupRegButton,
  popupReg,
  inButton,
  headerLogoutButton,
  saveArticles,
  showMoreButton,
  searchForm,
  preloader
} from './js/constants/constants';

let isLoggin;
const searchInput = searchForm.elements.keyWord;

const mainApi = new MainApi(mainApiAdress);
const newsApi = new NewsApi(`apiKey=${newsApiToken}`);
const searchResults = new SearchResults();
const inPopup = new PopupCard(popup, headerButton);
const regPopup = new PopupReg(popupReg, popupRegButton);
const signIn = new PopupIn(popup, inButton);

//открытие бургер меню
burgerButton.addEventListener('click', function(){
	event.preventDefault();
	headerMenu.classList.toggle('active');
	header.classList.toggle('active');
	burgerButton.classList.toggle('header__burger-button_close');
});

function logout() {
    mainApi.userLogout().then((res) => {
      headerButton.classList.remove('disabled');
      saveArticles.classList.add('disabled');
      headerLogoutButton.classList.add('disabled');
      isLoggin = false;
    })
    .catch((err) => {
      errorHandler(err);
    })
  }
headerLogoutButton.addEventListener('click', logout);

//Проверка залогинен ли пользователь
mainApi.getUser().then((res) => {
  headerLogoutButton.textContent=res.name.name;
  const logoutButton = document.createElement('button');
  logoutButton.classList.add('header__logout-white');
  headerLogoutButton.appendChild(logoutButton);
  saveArticles.classList.remove('disabled');
  headerButton.classList.add('disabled');
  isLoggin = true;
})
  .catch((err) => {
    errorHandler(err);
    headerLogoutButton.classList.add('disabled');
    isLoggin = false;
  })

//работа кнопки Искать
function search(event) {
  event.preventDefault();
  searchResults.renderResults();
  const keyword = searchInput.value;
  const pageSize = 20;
  preloader.classList.remove('disabled');
  newsApi.getNews(pageSize, keyword).then((res)=> {
    const articlesArray = res.articles.map((item) => new Article(mainApi, item, keyword, isLoggin));
    if (res.articles.length === 0) {
      searchResults.showError();
    } else {
      searchResults.addArticle(articlesArray);
    }
    showMoreButton.removeAttribute('disabled');
  })
  .catch((err) => {
    errorHandler(err);
  })
}
searchForm.addEventListener('submit',  search);
