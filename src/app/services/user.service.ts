import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogin = false;
  currentUserName;
  userUpdated;
  link = 'https://conduit.productionready.io/api/';
  public subject = new Subject();
  name: string;
  image: string;
  userName: string;


  constructor(private httpClient: HttpClient) { }

  next(name: string, image: string) {
    this.name = name;
    this.image = image;
    this.subject.next({name: this.name, image: this.image});
  }

  setCurrentUserNameImg({ userName, image }) {
    this.userName = userName;
    this.image = image;
  }

  getCurrentUserNameImg() {
    return { userName: this.userName, image: this.image };
  }


  logIn(email, password) {
    return this.httpClient.post(`${this.link}users/login`, {
      "user": {
        "email": email,
        "password": password,
      }
    })
  }

  register(username, email, password) {
    return this.httpClient.post(`${this.link}users`, {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    })
  }

  getCurrentUser() {
    return this.httpClient.get(`${this.link}user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    });
  }

  updateUser(imgURL, userName, bio, email, password) {
    return this.httpClient.put(`${this.link}user`, {
      "user": {
        "email": email,
        "bio": bio,
        "image": imgURL,
        "username": userName,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      }
    })
  }

  setCurrentUserName(currentUserName) {
    this.currentUserName = currentUserName;
  }

  getCurrentUserName() {
    return this.currentUserName;
  }

  getProfile(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.get(`${this.link}profiles/${userName}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      }
      );
    }
    return this.httpClient.get(`${this.link}profiles/${userName}`);
  }

  followUser(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.post(`${this.link}profiles/${userName}/follow`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      })
    }
    return this.httpClient.post(`${this.link}profiles/${userName}/follow`, {});
  }

  unfollowUser(userName) {
    if (localStorage.getItem('api_token')) {
      return this.httpClient.delete(`${this.link}profiles/${userName}/follow`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('api_token')
        }
      })
    }
    return this.httpClient.delete(`${this.link}profiles/${userName}/follow`);
  }

}
