import errorHandler from '../utils/errorHandler';

export default class Articles {
  constructor(mainApi, item, keyword, isLoggin) {
    this.mainApi = mainApi;
    this.keyword = keyword || item.keyword;
    this.url = item.url;
    this.title = item.title;
    this.description = item.description || item.text;
    this.image = item.urlToImage || item.image;
    this.source = item.source.name || item.source;
    this.date = item.publishedAt || item.date;
    this.isLoggin = isLoggin;
    this.id = item._id || null;
    this.searchArray =  [];
    this.getEventListener = this.getEventListener();
    this.articleElement = this.createDomElement();
    this.resultNotice = this.articleElement.querySelector('.results__notice');
    this.resultKeyword = this.articleElement.querySelector('.results__class');
    this.addToCollectionButton = this.articleElement.querySelector('.results__collection');
    this.deleteFromCollectionButton = this.articleElement.querySelector('.results__collection_delete');
    this.reloadFunction = null;
    if(this.id) {
      this.renderDeleteButton();
      this.resultKeyword.classList.remove('disabled');
    } else {
      this.renderAddButton();
    }
  }
  createDomElement() {

    let resultCard = document.createElement('div');
    resultCard.classList.add('results__card');

    let resultImage = document.createElement('div');
    resultImage.classList.add('results__image');
    resultImage.style.backgroundImage = `url(${this.image})`;

    let resultNotice = document.createElement('p');
    resultNotice.classList.add('results__notice');
    resultNotice.classList.add('disabled');

    let resultKeyword = document.createElement('p');
    resultKeyword.classList.add('results__notice');
    resultKeyword.classList.add('results__class');
    resultKeyword.classList.add('disabled');
    resultKeyword.textContent = this.keyword;

    let addToCollectionButton = document.createElement('button');
    addToCollectionButton.classList.add('results__collection');
    addToCollectionButton.classList.add('disabled');

    let deleteFromCollectionButton = document.createElement('button');
    deleteFromCollectionButton.classList.add('results__collection');
    deleteFromCollectionButton.classList.add('results__collection_delete');
    deleteFromCollectionButton.classList.add('disabled');

    let resultDescription = document.createElement('div');
    resultDescription.classList.add('results__description');

    let resultTitle = document.createElement('h3');
    resultTitle.classList.add('results__article-name');
    resultTitle.textContent = this.title;
    if (resultTitle.textContent.length>30){
      let resultTitleRestriction = resultTitle.textContent.slice(0,40);
      resultTitle.textContent = resultTitleRestriction + '...';
    }

    let resultSubtitle = document.createElement('p');
    resultSubtitle.classList.add('results__text');
    resultSubtitle.textContent = this.description;
    if (resultSubtitle.textContent.length>100 && resultTitle.textContent.length<40){
      let resultSubtitleRestriction = resultSubtitle.textContent.slice(0,190);
      resultSubtitle.textContent = resultSubtitleRestriction + '...';
    }
    else if (resultTitle.textContent.length>40) {
      let resultSubtitleRestriction = resultSubtitle.textContent.slice(0,100);
      resultSubtitle.textContent = resultSubtitleRestriction + '...';
    }

    let resultData = document.createElement('p');
    resultData.classList.add('results__data')
    let modifiedDate = new Date(this.date);
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    resultData.textContent = modifiedDate.toLocaleString("ru", options);

    let resultAuthor = document.createElement('p');
    resultAuthor.classList.add('results__author')
    resultAuthor.textContent = this.source;

    resultCard.appendChild(resultImage);
    resultImage.appendChild(resultNotice);
    resultImage.appendChild(resultKeyword);
    resultImage.appendChild(addToCollectionButton);
    resultImage.appendChild(deleteFromCollectionButton);
    resultCard.appendChild(resultDescription);
    resultDescription.appendChild(resultData);
    resultDescription.appendChild(resultTitle);
    resultDescription.appendChild(resultSubtitle);
    resultDescription.appendChild(resultAuthor);

    return resultCard;
  }

  renderAddButton() {
    this.addToCollectionButton.classList.remove('disabled');
    if(this.isLoggin) {
      this.addToCollectionButton.addEventListener('click', this.getEventListener.add);
    } else {
      this.addToCollectionButton.addEventListener('click', this.getEventListener.notLoggin);
    }
  }

  renderDeleteButton() {
    this.deleteFromCollectionButton.classList.remove('disabled');
    this.deleteFromCollectionButton.addEventListener('click', this.getEventListener.del)

  }
  getEventListener() {
    const add = function() {
      this.mainApi.addArticle(
        this.keyword,
        this.title,
        this.description,
        this.date,
        this.source,
        this.url,
        this.image,
        )
      .then((res) => {
        this.addToCollectionButton.classList.add('results__collection_add');
        this.resultNotice.classList.remove('disabled');
        this.resultNotice.textContent = 'Статья сохранена!'
        this.id = res.id;
      })
      .catch((err) => errorHandler(err));
    }.bind(this);
    const del = function () {
      this.mainApi.deleteArticle(this.id)
      .then(() => {
        this.reloadFunction();
        this.resultNotice.classList.remove('disabled');
        this.resultNotice.textContent = 'Статья удалена!'
      })
      .catch((err) => errorHandler(err));
    }.bind(this);

    const notLoggin = function () {
      this.resultNotice.classList.remove('disabled');
      this.resultNotice.textContent = 'Войдите, чтобы сохранять статью!'
    }.bind(this)

    return {add, del, notLoggin}
  }
  setReloadFunction(func) {
    this.reloadFunction = func;
  }
}