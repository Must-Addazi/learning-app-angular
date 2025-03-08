declare var JitsiMeetExternalAPI: any;

import { Component } from '@angular/core';
import { MeetingService } from '../service/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {

  domain = "meet.jit.si";
    meetingRoom!:any;
    api: any;
  
    constructor(private meetingService: MeetingService) {}
  
    createMeeting() {
      this.meetingService.createMeeting().subscribe({
next:(data)=>{
  this.meetingRoom = data
  this.startMeeting();

}
      });
    }
  
    startMeeting() {
      this.api = new JitsiMeetExternalAPI(this.domain, {
        roomName: this.meetingRoom,
        width: 800,
        height: 600,
        parentNode: document.querySelector('#meet')
      });
    }
  }
  
