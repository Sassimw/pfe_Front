import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/service/team/team.service';
import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.css']
})
export class TeammembersComponent implements OnInit {

  constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadTeamMembers()
  }

  users?: any[] = [];

  loadTeamMembers() {
    var teamId = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeamMembers(teamId).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
         
            this.router.navigate(["/login"]);
            return of()
          }
      else
       { 
        return of();
      }
       
 
    })).subscribe(
      response => {
        for (var i = 0; i < response.length; i++) {
          var user = {
            id: response[i].id,
            firstname: response[i].firstname,
            lastname: response[i].lastname,
            speciality: response[i].speciality,
          }

          this.users?.push(user);

        }
        console.log(this.users);


      }
    );
  }

}
