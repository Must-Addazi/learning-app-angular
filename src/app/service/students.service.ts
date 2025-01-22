import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Payment, Student } from '../model/student.model';

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
  public conveneStudentList():Observable<Array<Student>>{
  return this.http.get<Array<Student>>(`${environment.backendHost}/conveneStudentList`)
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
public getPaymentFile(paymentId: number) {
  const url = `${environment.backendHost}/paymentFile/${paymentId}`;
  return this.http.get(url, { responseType: 'blob' });
}
public saveStudent(formData:any):Observable<Student>{
  return this.http.post<Student>(`${environment.backendHost}/saveStudent`,formData)
}
public getStudentByProgram(Id:string):Observable<Array<Student>>{
  return this.http.get<Array<Student>>(`${environment.backendHost}/studentDTO/${Id}`)
}
public getStudentsByProgramAndConvene(Id:string):Observable<Array<Student>>{
  return this.http.get<Array<Student>>(`${environment.backendHost}/findByProgramAndConvene/${Id}`)
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

public updateStudent(studentId: string, studentDTO: any): Observable<Student> {
  const params = new HttpParams()
    .set('CIN', studentDTO.CIN)
    .set('NoteBac', studentDTO.NoteBac)
    .set('NoteDiploma', studentDTO.NoteDiploma);
  const payload = { ...studentDTO }; // Copier les données du `studentDTO` dans le corps
  return this.http.put<Student>(`${environment.backendHost}/updateStudent/${studentId}`, payload, { params });
}

public updateStudentFile(studentId: string,file:string,formData:any):Observable<Student>{
  return this.http.put<Student>(`${environment.backendHost}/updateStudentFile/${studentId}/${file}`,formData)
}

public updateStudentPassword(studentEmail: string,payload:any):Observable<any>{
  return this.http.put<any>(`${environment.backendHost}/updateStudentPassword/${studentEmail}`,payload)
}

public conveneStudent(studentId: string): Observable<Student> {
  return this.http.put<Student>(`${environment.backendHost}/conveneStudent/${studentId}`, {});
}

public selectStudent(studentId: string): Observable<Student> {
  return this.http.put<Student>(`${environment.backendHost}/selectStudent/${studentId}`, {});
}
}
