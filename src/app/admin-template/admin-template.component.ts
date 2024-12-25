import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {
  public username!:string
  constructor(public authservice:AuthenticationService ,private router:Router){

  }
ngOnInit(): void {
  console.log(this.authservice.Role)
    this.username=this.authservice.username;
}
  login() {
    this.router.navigateByUrl("/login")
    }
logout() {
this.authservice.logout()
}


}
