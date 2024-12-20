import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Module, Program } from '../model/student.model';
import { ProgramService } from '../service/program.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  public modules:Array<Module>=[];
  public dataSource:any;
  public programs:Array<Program>=[]
  public DisplayedColumn=["id","name","teacherName"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private programService:ProgramService){

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

}

