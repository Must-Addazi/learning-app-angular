import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { AuthenticationService } from '../service/authentication.service';
import { Program, Student } from '../model/student.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import Swal from 'sweetalert2';
import { StepperOrientation } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { ProgramService } from '../service/program.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileData!:Student
  public programs:Array<Program>=[]

  imagePreview: string | null = null;
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor( private programService:ProgramService , private authService: AuthenticationService,private studentsService:StudentsService, public dialog: MatDialog) {
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
        CIN: ['', [Validators.required,Validators.minLength(4)]],
        phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        date:['',Validators.required],
        noteBac:['',[Validators.required,Validators.min(10), Validators.max(20)]],
        noteDiplome:['',[Validators.required,Validators.min(12), Validators.max(20)]],
        program:['',Validators.required]
      });
      passwordFormGroup =  this._formBuilder.group({
        password: ['', [Validators.required,Validators.minLength(5)]],
        cpassword: ['', [Validators.required,Validators.minLength(5)]],
      });
      ImageFormGroup = this._formBuilder.group({
        imageFileName: ['',Validators.required],
        imageFile: [null as File | null, Validators.required]
      })
      CinFormGroup = this._formBuilder.group({
        fileSource:['',Validators.required],
        fileName:['', Validators.required]
           });
      bacFormGroup = this._formBuilder.group({
        bacFileSource:['',Validators.required],
        bacFileName:['', Validators.required]
           });
      diplomeFormGroup = this._formBuilder.group({
        diplomeFileSource:['',Validators.required],
        diplomeFileName:['', Validators.required]
      })
      ngOnInit(): void {
        const profileId = this.authService.username;
       this.getProfile(profileId)
       this.getPrograms()
       console.log(profileId)
      } 
      getProfile(profileId: string): void {
        this.studentsService.getUserProfileByEmail(profileId).subscribe({
          next: (profileData) => {
            this.profileData = profileData;
            console.log(profileData);
            const formattedDate = profileData.birthDate ? formatDate(profileData.birthDate, 'yyyy-MM-dd', 'en-US')  : '';

      this.persInfFormGroup.patchValue({
        firstName: profileData.firstName || '', // Fallback to empty string
        lastName: profileData.lastName || '',
        email: profileData.email || '',
        CIN: profileData.cin || '',
        phone: profileData.phone || '',
        date: formattedDate, // Formatted or empty string if birthDate is null
        noteBac: profileData.noteBac?.toString() || '', // Handle null/undefined
        noteDiplome: profileData.noteDiploma?.toString() || '',
        program:profileData.programDTO.id || ''
          });    
          },
          error: (err) => {
            console.error('Error fetching profile data:', err);
          },
        });
      }
       getPrograms(){
        this.programService.getAllPrograms().subscribe({
          next:(data)=>{
            this.programs=data
          }
        })
       }
      resetCinFile() {
        this.CinFormGroup.patchValue({
          fileSource: null,
          fileName: null
        });
        }
        selectCinFile(event: any) {
          if(event.target.files.length>0){
            let file= event.target.files[0]
            this.CinFormGroup.patchValue({
              fileSource:file,
             fileName:file.name
            })
          }
          }
          resetBacFile() {
            this.bacFormGroup.patchValue({
              bacFileSource : null,
              bacFileName: null
            });
          }
            
            selectBacFile(event: any) {
              if(event.target.files.length>0){
                let file= event.target.files[0]
                this.bacFormGroup.patchValue({
                  bacFileSource:file,
                 bacFileName:file.name
                })
              }
              }
          
              resetDiplomeFile() {
                this.diplomeFormGroup.patchValue({
                  diplomeFileName: null,
                  diplomeFileSource: null
                });}
                selectDiplomeFile(event: any) {
                  if(event.target.files.length>0){
                    let file= event.target.files[0]
                    this.diplomeFormGroup.patchValue({
                      diplomeFileSource:file,
                     diplomeFileName:file.name
                    })   }
                  }      
    selectImage(event: Event) {
      const fileInput = event.target as HTMLInputElement;
  
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.ImageFormGroup.patchValue({
          imageFile: file,
          imageFileName: file.name
        });
  
        this.ImageFormGroup.get('imageFileName')?.setValue(file.name);
        
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
      this.ImageFormGroup.patchValue({
        imageFileName: null,
      });
  }
      
    selectDiplomaFile(event: any) {
          if(event.target.files.length>0){
            let file= event.target.files[0]
            this.diplomeFormGroup.patchValue({
              diplomeFileSource:file,
              diplomeFileName:file.name
            })
          }
          }
          updateStudent() {
            if (
              this.persInfFormGroup.valid
            ) {
              let date: Date = new Date(this.persInfFormGroup.get("date")?.value ||"");
              let formatedDate = date.toISOString().split("T")[0];
              const studentDTO = {
                CIN: this.persInfFormGroup.get("CIN")?.value || "",
                firstName: this.persInfFormGroup.get("firstName")?.value || "",
                lastName: this.persInfFormGroup.get("lastName")?.value || "",
                email: this.persInfFormGroup.get("email")?.value || "",
                phone: this.persInfFormGroup.get("phone")?.value || "",
                birthDate: formatedDate,
                NoteBac: this.persInfFormGroup.get("noteBac")?.value || "",
                NoteDiploma: this.persInfFormGroup.get("noteDiplome")?.value || "",
                programID: this.persInfFormGroup.get("program")?.value || "",
              };
              this.studentsService.updateStudent(this.profileData.id,studentDTO).subscribe({
                next: (data) => {
                  this.profileData=data
                  Swal.fire({
                    title: "Updated!",
                    text: "Student updated successfully."+data.cne,
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }
          }   
          updatePassword() {
            if (this.passwordFormGroup.valid) {
                const payload = {
                    password: this.passwordFormGroup.get("password")?.value,
                    confirmPassword: this.passwordFormGroup.get("cpassword")?.value
                };
                console.log("Payload:", payload);
        
                this.studentsService.updateStudentPassword(this.profileData.email, payload).subscribe({
                    next: (data) => {
                        this.profileData = data;
                        Swal.fire({
                            title: "Updated!",
                            text: "Password updated successfully.",
                            icon: "success"
                        });
                    },
                    error: (err) => {
                        console.error("Error updating password:", err);
                    }
                });
            }
        }        
          updateImage() {
            if (
              this.ImageFormGroup.valid
            ) {
               let formData = new FormData();
                formData.set("file", this.ImageFormGroup.get("imageFile")?.value || "");
              this.studentsService.updateStudentFile(this.profileData.id,'Profile',formData).subscribe({
                next: (data) => {
                  this.profileData=data
                  Swal.fire({
                    title: "Updated!",
                    text: "Student updated successfully.",
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }
          } 
          updateCIN() {
            if (
              this.CinFormGroup.valid
            ){         
              let formData = new FormData();
              formData.set("file", this.CinFormGroup.get("fileSource")?.value || "");
              console.log("on est arrivé "+this.CinFormGroup.value)
              this.studentsService.updateStudentFile(this.profileData.id,'CIN',formData).subscribe({
                next: (data) => {
                  this.profileData=data
                  Swal.fire({
                    title: "Updated!",
                    text: "Student updated successfully.",
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }  } 
          updateBac() {
            if (
              this.bacFormGroup.valid
            ) {
                  let formData = new FormData();
              formData.set("file", this.bacFormGroup.get("bacFileSource")?.value || "");
              this.studentsService.updateStudentFile(this.profileData.id,'Bac',formData).subscribe({
              next: (data) => {
                this.profileData=data
                  Swal.fire({
                    title: "Updated!",
                    text: "Student updated successfully.",
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }
          } 
          updateDiplome() {
            if (
              this.diplomeFormGroup.valid
            ) {
              let formData = new FormData();
              formData.set("file", this.diplomeFormGroup.get("diplomeFileSource")?.value || "");
              this.studentsService.updateStudentFile(this.profileData.id,'Diploma',formData).subscribe({
                next: (data) => {
                  this.profileData=data
                  Swal.fire({
                    title: "Updated!",
                    text: "Student updated successfully.",
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }
          }  
          viewFile(studentId: string, file:string) {
            this.studentsService.getFile(studentId,file).subscribe((file) => {
              const blob = new Blob([file], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);
              window.open(url, '_blank');
              window.URL.revokeObjectURL(url);
            });
          } 
}