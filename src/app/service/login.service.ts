import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api: string = `http://localhost:8085/Auth/login`;

  constructor(private http: HttpClient) {}


  public login(request: any): Observable<any> {
    return this.http.post<any>(`${this.api}`, request);
  }

}
