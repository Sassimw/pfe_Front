import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement.model';
const baseUrl = 'http://localhost:8080/accessmanager';
@Injectable({
  providedIn: 'root'
})
export class DepartementService {
constructor(private http: HttpClient) { }
getAllDepartement(): Observable<Departement[]> {
  return this.http.get<Departement[]>(baseUrl+'/Departements', {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem(`jwttoken`)}`
    }
  });
}
}