import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../../shared/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  // get all events
  getEvents(page:number){
    return this.http.get<Event[]>(`${environment.apiUrl}/events?page=${page}`)
  }

  // get a single event, passing event.id
  getEvent(id:string | number){
    return this.http.get<Event>(`${environment.apiUrl}/events/${id}`)
  }

  // http post to create an event with form data
  createEvent(event:Event){
    return this.http.post(`${environment.apiUrl}/events`, event)
  }
}
