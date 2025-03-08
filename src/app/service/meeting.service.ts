import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient) { }
  createMeeting(): Observable<string> {
    return this.http.get<string>(`${environment.backendHost}/api/meetings/create`);
  }
}
