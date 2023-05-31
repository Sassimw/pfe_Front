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

  public updateUser(id:any,firstname:any,lastname:any,email:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    var completeurl=this.url+"/UpdateUser?userid="+id+"&firstname="+firstname+
    "&lastname="+lastname+"&email="+email;
    return this.httpclient.post(completeurl,null,httpOptions);
  }



  public loadUserDetails(userId:any):Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/"+userId+"/details",httpOptions);
  }

  public updateUserTeam(idPerson:any,idTeamany:any){
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    var completeurl=this.url+"/Updateteam?userid="+idPerson+"&teamid="+idTeamany;
    return this.httpclient.post(completeurl,null,httpOptions);
  }

  public getTeam(idPerson:any){  
    console.log( "wijden token " + this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    
    return this.httpclient.get(this.url+"/team/"+idPerson);
  }

  public deleteUser(user:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.delete(this.url+"/deleteuser/"+user.id,httpOptions);
  }


  public getConnectedUser():Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/Connected",httpOptions);
  }
}

