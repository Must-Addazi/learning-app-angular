import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { Payment } from '../model/student.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
newPayment() {
this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`)
}
  studentCode!:string
  studentPayments!:Array<Payment>
  public PaymentdataSource:any;
  public displayedColumns=['id','date','amount','type','status','firstName']
  constructor(private studentsService:StudentsService,public activtedRoute:ActivatedRoute
    , private router:Router
  ){

  }
  ngOnInit(): void {
    this.studentCode=this.activtedRoute.snapshot.params['code']
    this.studentsService.getStudentPayments(this.studentCode).subscribe({
      next:(data)=>{
       this.studentPayments=data
       this.PaymentdataSource= new MatTableDataSource(this.studentPayments)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
