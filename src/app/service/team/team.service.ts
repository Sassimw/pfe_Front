import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url: string = "http://localhost:8085/team";
  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }

  public addteam(addteamRequest: any): Observable<any> {
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };

    return this.httpclient.post(this.url + "/add", addteamRequest, httpOptions);
  } 
  public showteamdetails():Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/viewallteams",httpOptions);
  }

  public updateTeam(id:any ,name:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.post(this.url+"/Updatename?teamid="+id+"&name="+name,null,httpOptions);
  }

  public updateManager(id:any ,userid:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.post(this.url+"/Updatemanager?teamid="+id+"&userid="+userid,null,httpOptions);
  }

  public deleteTeam(team:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.delete(this.url+"/deleteteamid/"+team.id,httpOptions);
  }


  public getTeamMembers(id:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/"+id+"/members",httpOptions);
  }




}
