import { Component, inject, OnInit } from '@angular/core';
import { Program } from '../model/student.model';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from '@angular/cdk/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { StudentsService } from '../service/students.service';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FileValidatorService } from '../service/file-validator.service';


@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class NewStudentComponent implements OnInit{

  public program!:Program
  public pdfCinFileUrl! :string|null
  public pdfBacFileUrl! :string|null
  public pdfDiplomFileUrl! :string|null
  public showProgress:boolean=false
  imagePreview: string | null = null;
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor(private studentsService:StudentsService, public dialog: MatDialog, public fileValidatorService:FileValidatorService) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

    private _formBuilder = inject(FormBuilder);
  
    persInfFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName:['',Validators.required],
      email: ['', [Validators.required,Validators.email]],
      CIN: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]{4,10}$') ]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      date:['',Validators.required],
      fileSource:['',Validators.required],
      fileName:['', Validators.required],
      imageFileName: ['',],
      imageFile: [null as File | null]
    });
    bacFormGroup = this._formBuilder.group({
      noteBac:['',[Validators.required,Validators.min(10), Validators.max(20)]],
      bacFileSource:['',Validators.required],
      bacFileName:['', Validators.required]
         });
    diplomeFormGroup = this._formBuilder.group({
      noteDiplome:['',[Validators.required,Validators.min(12), Validators.max(20)]],
      diplomeFileSource:['',Validators.required],
      diplomeFileName:['', Validators.required]
    })
    ngOnInit(): void {
      this.program = history.state.program;
      console.log("register in "+this.program.name)
    }
    resetCinFile() {
      this.persInfFormGroup.patchValue({
        fileSource: null,
        fileName: null
      });
      this.pdfCinFileUrl = null;}
      selectCinFile(event: any) {
        if(event.target.files.length>0){
          let file= event.target.files[0]
          const allowedTypes = ['application/pdf'];
         if(!this.fileValidatorService.validateFile(file,allowedTypes)){
          return;
         }
          this.persInfFormGroup.patchValue({
            fileSource:file,
           fileName:file.name
          })
          this.pdfCinFileUrl= window.URL.createObjectURL(file)
        }
        }
        resetBacFile() {
          this.bacFormGroup.patchValue({
            bacFileSource : null,
            bacFileName: null
          });
          this.pdfBacFileUrl = null;}
          
          selectBacFile(event: any) {
            if(event.target.files.length>0){
              let file= event.target.files[0]
                  const allowedTypes = ['application/pdf'];
                  if(!this.fileValidatorService.validateFile(file,allowedTypes)){
                    return;
                   }
                 this.bacFormGroup.patchValue({
                bacFileSource:file,
               bacFileName:file.name
              })
              this.pdfBacFileUrl= window.URL.createObjectURL(file)
            }
            }
            resetDiplomeFile() {
              this.diplomeFormGroup.patchValue({
                diplomeFileName: null,
                diplomeFileSource: null
              });
              this.pdfDiplomFileUrl = null;}
              selectDiplomeFile(event: any) {
                if(event.target.files.length>0){
                  let file= event.target.files[0]
                    const allowedTypes = ['application/pdf'];
                    if(!this.fileValidatorService.validateFile(file,allowedTypes)){
                      return;
                     }                 
                      this.diplomeFormGroup.patchValue({
                    diplomeFileSource:file,
                   diplomeFileName:file.name
                  })
                  this.pdfDiplomFileUrl= window.URL.createObjectURL(file)
                }
                }
                allowOnlyNumbers(event: KeyboardEvent): void {
                  const charCode = event.key.charCodeAt(0);
              
                  if (charCode < 48 || charCode > 57) {
                    event.preventDefault();
                  }
                }
                allowOnlyNumbersAndDot(event: KeyboardEvent): void {
                  const char = event.key;
                
                  if (!char.match(/[0-9.]/)) {
                    event.preventDefault();
                  }
                
                  const input = event.target as HTMLInputElement;
                  if (char === '.' && input.value.includes('.')) {
                    event.preventDefault();
                  }
                }
                selectImage(event: Event) {
                  const fileInput = event.target as HTMLInputElement;
              
                  if (fileInput.files && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                   if(!this.fileValidatorService.validateFile(file,allowedTypes)){
                    return;
                   }
                   this.persInfFormGroup.patchValue({
                      imageFile: file,
                      imageFileName: file.name
                    });
              
                    this.persInfFormGroup.get('imageFileName')?.setValue(file.name);
                    
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
                  this.persInfFormGroup.patchValue({
                    imageFileName: null,
                  });
              }    
        saveStudent() {
          this.showProgress = true;
          if (
            this.persInfFormGroup.valid &&
             this.bacFormGroup.valid &&
             this.diplomeFormGroup.valid
          ) {
            let date: Date = new Date(this.persInfFormGroup.get("date")?.value ||"");
            let formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();          
            let formData = new FormData();
            formData.set("CIN", this.persInfFormGroup.get("CIN")?.value || "");
            formData.set("firstName", this.persInfFormGroup.get("firstName")?.value || "");
            formData.set("lastName", this.persInfFormGroup.get("lastName")?.value || "");
            formData.set("email", this.persInfFormGroup.get("email")?.value || "");
            formData.set("phone", this.persInfFormGroup.get("phone")?.value || "");
            formData.set("birthDate",formatedDate)
            formData.set("NoteBac", this.bacFormGroup.get("noteBac")?.value || "");
            formData.set("NoteDiploma", this.diplomeFormGroup.get("noteDiplome")?.value || "");
            formData.set("photoCIN", this.persInfFormGroup.get("fileSource")?.value || "");
            formData.set("bacFile", this.bacFormGroup.get("bacFileSource")?.value || "");
            formData.set("diplomaFile", this.diplomeFormGroup.get("diplomeFileSource")?.value || "");
            formData.set("profile", this.persInfFormGroup.get("imageFile")?.value || "");
            formData.set("programID", this.program.id);
        
            this.studentsService.saveStudent(formData).subscribe({
              next: (data) => {
                this.showProgress = false;
                Swal.fire({
                  title: "Saved!",
                  text: "Student saved successfully.",
                  icon: "success"
                });
              },
              error: (err) => {
                this.showProgress = false;
                console.error("Error saving student:", err);
              }
            });
          }else{
            this.showProgress=false
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Valid your form than click on save.`
            });
        return;
          }
        }       
  }
