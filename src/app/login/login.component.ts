import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public LoginFormGroup!:FormGroup
 public ErrorMassage!:string
 constructor( public fb:FormBuilder,
  private authservice:AuthenticationService,
private router:Router
){

}
ngOnInit(): void {
this.LoginFormGroup= this.fb.group({
username:this.fb.control(""),
password:this.fb.control("")
})
}
login() {
let username= this.LoginFormGroup.value.username;
let password= this.LoginFormGroup.value.password;
this.authservice.login(username,password).subscribe({
  next:(data)=>{
    this.authservice.loadProfile(data)
    this.router.navigateByUrl("/admin/dashboard")
  },
  error:(err)=>
    this.ErrorMassage=err
})
}
hide = signal(true);
clickEvent(event: MouseEvent) {
  this.hide.set(!this.hide());
  event.stopPropagation();
}

}
