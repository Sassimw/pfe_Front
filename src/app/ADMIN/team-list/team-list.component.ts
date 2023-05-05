import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/service/team/team.service';
import { Router } from '@angular/router';

import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {


  teams?: any[] = [];
  name: string = "";
  message: any;
  constructor(private teamService: TeamService, private router: Router) { }
  ngOnInit(): void {
    this.showallteams();
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

          var team = {
            "id": response[i].id,
            "name": response[i].name

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

  confirmUpdate(){
    this.teamService.updateTeam(this.TempTeam).pipe
    (catchError(error => {
      console.log(error);
      this.showmessagesnackbar("Error when updating team. Please contact administrator");
      return of();
  })).subscribe(
    response => {
      this.showmessagesnackbar("Team updated successfully");
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
}
