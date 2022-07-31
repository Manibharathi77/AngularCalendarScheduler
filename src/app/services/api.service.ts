import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { ScheduleDetails } from '../interfaces/scheduledetails';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  api_url = 'http://localhost:8080/api/';

  constructor(private httpService: HttpClient) { }

  getSchedules(): Observable<ScheduleDetails[]>{
    return this.httpService.get<ScheduleDetails[]>(this.api_url+'schedules');
  }

}
