import { Component, inject, OnInit } from '@angular/core';
import { Program } from '../model/student.model';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/cdk/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { StudentsService } from '../service/students.service';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent implements OnInit{

  public program!:Program
  public pdfFileUrl! :string|null
  public showProgress:boolean=false
  imagePreview: string | null = null;
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor(private studentsService:StudentsService, public dialog: MatDialog) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

    private _formBuilder = inject(FormBuilder);
  
    nameFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required]
    });
    emailFormGroup = this._formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
    });
    CINFormGroup = this._formBuilder.group({
      CIN: ['', Validators.required],
    });
    phoneFormGroup = this._formBuilder.group({
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    });
    fileFormGroup = this._formBuilder.group({
      fileSource:['',Validators.required],
      fileName:['', Validators.required],
      imageFileName: ['',],
      imageFile: [null as File | null, Validators.required]
    })
    ngOnInit(): void {
      this.program = history.state.program;
    }
    resetFile() {
      this.fileFormGroup.patchValue({
        fileSource: null,
        fileName: null
      });
      this.pdfFileUrl = null;}
      selectFile(event: any) {
        if(event.target.files.length>0){
          let file= event.target.files[0]
          this.fileFormGroup.patchValue({
            fileSource:file,
           fileName:file.name
          })
          this.pdfFileUrl= window.URL.createObjectURL(file)
        }
        }
        
        saveStudent() {
          this.showProgress = true;
          if (
            this.nameFormGroup.valid &&
            this.emailFormGroup.valid &&
            this.CINFormGroup.valid &&
            this.phoneFormGroup.valid &&
            this.fileFormGroup.valid
          ) {
            let formData = new FormData();
            formData.set("CIN", this.CINFormGroup.get("CIN")?.value || "");
            formData.set("firstName", this.nameFormGroup.get("firstName")?.value || "");
            formData.set("lastName", this.nameFormGroup.get("lastName")?.value || "");
            formData.set("email", this.emailFormGroup.get("email")?.value || "");
            formData.set("phone", this.phoneFormGroup.get("phone")?.value || "");
            formData.set("photoCIN", this.fileFormGroup.get("fileSource")?.value || "");
            formData.set("profile", this.fileFormGroup.get("imageFile")?.value || "");
            formData.set("programID", this.program.id);
        
            this.studentsService.saveStudent(formData).subscribe({
              next: (data) => {
                this.showProgress = false;
                Swal.fire({
                  title: "Saved!",
                  text: "Student saved successfully."+data.cne,
                  icon: "success"
                });
              },
              error: (err) => {
                this.showProgress = false;
                console.error("Error saving student:", err);
                Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err.error.message
                  
                    });
              }
            });
          }
        }
        
  selectImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.fileFormGroup.patchValue({
        imageFile: file,
        imageFileName: file.name
      });

      this.fileFormGroup.get('imageFileName')?.setValue(file.name);
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;

        this.openImageDialog(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: { imageUrl },
      width: '500px'
    });
  }
  resetImage() {
    this.fileFormGroup.patchValue({
      imageFileName: null,
    });
}
   
  }
