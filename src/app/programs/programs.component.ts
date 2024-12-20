import { Component, OnInit, ViewChild } from '@angular/core';
import { Program } from '../model/student.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProgramService } from '../service/program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent implements OnInit{
  programs:Array<Program>=[]
  public dataSource:any
  public displayedColumns = ["name","price","responame","phone","email","timingFile","applay"]
  constructor(private router:Router, public programService:ProgramService){}
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
  downloadFile(program: Program) {
    this.programService.gettimingFile(program.id).subscribe((file) => {
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${program.name}timing.pdf`;
      a.click();
      window.URL.revokeObjectURL(url); // Libère la mémoire utilisée
    });
  }
}
