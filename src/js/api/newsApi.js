import moment from 'moment';
import resCheck from '../utils/resCheck';

moment().format();

export default class NewsApi {
  constructor(token) {
    this.url = 'https://newsapi.org/v2/everything?sortBy=popularity&';
    this.token = `${token}`
  }
  getNews(pageSize, keyword){
    const fromDate = moment().format('YYYY-MM-DD');
    const toDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return fetch(`${this.url}from=${fromDate}&to=${toDate}&pageSize=${pageSize}&q=${keyword}&${this.token}`)
      .then(resCheck);
  }
};

