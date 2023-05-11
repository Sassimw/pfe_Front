import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService { 

  url: string = "http://localhost:8085/projects";


  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }

  public getAllProject(): Observable<any> {
    console.log(this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url, httpOptions);
  }


  public getProjectMembers(projectId: any): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url + "/" + projectId + "/members", httpOptions);
  }


  public searchResources(name: any, tag: any): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get("http://localhost:8085/user/search?" + tag + "=" + name, httpOptions);
  }

  public requestResource(userId: any, projectId: any, year: any, month: any, day: any): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get("http://localhost:8085/user/" + userId + "/request/" + projectId + "?year=" + year + "&month=" + month + "&day=" + day, httpOptions);
  }

  public addProject(addProjectRequest: any): Observable<any> {
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };

    return this.httpclient.post(this.url, addProjectRequest, httpOptions);
  }

  public deleteProject(project:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.delete(this.url+"/deleteprojectid/"+project.id,httpOptions);
  }

  public updateProject(id:any,name:any,budget:any,workload:any,crucuality:any):Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    var completeurl=this.url+"/UpdateProject?projectid="+id+"&name="+name+
    "&budget="+budget+"&workload="+workload+"&crucuality="+crucuality;
    return this.httpclient.post(completeurl,null,httpOptions);
  }
}
