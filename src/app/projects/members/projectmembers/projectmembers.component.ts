import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/service/projects/projects.service';

@Component({
  selector: 'app-projectmembers',
  templateUrl: './projectmembers.component.html',
  styleUrls: ['./projectmembers.component.css']
})
export class ProjectmembersComponent implements OnInit {

  constructor(private projectService: ProjectsService, private route: ActivatedRoute) { }

  message: any = "";
  users: any[] = [];
  foundUsers: any[] = [];

  searchData: any = {
    name: "",
    speciality: "",
    date: ""
  }
  gotResults: boolean = false;

  ngOnInit(): void {
    this.showallUsers();
  }


  public showallUsers() {
    const project = this.route.snapshot.paramMap.get('id');

    this.projectService.getProjectMembers(project).subscribe(
      (response: string | any[]): void => {
        for (var i = 0; i < response.length; i++) {

          var user = {
            "id": response[i].id,
            "matcle": response[i].matcle,
            "firstname": response[i].firstname,
            "lastname": response[i].lastname,
            "speciality": response[i].speciality
          }

          this.users?.push(user);

        }
        console.log(this.users);


      }
    )
  }

  searchForResources() {
    if (this.searchData.name !== "" && this.searchData.speciality !== "") {
      this.showmessagesnackbar("Choose either name or speciality.");
    } else {
      var searchItem = "";
      var tag = "";
      if (this.searchData.name !== "" && this.searchData.speciality === "") {
        searchItem = this.searchData.name;
        tag = "name"
      } else if (this.searchData.name === "" && this.searchData.speciality !== "") {
        searchItem = this.searchData.speciality;
        tag = "speciality"
      }

      this.projectService.searchResources(searchItem, tag).subscribe(
        result => {
          // alert(JSON.stringify(result))
          this.foundUsers = result;
          if (result.length > 0) {
            this.gotResults = true;
          } else {
            this.showmessagesnackbar("No results found");
          }
        }
      )

    }


  }
  requestResource(userId: any) {
    if (this.searchData.date === "") {
      this.showmessagesnackbar("Please enter the desired date.")
    } else {
      const projectId = this.route.snapshot.paramMap.get('id');
      console.log("wijden projectId " + projectId) ; 
      var date = this.searchData.date.toString(); //2022-11-25
      console.log("wijden date " + date) ; 
      this.projectService.requestResource(userId, projectId, date.substr(0, 4), date.substr(5, 2), date.substr(8, 2))
        .subscribe(result => {
          alert(result.message);
        });
    }

  }

  x: any;

  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }
}
