import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private router:Router, private userService:UserService) { }

  login(username:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`,
    {
      username,
      password
    }).pipe(switchMap((res:any)=> {
      this.setToken(res.token)
      return this.userService.getBootstrapData()
    }))
    // function return observable, expect the get back a token from BE
    // then use switchMap to setToken and call additional request to get user data
  }

  signup(data:any) {
    return this.http.post(`${environment.apiUrl}/users`, data)
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  //   // save token from response to local storage
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
