import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/accessmanager';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
  constructor(private http: HttpClient) { }
  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(baseUrl+'/Requests', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem(`jwttoken`)}`
      }
    });
  }

}
