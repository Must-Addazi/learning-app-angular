import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Module, Poster, Program, ResponsibleProgram } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http:HttpClient
  ) { }
  public getAllPrograms():Observable<Array<Program>>{
    return this.http.get<Array<Program>>(`${environment.backendHost}/program`)
  }
  public programById(programId:string):Observable<Program>{
    return this.http.get<Program>(`${environment.backendHost}/programById/${programId}`)
  }
  public programByRespo(respoEmail:string):Observable<Program>{
    console.log(respoEmail)
    return this.http.get<Program>(`${environment.backendHost}/getProgramByRespo/${respoEmail}`)
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
  public saveModule(formdataModule:any):Observable<Module>{
    return this.http.post<Module>(`${environment.backendHost}/saveModule`,formdataModule)
  }
  public getFile(programId: string,file:string) {
    const url = `${environment.backendHost}/getFile/${programId}/${file}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  public getAllModules():Observable<Array<Module>>{
    return this.http.get<Array<Module>>(`${environment.backendHost}/modules`)
  }
  public getModulesByProgram(Id:string):Observable<Array<Module>>{
    return this.http.get<Array<Module>>(`${environment.backendHost}/modules/${Id}`)
  }
  public deleteProgram(programId:string):Observable<Boolean>{
    return this.http.delete<Boolean>(`${environment.backendHost}/deleteProgram/${programId}`)
   }
   public deleteModule(moduleId:string):Observable<Boolean>{
    return this.http.delete<Boolean>(`${environment.backendHost}/deleteModule/${moduleId}`)
   }
   public updateProgram(formdata:any): Observable<Program> {   
     return this.http.put<Program>(`${environment.backendHost}/updateProgram`, formdata);
   }
   public getModule(Id:string):Observable<Module>{
    return this.http.get<Module>(`${environment.backendHost}/module/${Id}`)
  }
  public updateModule(payload:Module):Observable<any>{
    return this.http.put<any>(`${environment.backendHost}/updateModule`,payload)
  }
  public getAllPosters():Observable<Array<Poster>>{
    return this.http.get<Array<Poster>>(`${environment.backendHost}/posters`)
  }
  public savePoster(formdata:any,programId:string):Observable<Poster>{
    return this.http.post<Poster>(`${environment.backendHost}/savePoster/${programId}`,formdata)
  }
  public deletePoster(id:number):Observable<Boolean>{
    return this.http.delete<Boolean>(`${environment.backendHost}/deletePoster/${id}`)
   }
}
