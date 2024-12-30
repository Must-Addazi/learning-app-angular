import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { StudentsService } from '../service/students.service';
import { AuthenticationService } from '../service/authentication.service';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileData!:Student
  isLoading = true;
  isDataChanged = false;
  isContentScrolled = false;

  constructor(
    private authService: AuthenticationService,
    private studentservice: StudentsService,  ) {}

  ngOnInit(): void {
    const profileId = this.authService.username;
    this.studentservice.getUserProfileByEmail(profileId).subscribe({
      next: (profileData) => {
        this.profileData = profileData;
        console.log(profileData)
      },
    });
  }
}