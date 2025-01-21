import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramService } from '../service/program.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respo',
  templateUrl: './respo.component.html',
  styleUrl: './respo.component.css'
})
export class RespoComponent implements OnInit {

pdfFileUrl: any;
shoProgress: boolean=false;
public programFormGroup!:FormGroup
  constructor (public programService:ProgramService,
    private fb:FormBuilder
  ){}
  
  ngOnInit(): void {
   this.programFormGroup=this.fb.group({
    name : this.fb.control('',Validators.required),
    price: this.fb.control('',Validators.required),
    respoName: this.fb.control('',Validators.required),
    phone : this.fb.control('',Validators.required),
    email : this.fb.control('',Validators.required),
    fileName: this.fb.control('',Validators.required),
    fileSource: this.fb.control('',Validators.required)
   })
}
selectFile(event: any) {
  if(event.target.files.length>0){
    let file= event.target.files[0]
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
    this.programFormGroup.patchValue({
      fileSource:file,
      fileName:file.name
    })
    this.pdfFileUrl= window.URL.createObjectURL(file)
  }
  }
  resetFile() {
    this.programFormGroup.patchValue({
      fileSource: null,
      fileName: null
    });
    this.pdfFileUrl = null;
  }
saveRespoProgram(){
  if(this.programFormGroup.valid){
  this.shoProgress = true;
  const file = this.programFormGroup.value.fileSource;
  let formDataProgram = new FormData();
  formDataProgram.set("name",this.programFormGroup.value.name)
  formDataProgram.set("price",this.programFormGroup.value.price)
  formDataProgram.set("poster",file)
  let respoformData = new FormData()
  respoformData.set("name",this.programFormGroup.value.respoName)
  respoformData.set("phoneNumber",this.programFormGroup.value.phone)
  respoformData.set("email",this.programFormGroup.value.email)
  this.programService.saveRespo(respoformData).subscribe({
    next:(data)=>{
      console.log(data)
        formDataProgram.set("respId",data)  
        this.programService.saveProgram(formDataProgram).subscribe({
          next:(data)=>{
      this.shoProgress=false
                Swal.fire({
                  title: "Saved!",
                  text: "Program saved successfully."+data.name,
                  icon: "success"
                });          }
        })
    },
    error:(err)=>{
      console.log(err)
    }
})
}else{
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Valid your form.`
    }); 
}
}
}

