import { Component, OnInit, ViewChild } from '@angular/core';
import { Program } from '../model/student.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProgramService } from '../service/program.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent implements OnInit{
  programs:Array<Program>=[]
  public dataSource:any
  public displayedColumns = ["name","price","responame","phone","email","posterFile","applay"]
  constructor(private router:Router, public programService:ProgramService,
    public authservice:AuthenticationService
  ){}
  @ViewChild(MatSort) sort: MatSort | undefined;
  ngOnInit(): void {
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
  viewFile(programId: any) {
    this.programService.getPotserFile(programId).subscribe((file) => {
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // Ouvre le fichier dans un nouvel onglet
      window.open(url, '_blank');
      // Libère la mémoire utilisée
      window.URL.revokeObjectURL(url);
    });
  }  
}
