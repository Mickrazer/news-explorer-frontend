import { keyContainer } from '../constants/constants';

export default class Favorites {
  constructor() {
    this.keyArray = [];
    this.popularityArray = [];
    this.keyContainer = keyContainer;
  }
  render(articlesArray) {
    this.keyArray = [];
    articlesArray.forEach((item) => {
      this.keyArray.push(item.keyword);
    });
    this.popularityArray = [];
    this.keyArray.forEach((key) => {
      const exist = this.popularityArray.findIndex((item) => item.name === key);
      if(exist >= 0) {
        this.popularityArray[exist].sum ++;
      } else {
        this.popularityArray.push({name: key, sum: 1});
      }
    });
    this.popularityArray.sort((a, b) => b.sum - a.sum);


    this.keyContainer.textContent = '';
    if (this.popularityArray.length === 0) {
      this.keyContainer.textContent = 'Отсутствуют';
    } else if(this.popularityArray.length === 1 ) {
      this.keyContainer.textContent = `${this.popularityArray[0].name}`
    } else if (this.popularityArray.length === 2) {
      this.keyContainer.textContent = `${this.popularityArray[0].name} и ${this.popularityArray[1].name}`
    } else if(this.popularityArray.length === 3) {
      this.keyContainer.textContent = `${this.popularityArray[0].name}, ${this.popularityArray[1].name} и ${this.popularityArray[2].name}`
    } else {
      this.keyContainer.textContent = `${this.popularityArray[0].name}, ${this.popularityArray[1].name} и ${this.popularityArray.length - 2} другим`
    }
  }
}