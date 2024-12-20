import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Module, Program, ResponsibleProgram } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http:HttpClient
  ) { }
  public getAllPrograms():Observable<Array<Program>>{
    return this.http.get<Array<Program>>(`${environment.backendHost}/program`)
  }
  public getAllRespos():Observable<Array<ResponsibleProgram>>{
    return this.http.get<Array<ResponsibleProgram>>(`${environment.backendHost}/respo`)
  }
  public saveRespo(formData: any): Observable<string> {
    return this.http.post(`${environment.backendHost}/saveRespo`, formData, {
      responseType: 'text', // Indique que la réponse sera brute (chaîne de caractères)
    });
  }
  
  public saveProgram(formdata:any):Observable<Program>{
    return this.http.post<Program>(`${environment.backendHost}/saveProgram`,formdata)
  }
  public gettimingFile(programId: string) {
    const url = `${environment.backendHost}/timingFile/${programId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  public getAllModules():Observable<Array<Module>>{
    return this.http.get<Array<Module>>(`${environment.backendHost}/modules`)
  }
  public getModulesByProgram(Id:string):Observable<Array<Module>>{
    return this.http.get<Array<Module>>(`${environment.backendHost}/modules/${Id}`)
  }
}
