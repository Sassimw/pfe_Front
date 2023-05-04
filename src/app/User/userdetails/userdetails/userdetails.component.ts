import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  user: any = {
    id: "",
    matcle: "",
    firstname: "",
    lastname: "",
    speciality: "",
    nbrOfProjectsOfUser: "",
    globalUserScore: "",
    userglobalscoreperproject: "",
    numberofuserprojects: "",
    team: {
      id: ""
  }
  }

  manager: any = {
    id: "",
    matcle: "",
    firstname: "",
    lastname: "",
    speciality: "",
    nbrOfProjectsOfUser: "",
    globalUserScore: "",
    userglobalscoreperproject: "",
    numberofuserprojects: "",
    team: {
      id: ""
  }
  }

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    var userId = this.route.snapshot.paramMap.get('id');
    this.userService.loadUserDetails(userId).subscribe(
      result => {
        this.user = {
          id: result.id,
          matcle: result.matcle,
          firstname: result.firstname,
          lastname: result.lastname,
          speciality: result.speciality,
          nbrOfProjectsOfUser: result.nbrOfProjectsOfUser,
          globalUserScore: result.globalUserScore,
          userglobalscoreperproject: result.userglobalscoreperproject,
          numberofuserprojects: result.numberofuserprojects,
          team: {
            id: result.team.id,
            name: result.team.name,
            manager: result.team.manager
        },
        }
        console.log(this.user);

        this.loadManagerDetails(this.user.team.manager);
      }
    )
  }


  loadManagerDetails(managerId:any) {
    this.userService.loadUserDetails(managerId).subscribe(
      result => {
        this.manager = {
          id: result.id,
          matcle: result.matcle,
          firstname: result.firstname,
          lastname: result.lastname,
          speciality: result.speciality,
          nbrOfProjectsOfUser: result.nbrOfProjectsOfUser,
          globalUserScore: result.globalUserScore,
          userglobalscoreperproject: result.userglobalscoreperproject,
          numberofuserprojects: result.numberofuserprojects,
          team: {
            id: result.team.id,
            name: result.team.name,
            manager: result.team.manager
        },
        }
      }
    )
  }

  
}
