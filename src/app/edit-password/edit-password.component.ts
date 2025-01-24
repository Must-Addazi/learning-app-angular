import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { StudentsService } from '../service/students.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent implements OnInit{
  profileId:string=""
  shoProgress:boolean=false
   constructor(private authService: AuthenticationService,private studentsService:StudentsService) {
   }
   private _formBuilder = inject(FormBuilder);
   passwordFormGroup =  this._formBuilder.group({
    password: ['', [Validators.required,Validators.minLength(5)]],
    cpassword: ['', [Validators.required,Validators.minLength(5)]],
  });
  ngOnInit(): void {
    this.profileId = this.authService.username;
  }
          updatePassword() {
            if (this.passwordFormGroup.valid) {
                const payload = {
                    password: this.passwordFormGroup.get("password")?.value,
                    confirmPassword: this.passwordFormGroup.get("cpassword")?.value
                };
                console.log("Payload:", payload);
                if(payload.password != payload.confirmPassword){
                    Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `Passwords must bee equals.`
                          });
                      return; 
                }
                this.studentsService.updateStudentPassword(this.profileId, payload).subscribe({
                    next: (data) => {
                        Swal.fire({
                            title: "Updated!",
                            text: "Password updated successfully.",
                            icon: "success"
                        });
                    },
                    error: (err) => {
                        console.error("Error updating password:", err);
                    }
                });
            }
        }    
}
