import MainApi from './api/mainApi';
import Articles from './components/articles';
import NewsApi from './api/newsApi';
import Favorites from './components/favorites';
import SaveArticlesResults from './components/saveArticlesResults';
import newsApiToken from './constants/newsApiToken';
import mainApiAdress from './constants/mainApiAdress';
import errorHandler from './utils/errorHandler';
import {
  headerSaveArticles,
  articlesText,
  articlesUser,
  keyContainer,
} from './constants/constants';

const mainApi = new MainApi(mainApiAdress);
const saveArticlesResults = new SaveArticlesResults();
const favorites = new Favorites();
const newsApi = new NewsApi(`apiKey=${newsApiToken}`);
let isLoggin;

function renderSaveArticles() {
  mainApi.getUserArticles().then((res) => {
    const articlesArray = res.map((item) => new Articles(
      mainApi,
      item,
      isLoggin
    ));
    articlesArray.forEach((articles) => {
      articles.setReloadFunction(renderSaveArticles)
    });
    if(res.length === 0 ){
    articlesText.textContent = `у вас пока нет сохраненных статей`;
    } else {
    articlesText.textContent = `у вас ${res.length} сохраненных статей`;
    }
    favorites.render(articlesArray);
    saveArticlesResults.render(articlesArray)
  })
  .catch((err) => {
    errorHandler(err);
  })
}

mainApi.getUser().then((res) => {
  headerSaveArticles.textContent=res.name.name;
  articlesUser.textContent = `${res.name.name}`;
  let logoutButton = document.createElement('button');
  logoutButton.classList.add('header__logout');
  headerSaveArticles.appendChild(logoutButton);
  renderSaveArticles()
})
  .catch((err) => {
    errorHandler(err);
    headerLogoutButton.classList.add('disabled');
  })
