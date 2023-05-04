import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user/user.service';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {


  persons?: any[] = [];
  user: any;
  constructor(private personService: PersonService, private userservice: UserService) { }
  ngOnInit(): void {
    // this.retrieveAll();
    this.showallteams();
  }
  retrieveAll(): void {
    this.personService.getAll()
      .subscribe({
        next: (data) => {
          this.persons = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
  public showallteams() {
    this.userservice.showalluser().subscribe(
      (response: string | any[]): void => {
        for (var i = 0; i < response.length; i++) {

          var user = {
            "id": response[i].id,
            "firstName": response[i].firstname,
            "lastName": response[i].lastname,
            "speciality": response[i].speciality,
            "nbrOfProjectsOfUser": response[i].nbrOfProjectsOfUser,
            "globalUserScore": response[i].globalUserScore,
            "userglobalscoreperproject": response[i].userglobalscoreperproject,
            "numberofuserprojects": response[i].numberofuserprojects
          }

          this.persons?.push(user);

        }
        console.log(this.persons);


      }
    )
  }

  x: any;
  message: any;
  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }


  TempUpdatePerson: any = {
    name: ""
  }
  TempDeletePerson: any = {
    name: ""
  }
  initUpdateModal(person: any) {
    this.TempUpdatePerson = person;
  }

  initDeleteModal(person: any) {
    this.TempDeletePerson = person;
  }


  confirmUpdate() {
    this.userservice.updateUser(this.TempUpdatePerson).pipe
      (catchError(error => {
        console.log(error);
        this.showmessagesnackbar("Error when updating user. Please contact administrator");
        return of();
      })).subscribe(
        response => {
          this.showmessagesnackbar("User updated successfully");
        })
  }

  deleteTeam() {

    this.userservice.deleteUser(this.TempDeletePerson).pipe
      (catchError(error => {
        console.log(error);
        this.showmessagesnackbar("Error when deleting user. Please contact administrator");
        return of();
      })).subscribe(
        response => {
          this.showmessagesnackbar("User deleted successfully");
          setTimeout(() => { location.reload(); }, 2000);

        })

  }

}


