import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../service/program.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../model/student.model';

@Component({
  selector: 'app-load-students',
  templateUrl: './load-students.component.html',
  styleUrl: './load-students.component.css'
})
export class LoadStudentsComponent implements OnInit {
program!:Program
shoProgress: boolean=false;
public programFormGroup!:FormGroup
  constructor (private route:ActivatedRoute, public programService:ProgramService,
    private fb:FormBuilder
  ){}
  
  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if(code){
    this.programService.programById(code).subscribe({
      next:(data)=>{
        this.program=data
        console.log(this.program)
        if (this.program && this.program.responsibleProgramDTO) {
          this.programFormGroup = this.fb.group({
            name: this.fb.control(this.program.name, Validators.required),
            price: this.fb.control(this.program.price, Validators.required),
            respoName: this.fb.control(this.program.responsibleProgramDTO.name, Validators.required),
            phone: this.fb.control(this.program.responsibleProgramDTO.phoneNumber, [Validators.required,Validators.maxLength(10),Validators.maxLength(10)]),
            email: this.fb.control(this.program.responsibleProgramDTO.email, [Validators.required,Validators.email]),
            fileName: this.fb.control(this.program.posterFile, Validators.required),
            fileSource: this.fb.control(''),
            timingfileName: this.fb.control(this.program.timing, Validators.required),
            timingfileSource: this.fb.control(''),
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Program or Responsible Program data is invalid.',
          });
        }        
      }
    })
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `enter a valid program Id .`
    });
  }
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
  }
  }
  resetPosterFile() {
    this.programFormGroup.patchValue({
      fileSource: null,
      fileName: null
    });
  }
  selectTimingFile(event: any) {
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
        timingfileSource:file,
        timingfileName:file.name
      })
    }
    }
  resetTimingFile() {
    this.programFormGroup.patchValue({
      timingfileSource: null,
      timingfileName: null
    });
  }
  updateRespoProgram() { 
    if(this.programFormGroup.valid){
      this.shoProgress = true;
      const formValues = this.programFormGroup.getRawValue();
      
      const formData = new FormData();
      formData.set('posterFile', this.programFormGroup.value.fileSource);
      formData.set('timingFile', this.programFormGroup.value.timingfileSource);
      formData.set('id', this.program.id);
      formData.set('name', formValues.name);
      formData.set('price', formValues.price);
      formData.set('posterFileName', formValues.fileName); 
      formData.set('timingFileName', formValues.timingfileName); 

      formData.set('responsibleProgramDTO.id', this.program.responsibleProgramDTO.id);
      formData.set('responsibleProgramDTO.name', formValues.respoName);
      formData.set('responsibleProgramDTO.phoneNumber', formValues.phone);
      formData.set('responsibleProgramDTO.email', formValues.email);
      
      // Envoi du formulaire avec FormData
      this.programService.updateProgram(formData).subscribe({
        next: (data) => {
          this.shoProgress = false;
          Swal.fire({
            title: "Updated!",
            text: `Program '${data.name}' was updated successfully.`,
            icon: "success"
          });
        }
      });
    }else{
      Object.keys(this.programFormGroup.controls).forEach((field) => {
        const control = this.programFormGroup.get(field);
        if (control?.invalid) {
          control.markAsTouched({ onlySelf: true });
        }
      });
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Valid your form.`
        }); 
    }
  }

viewFile(programId: any,file:string) {
  this.programService.getFile(programId,file).subscribe((file) => {
    const blob = new Blob([file], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    // Ouvre le fichier dans un nouvel onglet
    window.open(url, '_blank');
    // Libère la mémoire utilisée
    window.URL.revokeObjectURL(url);
  });
} 
}



