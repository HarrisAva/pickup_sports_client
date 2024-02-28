import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // components subscribe to get notify on changes on the user (login/logout)
  currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  constructor(private http:HttpClient) { }

  setCurrentUser(user: User | null){
    this.currentUserBehaviorSubject.next(user); // get user from above
  }

  // define http get request to BE web bootstrap, to gather user info
  getBootstrapData(){
    return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(tap((res:any) => {
      this.setCurrentUser(res.current_user)
    })
    )
  }


      // tap does not change data from response
      // when get a response of current_user key with all info


  }


