import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgramService } from '../service/program.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrl: './new-module.component.css'
})
export class NewModuleComponent implements OnInit {
 programId!:string
  shoProgress:boolean=false
  public newModuleForm!:FormGroup
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute,
    private programService:ProgramService, private router:Router
   ){
   
   }
   ngOnInit(): void {
     this.programId=this.activatedRoute.snapshot.params['programId']
     this.newModuleForm=this.fb.group({
       name:this.fb.control(""),
       teacher:this.fb.control(""),
       programCode:this.fb.control(this.programId)
     })
   }

saveModule() {
  this.shoProgress = true;
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
    }
    ,
    error: (err) => {
      console.log(err);
    }
  });
}
}
 

