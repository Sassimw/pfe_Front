import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  url:string="http://localhost:8085/Auth";


  constructor(private httpclient:HttpClient) {
   }
   public signup(signupRequest:any):Observable<any>{
    return this.httpclient.post(this.url+"/register",signupRequest);
   }
}
