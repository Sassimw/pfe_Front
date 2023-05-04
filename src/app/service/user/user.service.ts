import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  showteamdetails() {
    throw new Error('Method not implemented.');
  }
  url: string = "http://localhost:8085/user";

  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }
  public showalluser():Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    
    return this.httpclient.get(this.url+"/AllUsers",httpOptions);
  }

  public updateUser(team:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.put(this.url+"/updateteamid",team,httpOptions);
  }

  public deleteUser(team:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.delete(this.url+"/deleteteamid/"+team.id,httpOptions);
  }

  public loadUserDetails(userId:any):Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/"+userId+"/details",httpOptions);
  }

}

