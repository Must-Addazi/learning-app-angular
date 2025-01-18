import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username!:any;
  public password!:string;
  public Role!:any;
  accesToken!:any
  private readonly baseUrl = "http://localhost:8080/auth";

  constructor(private http:HttpClient, private router:Router) { }
  login(username:string,password:string):Observable<any>{
    const headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    const params = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.http.post(`${environment.backendHost}/auth/login`, params.toString(), { headers });
  }
  loadProfile(data: any) {
    this.accesToken=data['access-token']
    let jwtdecoded:any=jwtDecode(this.accesToken)
    this.username=jwtdecoded.sub;
    this.Role=jwtdecoded.scope;
    window.localStorage.setItem("jwt-token",this.accesToken)
  }
  public logout(){
   this.username=undefined
   this.Role=undefined
   this.accesToken=undefined
   localStorage.removeItem("jwt-token");
   this.router.navigateByUrl("/login")
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("jwt-token");
    if (!token) return false;
  
    try {
      this.accesToken=token
    let jwtdecoded:any=jwtDecode(this.accesToken)
    this.username=jwtdecoded.sub;
    this.Role=jwtdecoded.scope;
      const currentTime = Math.floor(Date.now() / 1000); 
      return jwtdecoded.exp > currentTime; 
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }
  
}
