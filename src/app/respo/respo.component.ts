import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponsibleProgram } from '../model/student.model';
import { Router } from '@angular/router';
import { ProgramService } from '../service/program.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    name : this.fb.control(''),
    price: this.fb.control(''),
    respoName: this.fb.control(''),
    phone : this.fb.control(''),
    email : this.fb.control(''),
    fileName: this.fb.control(''),
    fileSource: this.fb.control('')
   })
}
selectFile(event: any) {
  if(event.target.files.length>0){
    let file= event.target.files[0]
    this.programFormGroup.patchValue({
      fileSource:file,
      fileName:file.name
    })
    this.pdfFileUrl= window.URL.createObjectURL(file)
    console.log(this.pdfFileUrl)
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
      confirm("saved"+data)
          }
        })
    },
    error:(err)=>{
      console.log(err)
    }
})
}
}

