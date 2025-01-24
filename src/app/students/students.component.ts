import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { Program, Student } from '../model/student.model';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../service/authentication.service';
import { forkJoin } from 'rxjs';
import { ProgramService } from '../service/program.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  public students:any;
  public dataSource:any;
  public Programs:Array<Program>=[]
  public DisplayedColumn=["files","summon","profile","convene","CIN","firstName","lastName","email","phone","birthdate","notebac","notediplome","amountPaid","payment","action"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router:Router,private studentService:StudentsService, private programService:ProgramService
    , public authService:AuthenticationService
  ){

  }
  ngOnInit(): void {
    if(!this.authService.Role.includes("SUPER_ADMIN")){
     this.getProgram(this.authService.username)
    }else{
    this.getAllStudent()
    } 
     }
     getProgram(email:string){
      this.programService.programByRespo(email).subscribe({
        next:(data)=>{
          console.log(data)
          this.getStudents(data)
        }
      })
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
this.router.navigateByUrl(`/admin/payment/${student.cin}`)
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
  edit(student: any) {
    this.router.navigateByUrl(`/admin/profile/${student.email}`)
  }
  convene(student: Student) {
  this.studentService.conveneStudent(student.id).subscribe({
    next:(data)=>{
      console.log(data.photo)
      const index = this.students.findIndex((s:Student) => s.id === student.id);
      if (index !== -1) {
        this.students[index].convene = data.convene; 
        this.dataSource = new MatTableDataSource(this.students); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
    error:(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    }
  })
  }
  displayFiles(files: Blob[]): void {
    const container = document.createElement('div');
  
    files.forEach((file) => {
      const url = window.URL.createObjectURL(file);
  
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.width = '100%';
      iframe.height = '600px'; // Ajustez la hauteur selon vos besoins
      iframe.style.border = 'none';
  
      container.appendChild(iframe);
  
      // Révoquer l'URL après un certain temps
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    });
  
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.body.appendChild(container);
    } else {
      console.error('Impossible d’ouvrir une nouvelle fenêtre.');
    }
  }
  ViewFiles(studentId: string) {
    forkJoin([
      this.studentService.getFile(studentId, "CIN"),
      this.studentService.getFile(studentId, "bac"),
      this.studentService.getFile(studentId, "diplom")
    ]).subscribe(
      (responses) => {
        const files = responses
          .filter((file) => file != null && file.size > 0) 
          .map((file) => new Blob([file], { type: 'application/pdf' }));
  
        if (files.length > 0) {
          this.displayFiles(files);
        } else {
          Swal.fire({
            title: 'Aucun fichier trouvé',
            text: 'Aucun des fichiers demandés n\'a été trouvé pour cet étudiant.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des fichiers :", error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la récupération des fichiers.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }  
}
