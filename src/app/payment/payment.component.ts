import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from '../service/students.service';
import { Payment } from '../model/student.model';
import { AuthenticationService } from '../service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit {
  public payments!:Array<Payment>;
  public dataSource:any;
  isEditMode: boolean = false;

  
  public displayedColumns=['id','date','amount','type','status','firstName','paymentFile','action']
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private route: ActivatedRoute,private router:Router, private studentService:StudentsService, public authservice:AuthenticationService ){

  }
  ngOnInit(): void {
    if (this.authservice.Role.includes('ADMIN')) {
      const code = this.route.snapshot.paramMap.get('code');
      if (code) {
        this.loadStudentPayments(code);
      } else {
        this.loadAllPayments();
      }
    } else {
      this.getPaymentsByUsername();
    }
  }
  
  private loadStudentPayments(code: string): void {
    this.studentService.getStudentPayments(code).subscribe({
      next: (data) => this.handlePaymentData(data),
      error: (err) => this.handleError(err),
    });
  }
  
  private loadAllPayments(): void {
    this.studentService.getAllPayment().subscribe({
      next: (data) => this.handlePaymentData(data),
      error: (err) => this.handleError(err),
    });
  }
  
  private getPaymentsByUsername(): void {
    this.studentService.getPaymentsByUsername(this.authservice.username).subscribe({
      next: (data) => this.handlePaymentData(data),
      error: (err) => this.handleError(err),
    });
  }
  
  private handlePaymentData(data: any): void {
    console.log(data);
    this.payments = data;
    this.dataSource = new MatTableDataSource(this.payments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  private handleError(error: any): void {
    console.error('Error:', error);
  }
  
  downloadFile(paymentId: number) {
    this.studentService.getPaymentFile(paymentId).subscribe((file) => {
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // Ouvre le fichier dans un nouvel onglet
      window.open(url, '_blank');
      // Libère la mémoire utilisée
      window.URL.revokeObjectURL(url);
    });
  }
  
  filterPayment($event: Event) {
    let value=($event.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }
  newPayment() {
this.router.navigateByUrl(`/admin/new-payment/${this.authservice.username}`)
  }
  edit(payment:Payment){
    this.router.navigateByUrl(`/admin/editpayement/${payment.id}`)
  }
  deletePayment(paymentId: number) {
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
        this.studentService.deletePayment(paymentId).subscribe({
          next:(data)=>{
            this.getPaymentsByUsername()
            Swal.fire({
              title: "Deleted!",
              text: "Your Consumption has been deleted.",
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
}


