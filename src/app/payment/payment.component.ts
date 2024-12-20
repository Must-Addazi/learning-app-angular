import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from '../service/students.service';
import { Payment } from '../model/student.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit {
  public payments!:Array<Payment>;
  public dataSource:any;
  
  public displayedColumns=['id','date','amount','type','status','firstName','paymentFile']
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private studentService:StudentsService){

  }
  downloadFile(paymentId: number) {
    this.studentService.getPaymentFile(paymentId).subscribe((file) => {
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payment_${paymentId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url); // Libère la mémoire utilisée
    });
  }
  
  filterPayment($event: Event) {
    let value=($event.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }
  ngOnInit(): void {
    this.studentService.getAllPayment().subscribe({
      next:(data)=>{
        console.log(data)
           this.payments=data
           this.dataSource= new MatTableDataSource(this.payments)
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err)
            }
    })
  }

}


