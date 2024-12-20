import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Payment, Program, Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private http:HttpClient) { }
  public getAllPayment():Observable<Array<Payment>>{
   return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`)
  }
  public getAllStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`)
   }
 public getStudentPayments(code:string):Observable<Array<Payment>>{
     return this.http.get<Array<Payment>>(`${environment.backendHost}/student/${code}/payment`)
 }
 public savePayment(formData:any):Observable<Payment>{
  return this.http.post<Payment>(`${environment.backendHost}/payment`,formData)
}
getPaymentFile(paymentId: number) {
  const url = `${environment.backendHost}/paymentFile/${paymentId}`;
  return this.http.get(url, { responseType: 'blob' });
}
public saveStudent(formData:any):Observable<Student>{
  return this.http.post<Student>(`${environment.backendHost}/student`,formData)
}
public getStudentByProgram(Id:string):Observable<Array<Student>>{
  return this.http.get<Array<Student>>(`${environment.backendHost}/studentDTO/${Id}`)
}
}
