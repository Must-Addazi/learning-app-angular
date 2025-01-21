import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
       date:this.fb.control("",[Validators.required]),
       amount:this.fb.control("",Validators.required),
       type:this.fb.control("",Validators.required),
       studentCode:this.fb.control(this.studentCode),
       fileName: this.fb.control('',Validators.required),
       fileSource: this.fb.control('',Validators.required)
     })
   }
   public newPaymentForm!:FormGroup
afterLoadComplet(event: any) {
console.log(event)
}
selectFile(event: any) {
  if (event.target.files.length > 0) {
    let file = event.target.files[0];
    const MAX_FILE_SIZE_MB = 1;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE_BYTES) {
          Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `The file exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`
              });
      return; 
    }
      const allowedTypes = ['application/pdf'];
                if (!allowedTypes.includes(file.type)) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Type',
                    text: 'PDF files are allowed.',
                  });
                  return;
                }
    this.newPaymentForm.patchValue({
      fileSource: file,
      fileName: file.name,
    });
    this.pdfFileUrl = window.URL.createObjectURL(file);
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
  if(this.newPaymentForm.valid){
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
    },
    error: (err) => {
      console.log(err);
    }
  });
}else{
   Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Valid your form.`
      }); 
}
}
}
