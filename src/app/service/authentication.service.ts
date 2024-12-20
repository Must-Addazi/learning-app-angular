import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username!:any;
  public password!:string;
  public isAuthenticated:boolean=false
  public Role!:any;
  accesToken!:any
  private readonly baseUrl = "http://localhost:8080/auth";

  constructor(private http:HttpClient, private router:Router) { }
  login(username:string,password:string):Observable<any>{
    const headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    const params = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.http.post(`${this.baseUrl}/login`, params.toString(), { headers });
  }
  loadProfile(data: any) {
    this.isAuthenticated=true
    this.accesToken=data['access-token']
    let jwtdecoded:any=jwtDecode(this.accesToken)
    this.username=jwtdecoded.sub;
    this.Role=jwtdecoded.scope;
    window.localStorage.setItem("jwt-token",this.accesToken)
  }
  public logout(){
    this.isAuthenticated=false
   this.username=undefined
   this.Role=undefined
   this.accesToken=undefined
   this.router.navigateByUrl("/login")
  }
}
