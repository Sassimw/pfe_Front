import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement.model';
import { Team } from '../models/team.model';
const baseUrl = 'http://localhost:8080/accessmanager';
@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private http: HttpClient) { }
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(baseUrl+'/Teams', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem(`jwttoken`)}`
      }
    });
  }
}


