import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { paymentType } from '../model/student.model';
import { StudentsService } from '../service/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  studentCode!:string
  paymentId!:string
  selectedType!: string;
  public pdfFileUrl!:string|null
  shoProgress:boolean=false
  public paymentTypes :string[]=[]
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute,
    private studentsService:StudentsService, private router:Router
   ){
   
   }
   ngOnInit(): void {
     for( let elt in paymentType){
       let value=paymentType[elt]
       if(typeof value== 'string' )
       this.paymentTypes.push(value)
     }
     this.studentCode=this.activatedRoute.snapshot.params['code']
     this.newPaymentForm=this.fb.group({
       date:this.fb.control(""),
       amount:this.fb.control(""),
       type:this.fb.control(""),
       studentCode:this.fb.control(this.studentCode),
       fileName: this.fb.control(''),
       fileSource: this.fb.control('')
     })
   }
   public newPaymentForm!:FormGroup
afterLoadComplet(event: any) {
console.log(event)
}
selectFile(event: any) {
if(event.target.files.length>0){
  let file= event.target.files[0]
  this.newPaymentForm.patchValue({
    fileSource:file,
    fileName:file.name
  })
  this.pdfFileUrl= window.URL.createObjectURL(file)
  console.log(this.pdfFileUrl)
}
}
resetFile() {
  this.newPaymentForm.patchValue({
    fileSource: null,
    fileName: null
  });
  this.pdfFileUrl = null;
}

savePayment() {
  this.shoProgress = true;
  let date: Date = new Date(this.newPaymentForm.value.date);
  let formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const file = this.newPaymentForm.value.fileSource;
  let formData = new FormData();
  formData.set('email', this.newPaymentForm.value.studentCode);
  formData.set('date', formatedDate);
  formData.set('amount', this.newPaymentForm.value.amount);
  formData.set('type', this.newPaymentForm.value.type);
  formData.set('file', file);

  this.studentsService.savePayment(formData).subscribe({
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
