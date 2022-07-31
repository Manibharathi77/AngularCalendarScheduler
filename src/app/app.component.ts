import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarSchedulerEvent, CalendarSchedulerEventAction, CalendarSchedulerEventStatus } from 'angular-calendar-scheduler';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { ScheduleDetails } from './interfaces/scheduledetails';
import { UserSchedule } from './interfaces/userSchedule';
import { ApiService } from './services/api.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    

    @ViewChild(SchedulerComponent) appScheduler : SchedulerComponent;

    apiScheduledEvents: ScheduleDetails[];
    events: CalendarSchedulerEvent[];
    actions: CalendarSchedulerEventAction[] = [
        {
            when: 'enabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
            title: 'Delete',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Delete\' on event ' + event.id);
            }
        },
        {
            when: 'disabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
            title: 'Restore',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Restore\' on event ' + event.id);
            }
        }
    ];

    
    constructor(private apiService: ApiService){

    }
    ngOnInit(): void {

        this.apiService.getSchedules().subscribe(
            {
                next: (data) => {
                    console.log(data);
                    this.apiScheduledEvents = data;
                    this.getCustomScheduledEvents();
                },
                error: (error) => console.log(error)
            }
        );
    }
    getCustomScheduledEvents() {
        console.log(this.apiScheduledEvents);
        let customScheduleEvent:CalendarSchedulerEvent[] = [];
        for(let event of this.apiScheduledEvents) {

            let customeEvent =  <CalendarSchedulerEvent>{
            id: event.schedule_id,
            start: new Date(event.start_timestamp),
            end: new Date(event.end_timestamp),
            title: event.title,
            content: event.content,
            color: { primary: '#3f51b5', secondary: '#3f51b5' },
            actions: this.actions,
            // status: 'ok' as CalendarSchedulerEventStatus,s
            isClickable: false,
            isDisabled: true
            };
            
            console.log(customeEvent);
            customScheduleEvent.push(customeEvent)
        }
        this.events = customScheduleEvent;
    }

   
    formUserSelectedEvent(data: UserSchedule){

        let customeEvent =  <CalendarSchedulerEvent> {
            id: "88",
            start: new Date(data.startDate),
            end: new Date(data.endDate),
            title: "Current Selection",
            content: "this is your current selection",
            color: { primary: '#009900', secondary: '#009900' },
            actions: this.actions,
            // status: 'ok' as CalendarSchedulerEventStatus,
            isClickable: false,
            isDisabled: true
            };
        this.events.push(customeEvent);
        this.appScheduler.refreshEvents();
      }

    resetUserSchedule(data: UserSchedule){

        this.events.pop();
        let customeEvent =  <CalendarSchedulerEvent> {
            id: "88",
            start: null,
            end: null,
            title: "Current Selection",
            content: "this is your current selection",
            color: { primary: '#3f51b5', secondary: '#3f51b5' },
            actions: this.actions,
            // status: 'ok' as CalendarSchedulerEventStatus,
            isClickable: false,
            isDisabled: true
            };
        this.events.push(customeEvent);
        this.appScheduler.refreshEvents();
        
    }
}