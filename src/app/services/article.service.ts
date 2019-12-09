import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  link = 'https://conduit.productionready.io/api/';

  constructor(private httpClient: HttpClient) { }

  getArticles(type, tag, author, favorited, limit, offset) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.get(`${this.link}articles/${type}?tag=${tag}&author=${author}&favorited=${favorited}&limit=${limit}&offset=${offset}`);
  }

  getArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      }
      );
    }
    return this.httpClient.get(`${this.link}articles/${slug}`);
  }

  createArticle(title, description, body, tagList) {
    return this.httpClient.post(`${this.link}articles`, {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  updateArticle(title, description, body, tagList, slug) {
    return this.httpClient.put(`${this.link}articles/${slug}`, {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  deleteArticle(slug) {
    return this.httpClient.delete(`${this.link}articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  addComments(slug, body) {
    return this.httpClient.post(`${this.link}articles/${slug}/comments`, {
      "comment": {
        "body": body
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  getComments(slug) {
    return this.httpClient.get(`${this.link}articles/${slug}/comments`, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Token ' + localStorage.getItem('api_token')
      // }
    });
  }

  deleteComment(slug, id) {
    return this.httpClient.delete(`${this.link}articles/${slug}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  favoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.post(`${this.link}articles/${slug}/favorite`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.post(`${this.link}articles/${slug}/favorite`, {});
  }

  unfavoriteArticle(slug) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.delete(`${this.link}articles/${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      });
    }
    return this.httpClient.delete(`${this.link}articles/${slug}/favorite`);
  }

  getTags() {
    return this.httpClient.get(`${this.link}tags`);
  }

}
