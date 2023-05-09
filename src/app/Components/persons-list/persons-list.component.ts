import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';
import { TeamService } from 'src/app/service/team/team.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {


  persons?: any[] = [];
  user: any;
  teamID: any; 
  team: any; 
  teams?: any[] = [];
  TempUpdatePerson: any = {
    id:"",
    firstname:"",
    lastname:"",
    email:""
  }
  TempDeletePerson: any = {
    name: ""
  }
  temmUpdatebasicinfo:any = {
    id:"",
    firstname:"",
    lastname:"",
    email:""
  }
  TempTeam:any = {
    name:""
  }
  constructor(private personService: PersonService, private userservice: UserService,private teamsService : TeamService, private router: Router) { }
  ngOnInit(): void {
    // this.retrieveAll();
    this.showallUsers();
    this.getAllTeams();
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
  public getAllTeams(){
    this.teamsService.showteamdetails().subscribe(
      (response: string | any[]): void => {
        for (var i = 0; i < response.length; i++) {

          var team = {
            "id": response[i].id,
            "name": response[i].name,
            "manager": response[i].manager
          }

          this.teams?.push(team);

        }
        console.log(this.teams);


      }
    )
  }

  handleChangeTeam(e: any) {
    console.log("wijden handlechange " + e.target.value )
    this.teamID = e.target.value;
    console.log("wijden this.newAssignment.teams " + this.teamID ) ; 
  }
  public showallUsers() {
    this.userservice.showalluser().pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }
       
 
    })).subscribe(
      (response: string | any[]): void => {
        for (var i = 0; i < response.length; i++) {
          console.log (i);
          var teamnname;
           if (response[i].team === null )
             teamnname="No team";
            else
              teamnname = response[i].team.name ; 
          var user = {
            "id": response[i].id,
            "email": response[i].email,
            "matcle": response[i].matcle,
            "firstName": response[i].firstname,
            "lastName": response[i].lastname,
            "speciality": response[i].speciality,
            "nbrOfProjectsOfUser": response[i].nbrOfProjectsOfUser,
            "globalUserScore": response[i].globalUserScore,
            "userglobalscoreperproject": response[i].userglobalscoreperproject,
            "numberofuserprojects": response[i].numberofuserprojects,
            "teamname" : teamnname
          }
 
          this.persons?.push(user);

        }
 
      }
    )
  }

  public getTeambyid(id: any) {
    this.userservice.getTeam(id).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }
       
 
    })).subscribe( (data : any) =>{
      console.log("wijden team getTeambyid" + data.name )
    }
    );
  }

  x: any;
  message: any;
  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }



  initUpdateModal(person: any) {
    this.temmUpdatebasicinfo.id = person.id;
    this.temmUpdatebasicinfo.firstname = person.firstName;
    this.temmUpdatebasicinfo.lastname = person.lastName;
    this.temmUpdatebasicinfo.email = person.email;
    console.log("************************** ");
    console.log("wijden initUpdateModal ");
    console.log(person);
    console.log("************************** ");
  }

  initDeleteModal(person: any) {
    this.TempDeletePerson = person;
    console.log("************************** ");
    console.log(this.TempDeletePerson) ;
  }
  getUserData(id : any){
    this.TempUpdatePerson = this.persons?.find(x => x.id == id);
    console.log(this.TempUpdatePerson) ;
  }

  confirmUpdate() {
   this.userservice.updateUser(this.temmUpdatebasicinfo.id,this.temmUpdatebasicinfo.firstname,this.temmUpdatebasicinfo.lastname,this.temmUpdatebasicinfo.email).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
      {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }      
     })).subscribe(
          response => {
            /*this.persons?.find(x => x.id == id).email==this.temmUpdatebasicinfo.email;
            this.persons?.find(x => x.id == id).firstName==this.temmUpdatebasicinfo.email;
            this.persons?.find(x => x.id == id).lastName==this.temmUpdatebasicinfo.email;*/
            this.showmessagesnackbar("User updated successfully");
            setTimeout(() => { location.reload(); }, 2000);
          })
  }

  ChangeTeam() {
    this.userservice.updateUserTeam(this.temmUpdatebasicinfo.id,this.teamID).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }
       
 
    })).subscribe(
         response => {
           this.showmessagesnackbar("Team changed successfully");
           setTimeout(() => { location.reload(); }, 2000);
         })
   }

  deleteTeam() {

    this.userservice.deleteUser(this.TempDeletePerson).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }
       
 
    })).subscribe(
        response => {
          this.showmessagesnackbar("User deleted successfully");
          setTimeout(() => { location.reload(); }, 2000);

        })

  }

  deleteUser(){

    this.userservice.deleteUser(this.TempDeletePerson).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            this.showmessagesnackbar("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        this.showmessagesnackbar("System error occuried !");
        return of();
      }
       
 
    })).subscribe(
    response => {
      this.showmessagesnackbar("Team deleted successfully");
      setTimeout(() => { location.reload(); }, 2000);
      
    })

  }

}


