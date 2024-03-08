import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Sport } from '../../shared/models/sport';
import { SportService } from '../../core/services/sport.service';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../shared/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    content: new FormControl(""),
    start_date_time: new FormControl(""),
    end_date_time: new FormControl(""),
    guests: new FormControl(""),
    sportIds: new FormArray([]), // array of sportIds
  })

  sports: Sport[] = []

  constructor(private sportService:SportService, private eventService:EventService, private router:Router) {}

  ngOnInit(): void {
    this.loadSportIds();
  }

  addSportToForm(){
    (this.eventForm.get("sportIds") as FormArray).push(new FormControl(false))
  }

  loadSportIds(){

    // send a get request to get all sports to add to form
        this.sportService.getSports().subscribe({
      next:(sports:any) => {
        // get property for sports to iterate it to add to input form
        this.sports = sports;
        sports.forEach((sport:Sport)=>{
          this.addSportToForm()
        })
      },
      error: (error) => {
        console.log(error)
      },
    });
  }

  // gather sportIds to use in template form
  get sportIds(): FormArray{
    return this.eventForm.get("sportIds") as FormArray
  }

  onCreateEvent() {
    const sportIdsFormValue = this.eventForm.value.sportIds;
    const sportIds = sportIdsFormValue.map((checked:boolean, i:number) =>{
      return checked ? this.sports[i].id : null
    }).filter((id:any) => {
      return id !== null
    })
    const event:Event = {
      sport_ids: sportIds,
      ...this.eventForm.value
    }
    this.eventService.createEvent(event).subscribe({
      next: () => {
        this.router.navigate(['/events'])
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // track the ids given in inputform, extract the id,
  // map use to see the value of the sportid if it is true (if it is checked in the form).
  // if checked is true, return the id of the sport (sport.id, otherwise, return null
  // use filter to remove null in the array, only get the sport.id
  // include sportIds and eventForm.value to post to createEvent
  // then navigate to event page

}
