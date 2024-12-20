import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { Program, Student } from '../model/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  public students:any;
  public dataSource:any;
  public Programs:Array<Program>=[]
  public DisplayedColumn=["profile","CIN","firstName","lastName","email","phone","amountPaid","payment"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router:Router,private studentService:StudentsService){

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
  console.log(student)
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

}
