import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  url: string = "http://localhost:8085/planning";


  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }

  public getPlanningForOneUser(id: any): Observable<any> {
    console.log(this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url + "/ExportPlaningForOneUser?userid=" + id, httpOptions);
  }

  public getPlanningForOneAllUser(): Observable<any> {
    console.log(this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url + "/ExportPlaning", httpOptions);
  }

  public makeNewAssignment(userid: any, projectid: any, month: any, day: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    console.log("wijden project id " + projectid ) ;
    return this.httpclient.post(this.url + "/add?userid=" + userid + "&projectid=" + projectid + "&month=" + month + "&day=" + day, null, httpOptions);
  }

  public makeNewAssignmentAndUpdateRequest(userid: any, projectid: any, month: any, day: any,requestid:any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    console.log("wijden project id " + projectid ) ;
    return this.httpclient.post(this.url + "/addFromReq?userid=" + userid + "&projectid=" + projectid + "&month=" + month + "&day=" + day+"&reqid="+requestid, null, httpOptions);
  }

  public deleteAssignment(assigbmentId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.delete(this.url + "/" + assigbmentId + "/delete", httpOptions);
  }
  public updateAssignment(assigbmentId: any, projectId: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.put(this.url + "/" + assigbmentId + "/update?projectId=" + projectId, null, httpOptions);
  }

}
