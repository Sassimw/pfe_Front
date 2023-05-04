import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/service/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url: string = "http://localhost:8085/planning";

  constructor(private httpclient: HttpClient, private tokenservice: TokenService) { }

  public downloadFile(id: any): Observable<any> {
    console.log(this.tokenservice.gettoken())
    var httpOptions = {
      headers: new HttpHeaders({
        responseType: 'blob',
        'Authorization': 'Bearer ' + this.tokenservice.gettoken().toString()
      })
    };
		return this.httpclient.get('http://localhost:8085/planning/'+id+'/download-planning', httpOptions);
  }

}
