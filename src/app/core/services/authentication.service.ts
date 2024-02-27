import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private router:Router) { }

  login(username:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`, {
      username,
      password
    })
    // function return observable, expect the get back a token from BE
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
    // save token from response to local storage
  }

  getToken() {
    return localStorage.getItem('token')
    // get token value from local storage
  }

  isLoggedIn() {
    return !!this.getToken();
    // if getToken return a value, it is true for isloggedIn
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    // when logout, remove token from local storage
    // then go to /login page
  }
}
