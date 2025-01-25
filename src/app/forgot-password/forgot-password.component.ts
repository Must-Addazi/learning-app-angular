import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
public ForgotFormGroup!:FormGroup
 public ErrorMassage!:string
 constructor( public fb:FormBuilder,
  private authservice:AuthenticationService,
private router:Router
){

}
ngOnInit(): void {
this.ForgotFormGroup= this.fb.group({
username:this.fb.control("")})
}
send() {
let username= this.ForgotFormGroup.value.username;
this.authservice.requestPasswordReset(username).subscribe({
  next:(data)=>{
    this.authservice.loadProfile(data)
    Swal.fire({
      title: "Sent!",
      text: "Link sent successfuly to."+username,
      icon: "success"
    });
  },
  error:(err)=>{
  
  }})
}
hide = signal(true);
clickEvent(event: MouseEvent) {
  this.hide.set(!this.hide());
  event.stopPropagation();
}
login() {
this.router.navigateByUrl("login")
}
  
}

