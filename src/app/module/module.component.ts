import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Module, Program } from '../model/student.model';
import { ProgramService } from '../service/program.service';
import { AuthenticationService } from '../service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  public modules:Array<Module>=[];
  public dataSource:any;
  public programs:Array<Program>=[]
  public DisplayedColumn:string[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private programService:ProgramService, public authservice:AuthenticationService){
    this.DisplayedColumn=["id","name","teacherName",...(this.authservice.isAuthenticated() ? ["action"] : [])]
  }
  ngOnInit(): void {
    this.getAllModules()
       
     }
getModules(program: Program) {
this.programService.getModulesByProgram(program.id).subscribe({
  next:(data)=>{
    console.log(data)
    this.modules=data;
    this.dataSource= new MatTableDataSource(this.modules)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  },
  error:(err)=>{
    console.log(err)
  }
})
}
filterModule($event: Event) {
  const value = ($event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = value;
}
 
public getAllModules(){
  this.programService.getAllModules().subscribe({
    next:(data)=>{
      console.log(data)
      this.modules=data;
      this.dataSource= new MatTableDataSource(this.modules)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       for (const module of data) {
  if (module.programDTO && module.programDTO.name) {
    const isAlreadyAdded = this.programs.some(
      (program) => program.name === module.programDTO.name
    );

    if (!isAlreadyAdded) {
      this.programs.push(module.programDTO);
    }
  }
}
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }
 edit(_t76: any) {
  throw new Error('Method not implemented.');
  }
    deleteModule(moduleId:string) {
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
              this.programService.deleteModule(moduleId).subscribe({
                next:(data)=>{
                  this.getAllModules()
                  Swal.fire({
                    title: "Deleted!",
                    text: "Le module a été supprimé avec succès.",
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
  
}

