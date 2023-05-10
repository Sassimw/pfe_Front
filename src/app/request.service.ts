import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './service/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  
  url: string = "http://localhost:8085/request";
  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }


  public getAllRequests():Observable<any>{
    console.log( this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this.tokenservice.gettoken().toString()
      })
    };
    return this.httpclient.get(this.url+"/AllRequests",httpOptions);
  }


}
