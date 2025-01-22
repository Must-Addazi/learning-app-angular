import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../service/program.service';
import Swal from 'sweetalert2';
import { Module } from '../model/student.model';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrl: './new-module.component.css'
})
export class NewModuleComponent implements OnInit {
  isEdit:Boolean=false
 programId!:string
 moduleId!:string
 modul!:Module
  shoProgress:boolean=false
  public newModuleForm!:FormGroup
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute,
    private programService:ProgramService, private router:Router
   ){
   
   }
   ngOnInit(): void {
     this.programId=this.activatedRoute.snapshot.params['programId']
     this.moduleId=this.activatedRoute.snapshot.params['moduleId']
     if(this.moduleId){
      this.isEdit=true
      this.programService.getModule(this.moduleId).subscribe({
        next:(data)=>{
      this.modul=data
      this.newModuleForm=this.fb.group({
        name:this.fb.control(this.modul.name,Validators.required),
        teacher:this.fb.control(this.modul.teacherName,Validators.required),
        programCode:this.fb.control(this.modul.programDTO.name)
      })
        }
      })
     }else{
      this.isEdit=false
     this.newModuleForm=this.fb.group({
       name:this.fb.control("",Validators.required),
       teacher:this.fb.control("",Validators.required),
       programCode:this.fb.control(this.programId)
     })
    }
   }

saveModule() {
  if(this.newModuleForm.valid){
  this.shoProgress = true;
  if(this.isEdit){
  const module:Module={
    id:this.modul.id,
    name:this.newModuleForm.value.name,
    teacherName:this.newModuleForm.value.teacher,
    programDTO:this.modul.programDTO
  }
    this.programService.updateModule(module).subscribe({
      next: () => {
        this.shoProgress = false;
         Swal.fire({
        title: "Saved!",
        text: "Module updated successfully.",
        icon: "success"
      });
      this.router.navigateByUrl("admin/module")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }else{
  let formData = new FormData();
  formData.set('name',this.newModuleForm.value.name );
  formData.set('teacherName', this.newModuleForm.value.teacher);
  formData.set('programId', this.newModuleForm.value.programCode);
  console.log(this.newModuleForm.value.name)
  this.programService.saveModule(formData).subscribe({
    next: () => {
      this.shoProgress = false;
       Swal.fire({
      title: "Saved!",
      text: "Module saved successfully.",
      icon: "success"
    });
    this.router.navigateByUrl("admin/module")
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}else{
  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Valid your form.`
        }); }
}
}
 

