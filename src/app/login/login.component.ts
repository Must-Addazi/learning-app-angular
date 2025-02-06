import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
username:this.fb.control('',[Validators.required,Validators.email]),
password:this.fb.control('',Validators.required)
})
}
login() {
if(this.LoginFormGroup.valid){
let username= this.LoginFormGroup.value.username;
let password= this.LoginFormGroup.value.password;
this.authservice.login(username,password).subscribe({
  next:(data)=>{
    this.authservice.loadProfile(data)
    this.router.navigateByUrl("/admin/dashboard")
  },
  error:(err)=>{
    Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error          
        });
  }})
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Please valid your form"          
  });
}
}
hide = signal(true);
clickEvent(event: MouseEvent) {
  this.hide.set(!this.hide());
  event.stopPropagation();
}
forgotPassword() {
this.router.navigateByUrl("forgot-password")
}
}
