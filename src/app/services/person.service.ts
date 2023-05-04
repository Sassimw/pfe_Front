import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
const baseUrl = 'http://localhost:8080/accessmanager';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(baseUrl+'/Persons', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem(`jwttoken`)}`
      }
    });
  }

  // addPerson(person: Person): Observable<Person> {
  //   return this.http.post('${baseUrl}/Person', person);
  // }

  addPerson(body:any){
    return this.http.post('${baseUrl}/Person', body);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete('${baseUrl}/${id}', {responseType: 'text'});
  }
  updatePerson(id: number, value: any): Observable<object> {
    return this.http.put('${baseUrl}/${id}', value);
    }

    getPeso(id: number): Observable<any> {
      return this.http.get('${this.baseUrl}/${id}');
      }
}


