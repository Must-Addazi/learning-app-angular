import { Component, OnInit } from '@angular/core';
import { Payment, paymentType, PaymentStatus } from '../model/student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css'
})
export class EditPaymentComponent implements OnInit{
  paymentId!:number
  selectedStatus!: string;
  shoProgress:boolean=false
  public PaymentStatus :string[]=[]
  public PaymentForm!:FormGroup
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute,
    private studentsService:StudentsService, private router:Router
   ){
   
   }
   ngOnInit(): void {
     for( let elt in PaymentStatus){
       let value=PaymentStatus[elt]
       if(typeof value== 'string' )
       this.PaymentStatus.push(value)
     }
     this.paymentId=this.activatedRoute.snapshot.params['id']
     this.PaymentForm=this.fb.group({
       type:this.fb.control(""),
     })
   }
savePayment() {
  this.shoProgress = true;
  let status= this.PaymentForm.value.type

  this.studentsService.editPayment(this.paymentId,status).subscribe({
    next: () => {
      this.shoProgress = false;
       Swal.fire({
            title: "Saved!",
            text: "Pyament saved successfully.",
            icon: "success"
          });
          this.router.navigateByUrl("admin/payment")
    }
    ,
    error: (err) => {
      console.log(err);
    }
  });
}

 
}

