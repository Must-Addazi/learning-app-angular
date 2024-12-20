import { Component, OnInit } from '@angular/core';
import { Program } from '../model/student.model';
import { ProgramService } from '../service/program.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
public programs:Array<Program>=[]
 constructor(private programService:ProgramService){

 }
   ngOnInit(): void {
    this.programService.getAllPrograms().subscribe({
      next:(data)=>{
        this.programs=data
      }
    })
   }
}
