import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/service/team/team.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {


  teams?: any[] = [];
  users?: any[] = [];
  name: string = "";
  managerID: any; 
  manager: any;
  message: any;
  constructor(private teamService: TeamService, private router: Router,private userservice: UserService) { }
  ngOnInit(): void {
    this.showallteams();
    this.showallUsers();
  }

  public addteam() {
    if (this.name === "") {
      this.showmessagesnackbar("You should give this team a Name if you shall");
    }
    else if (this.name.length > 30) {
      this.showmessagesnackbar("Make sure the name does not pass 30 caracters")

    }
    else {

      var json = {
        "name": this.name,

      }
      this.teamService.addteam(json).subscribe(
        response => {
          this.showmessagesnackbar(response.message);
          setTimeout(() => { location.reload(); }, 2000);
        }
      );
    }
  }
  x: any;

  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }




  public showallteams() {
    this.teamService.showteamdetails().subscribe(
      response => {
        for (var i = 0; i < response.length; i++) {

          var wmanager;
           if (response[i].manager === null )
            wmanager="No manager";
            else
            wmanager = response[i].manager.firstname + " "  +response[i].manager.lastname ; 

          var team = {
            "id": response[i].id,
            "name": response[i].name,
            "manager": wmanager
          }

          this.teams?.push(team);

        }
        console.log(this.teams);


      }
    )
  }

  TempTeam:any = {
    name:""
  }
  TempDeleteTeam:any = {
    name:""
  }
  initUpdateModal(team:any){
    this.TempTeam = team;
  }

  initDeleteModal(team:any){
    this.TempDeleteTeam = team;
  }
  
  confirmUpdateManager(){
    console.log("wijden");
    console.log(this.TempTeam);
    this.teamService.updateManager(this.TempTeam.id,this.managerID).pipe
    (catchError(error => {
      console.log("wijden error ");
      console.log(error.status);
      if (error.status === 409)
             this.showmessagesnackbar("User is a member of the team , he can't be the manager !");
      else
             this.showmessagesnackbar("Error when updating team. Please contact administrator");
      return of();
  })).subscribe(
    response => {
      this.showmessagesnackbar("Team updated successfully");
      setTimeout(() => { location.reload(); }, 2000);
    })
  }
  confirmUpdate(){
    console.log("wijden");
    console.log(this.TempTeam);
    this.teamService.updateTeam(this.TempTeam.id,this.TempTeam.name).pipe
    (catchError(error => {
      console.log(error);
      this.showmessagesnackbar("Error when updating team. Please contact administrator");
      return of();
     })).subscribe(
    response => {
      this.showmessagesnackbar("Team updated successfully");
      setTimeout(() => { location.reload(); }, 2000);
    })
  }

  deleteTeam(){

    this.teamService.deleteTeam(this.TempDeleteTeam).pipe
    (catchError(error => {
      console.log(error);
      this.showmessagesnackbar("Error when deleting team. Please contact administrator");
      return of();
     })).subscribe(
    response => {
      this.showmessagesnackbar("Team deleted successfully");
      setTimeout(() => { location.reload(); }, 2000);
      
    })

  }

  listMembers(team:any){
    this.router.navigate(["/team-members/"+team.id])
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
            "firstname": response[i].firstname,
            "lastname": response[i].lastname,
            "speciality": response[i].speciality,
            "nbrOfProjectsOfUser": response[i].nbrOfProjectsOfUser,
            "globalUserScore": response[i].globalUserScore,
            "userglobalscoreperproject": response[i].userglobalscoreperproject,
            "numberofuserprojects": response[i].numberofuserprojects,
            "teamname" : teamnname
          }
 
          this.users?.push(user);

        }
 
      }
    )
  }

  handleChangeTeam(e: any) {
    console.log("wijden handlechange " + e.target.value )
    this.managerID = e.target.value;
    console.log("wijden manager id  " + this.managerID ) ; 
  }

}
