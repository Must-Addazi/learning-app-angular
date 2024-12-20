import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../service/program.service';
import { Program } from '../model/student.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
getPosters(_t7: Program) {
throw new Error('Method not implemented.');
}
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
