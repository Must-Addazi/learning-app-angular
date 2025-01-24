import { Component, OnInit, ViewChild } from '@angular/core';
import { Program } from '../model/student.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProgramService } from '../service/program.service';
import { AuthenticationService } from '../service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent implements OnInit{
  programs:Array<Program>=[]
  public displayedColumns: string[];
  public dataSource:any
  constructor(private router:Router, public programService:ProgramService,
    public authservice:AuthenticationService
  ){
    this.displayedColumns = ["name","price","responame","phone","email","posterFile","timingFile","applay",...((this.authservice.isAuthenticated() && this.authservice.Role.includes("ADMIN")) ? ["action"] : [])]

  }

  @ViewChild(MatSort) sort: MatSort | undefined;
  ngOnInit(): void {
 this.getAllProgram()
}
public getAllProgram(){
  this.programService.getAllPrograms().subscribe({
    next:(data)=>{
      this.programs=data
      console.log(this.programs)
       this.dataSource= new MatTableDataSource(this.programs)
       this.dataSource.sort = this.sort;
    },
    error:(err)=>{
      console.log(err)
    }
   })
}
apply(program: Program) {
  this.router.navigateByUrl("/admin/new-student",{state:{program}})
  }
  filterProgram($event: Event) {
    let value=($event.target as HTMLInputElement).value;
      this.dataSource.filter=value;
  }
  addProgram() {
 this.router.navigateByUrl("/admin/respo")
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
  deleteProgram(programId:string) {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.programService.deleteProgram(programId).subscribe({
              next:(data)=>{
                this.getAllProgram()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your Consumption has been deleted.",
                  icon: "success"
                });
              },
              error:(err)=>{
            Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.message
                });
              }
            })
          }else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        });   
    }
    edit(programId: string) {
      this.router.navigateByUrl(`/admin/edit-program/${programId}`)
    }
    AddModule(programId: string) {
      this.router.navigateByUrl(`/admin/new-module/${programId}`)
    }
}
