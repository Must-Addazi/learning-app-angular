import { Component, inject, OnInit } from '@angular/core';
import { Poster, Program } from '../model/student.model';
import { ProgramService } from '../service/program.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  imagePreview: string | null = null;
public programs:Array<Program>=[]
public posters:Array<Poster>=[]
  constructor( private programService:ProgramService , public authService: AuthenticationService,
     public dialog: MatDialog, public router:Router) {
   }
     private _formBuilder = inject(FormBuilder);
   ngOnInit(): void {
    this.programService.getAllPosters().subscribe({
      next:(data)=>{
        this.posters=data
        console.log(this.posters)
      }
    })
    this.programService.getAllPrograms().subscribe({
      next:(data)=>{
        this.programs=data
      }
    })
   }
      ImageFormGroup = this._formBuilder.group({
           imageFileName: ['',Validators.required],
           imageFile: [null as File | null, Validators.required],
           program:['',Validators.required]
         })
             selectImage(event: Event) {
               const fileInput = event.target as HTMLInputElement;
               if (fileInput.files && fileInput.files.length > 0) {
                 const file = fileInput.files[0];
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
                     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                             if (!allowedTypes.includes(file.type)) {
                               Swal.fire({
                                 icon: 'error',
                                 title: 'Invalid File Type',
                                 text: 'Only JPEG, PNG, or JPG files are allowed.',
                               });
                               return;
                             }
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
               addPoster() {
          if (
              this.ImageFormGroup.valid
            ) {
               let formData = new FormData();
                formData.set("poster", this.ImageFormGroup.get("imageFile")?.value || "");
                const programId=this.ImageFormGroup.get("program")?.value || "";
              this.programService.savePoster(formData,programId).subscribe({
                next: (data) => {
                  Swal.fire({
                    title: "Saved!",
                    text: "Poster saved successfully.",
                    icon: "success"
                  });
                },
                error: (err) => {
                  console.error("Error saving student:", err);
                }
              });
            }
              }
              applay(program:Program){
                this.router.navigateByUrl("/admin/new-student",{state:{program}})
              }
              deleteItem(id:number){
                this.programService.deletePoster(id).subscribe({
                  next: (data) => {
                    Swal.fire({
                      title: "deleted!",
                      text: "Poster deleted successfully.",
                      icon: "success"
                    });
                  },
                  error: (err) => {
                    console.error("Error deleting poster:", err);
                  }
                });
              }
}
