import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/service/team/team.service';

@Component({
  selector: 'app-teammembers',
  templateUrl: './teammembers.component.html',
  styleUrls: ['./teammembers.component.css']
})
export class TeammembersComponent implements OnInit {

  constructor(private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTeamMembers()
  }

  users?: any[] = [];

  loadTeamMembers() {
    var teamId = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeamMembers(teamId).subscribe(
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
