import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { Program, Student } from '../model/student.model';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  public students:any;
  public dataSource:any;
  public Programs:Array<Program>=[]
  public DisplayedColumn=["profile","CIN","firstName","lastName","email","phone","amountPaid","payment","action"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router:Router,private studentService:StudentsService
    , public authService:AuthenticationService
  ){

  }
  ngOnInit(): void {
    
    this.getAllStudent()
       
     }
getStudents(program: Program) {
this.studentService.getStudentByProgram(program.id).subscribe({
  next:(data)=>{
    console.log(data)
    this.students=data;
    this.dataSource= new MatTableDataSource(this.students)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },
  error:(err)=>{
    console.log(err)
  }
})
}
getPayements(student: Student) {
this.router.navigateByUrl(`/admin/student-details/${student.cin}`)
}
filterStudent($event: Event) {
let value=($event.target as HTMLInputElement).value;
this.dataSource.filter=value;
}

public getAllStudent(){
  this.studentService.getAllStudents().subscribe({
    next:(data)=>{
      console.log(data)
      this.students=data;
      this.dataSource= new MatTableDataSource(this.students)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       for (const student of data) {
  if (student.programDTO && student.programDTO.name) {
    const isAlreadyAdded = this.Programs.some(
      (program) => program.name === student.programDTO.name
    );

    if (!isAlreadyAdded) {
      this.Programs.push(student.programDTO);
    }
  }
}
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }
 deleteStudent(studentId: string) {
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
        this.studentService.deleteStudent(studentId).subscribe({
          next:(data)=>{
            this.getAllStudent()
            Swal.fire({
              title: "Deleted!",
              text: "Cet étudiant à été supprimé avec succès.",
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
  
  edit(_t139: any) {
  throw new Error('Method not implemented.');
  }
}
