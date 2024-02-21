import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../shared/models/post';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getTimelinePosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
  }
}
