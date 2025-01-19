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
 public getPaymentsByUsername(email:string):Observable<Array<Payment>>{
  return this.http.get<Array<Payment>>(`${environment.backendHost}/payment/${email}/student`)
}
 public savePayment(formData:any):Observable<Payment>{
  return this.http.post<Payment>(`${environment.backendHost}/payment`,formData)
}
getPaymentFile(paymentId: number) {
  const url = `${environment.backendHost}/paymentFile/${paymentId}`;
  return this.http.get(url, { responseType: 'blob' });
}
public saveStudent(formData:any):Observable<Student>{
  return this.http.post<Student>(`${environment.backendHost}/saveStudent`,formData)
}
public getStudentByProgram(Id:string):Observable<Array<Student>>{
  return this.http.get<Array<Student>>(`${environment.backendHost}/studentDTO/${Id}`)
}
public getUserProfileByEmail(email:string):Observable<Student>{
  return this.http.get<Student>(`${environment.backendHost}/studentEmail/${email}`)
}
public editPayment(paymentID:number,status:string):Observable<Payment>{
  const params = { status };
  return this.http.put<Payment>(`${environment.backendHost}/payments/updateStatus/${paymentID}`,null,{params})
}
public deletePayment(paymentID:number):Observable<Boolean>{
 return this.http.delete<Boolean>(`${environment.backendHost}/deletePayment/${paymentID}`)
}
public deleteStudent(studentID:string):Observable<Boolean>{
  return this.http.delete<Boolean>(`${environment.backendHost}/deleteStudent/${studentID}`)
 }
 public getFile(studentId: string,file : string) {
  const url = `${environment.backendHost}/posterFile/${studentId}/${file}`;
  return this.http.get(url, { responseType: 'blob' });
}
public updateStudent(studentId: string,formData:any):Observable<Student>{
  return this.http.put<Student>(`${environment.backendHost}/updateStudent/${studentId}`,formData)
}
public updateStudentFile(studentId: string,file:string,formData:any):Observable<Student>{
  return this.http.put<Student>(`${environment.backendHost}/updateStudentFile/${studentId}/${file}`,formData)
}
public updateStudentPassword(studentEmail: string,formData:any):Observable<any>{
  return this.http.put<any>(`${environment.backendHost}/updateStudentPassword/${studentEmail}`,formData)
}
}
