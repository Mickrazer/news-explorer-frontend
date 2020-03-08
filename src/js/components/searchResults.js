import {
  preloader,
  resultsError,
  resultsFind,
  resultsContainer,
  showMoreButton,
} from '../constants/constants';

export default class SearchResults {
  constructor() {
    this.preloader = preloader;
    this.resultsError = resultsError;
    this.resultsFind = resultsFind;
    this.resultsContainer = resultsContainer;
    this.articlesArray = [];
    showMoreButton.addEventListener('click',  (event) => {
      event.preventDefault();
      this.showResults();
    });
  }
  renderResults() {
    this.resultsFind.classList.add('disabled');
    this.preloader.classList.remove('disabled');
    this.resultsError.classList.add('disabled');
  }
  showResults() {
    this.resultsFind.classList.remove('disabled');
    this.resultsContainer.classList.remove('disabled');
    this.preloader.classList.add('disabled');
    this.resultsError.classList.add('disabled');
    for (let i = 0; i<3; i++){
    showMoreButton.classList.remove('disabled');
      if(this.articlesArray.length > 0) {
        this.resultsContainer.appendChild(this.articlesArray[0].articleElement);
        this.articlesArray.shift();
      }
    }
    if(this.articlesArray.length === 0){
        showMoreButton.classList.add('disabled');
    }
  }
  showError() {
    this.preloader.classList.add('disabled');
    this.resultsError.classList.remove('disabled');
  }

  clearResults() {
    while (this.resultsContainer.firstChild) {
      this.resultsContainer.removeChild(this.resultsContainer.firstChild)
    }
    this.articlesArray = [];
  }

  addArticle(articlesArray){
    this.clearResults();
    this.articlesArray = articlesArray;
    this.showResults();
  }
}