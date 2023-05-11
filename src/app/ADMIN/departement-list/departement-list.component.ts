import { Component, OnInit, Output } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { ProjectsService } from 'src/app/service/projects/projects.service';
import { DepartementService } from 'src/app/services/departement.service';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  projects?: any[] = [];
 
  name: string = "";
  budget: Number = 0 ;
  workload: Number = 0 ;
  crucuality: string ="";
  TempDeleteProject:any ;
  TempProject:any = {
    name:"",
    budget:"",
    workload:"",
    criticality:""
  }

  constructor(private projectService: ProjectsService) { }
  ngOnInit(): void {
    this.retrieveAll();
  }
  initDeleteModal(project:any){
    this.TempDeleteProject = project;
  }
  initUpdateModal(project:any){
    console.log("wijden");
    this.TempProject = project;
    console.log("this.TempProject  ");
    console.log(this.TempProject);
  }
  retrieveAll(): void {
    this.projectService.getAllProject()
      .subscribe({
        next: (response) => {
          for (var i = 0; i < response.length; i++) {
            var p = {
              id: response[i].id,
              name: response[i].name,
              budget: response[i].budget,
              budget_status: response[i].budget_status,
              workload: response[i].workload,
              startDate: response[i].startDate,
              endDate: response[i].endDate,
              project_status: response[i].project_status,
              total_ressources_number: response[i].total_ressources_number,
              criticality: response[i].criticality
            }

            this.projects?.push(p);
          }
          console.log(this.projects);
        },
        error: (e) => console.error(e)
      });
  }
  message: any;
  x: any;
  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }

  public addProject() {
     /*else if (this.name.length > 30) {
      this.showmessagesnackbar("Make sure the name does not pass 30 caracters")

    }*/
    if ( (this.name === "")||(this.budget === 0)||(this.workload === 0)||(this.crucuality === "") ) {
      this.showmessagesnackbar("Please fill all the data !");
    }
    else {

      var json = {
        "name": this.name,
        "budget": this.budget,
        "workload": this.workload,
        "criticality": this.crucuality
      }
      this.projectService.addProject(json).subscribe(
        response => {
          this.showmessagesnackbar(response.message);
          setTimeout(() => { location.reload(); }, 2000);
        }
      );
    }
  }


  deleteProject(){

    this.projectService.deleteProject(this.TempDeleteProject).pipe
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

   modifProject(){

    this.projectService.updateProject(this.TempProject.id,this.TempProject.name,this.TempProject.budget,this.TempProject.workload,this.TempProject.criticality).pipe
    (catchError(error => {
      console.log(error);
      this.showmessagesnackbar("Error when deleting team. Please contact administrator");
      return of();
    })).subscribe(
    response => {
      this.showmessagesnackbar("Team modified successfully");
      setTimeout(() => { location.reload(); }, 2000);
      
    })

  }
}

