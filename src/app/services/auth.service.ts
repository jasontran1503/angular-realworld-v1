import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = false;

  constructor() { 
    if(localStorage.getItem('api_token')) {
      this.isAuth = true;
    }
  }

  logIn() {
    this.isAuth = true;
    return this.isAuth;
  }

  logOut() {
    this.isAuth = false;
    return this.isAuth;
  }

}
