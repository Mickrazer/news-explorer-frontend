const resultsContainer = document.querySelector('.results__cards');

export default class SaveArticlesResults {
  constructor() {
    this.resultsContainer = resultsContainer;
  }
  _clearResults() {
    while (this.resultsContainer.firstChild) {
      this.resultsContainer.removeChild(this.resultsContainer.firstChild)
    }
    this.articlesArray = [];
  }
  render(articlesArray) {
    this._clearResults();
    articlesArray.forEach((item) => {
    this.resultsContainer.appendChild(item.articleElement);
    })
  }
}