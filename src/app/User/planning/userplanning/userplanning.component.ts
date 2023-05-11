import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { Observable } from 'rxjs';
import { PlanningService } from 'src/app/service/planning/planning.service';
import { ProjectsService } from 'src/app/service/projects/projects.service';
import { TokenService } from 'src/app/service/token/token.service';
import { FileService } from 'src/app/services/file/file.service';
import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-userplanning',
  templateUrl: './userplanning.component.html',
  styleUrls: ['./userplanning.component.css']
})
export class UserplanningComponent implements OnInit {

  persons?: any[] = [];
  targetUserId: any = "";
  newAssignment = {
    projectId: "",
    date: ""
  }
  TempUpdatePerson: any = {
    id:"",
    firstname:"",
    lastname:"",
    email:""
  }
  tempAssignmentDate: any = "";
  targetAssignment: any = "";
  targetProject: any = "";

  userPlanning: any[] = [];
  projects: any[] = [];

  displayEventModal: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  constructor(private planningService: PlanningService, private projectsService: ProjectsService,private userservice: UserService, private route: ActivatedRoute, private fileService: FileService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadUserPlanning();
    this.showallUsers();
  }

  loadUserPlanning() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.targetUserId = userId;
    this.planningService.getPlanningForOneUser(userId).pipe(catchError(error => {

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
      planning => {
        console.log(planning);
        for (var i = 0; i < planning.assignments.length; i++) {
          var p = planning.assignments[i];
          if (p.day < 10) {
            p.day = "0" + p.day
          }
          if (p.month < 10) {
            p.month = "0" + p.month
          }
          var entry = {
            title: p.project.name,
            date: '2023-' + p.month + '-' + p.day,
            id: JSON.stringify({ assignment: p.id, project: p.project.id }),
          }
          this.userPlanning.push(entry);
        }
        // this.userPlanning = planning;
        console.log("wijden this.userPlanning " );
        console.log(this.userPlanning);
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          //events: [{ title: 'event 1', date: '2023-05-01' },{ title: 'wijden', date: '2023-05-24' }],
          events: this.userPlanning,
           eventClick: (info) => {
            this.targetAssignment = JSON.parse(info.event.id).assignment;
            this.targetProject = JSON.parse(info.event.id).project;
            this.tempAssignmentDate = info.event.startStr;
            this.displayEventModal = true;
            console.log(JSON.parse(info.event.id));

          }
        };

      }
    )
  }

  closeAssignmentModal() {
    this.displayEventModal = false;
  }

  loadProjects() {
    this.projectsService.getAllProject().pipe(catchError(error => {

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
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          const project = {
            id: element.id,
            name: element.name
          }
          this.projects.push(project);
        }
      }
    );
  }



  handleChange(e: any) {
    console.log("wijden handlechange " + e.target.value )
    this.newAssignment.projectId = e.target.value;
    console.log("wijden this.newAssignment.projectId " + this.newAssignment.projectId ) ; 
  }

  handleProjectChange(e: any) {
    this.newAssignment.projectId = e.target.value;
  }

  addAssignment() {
    console.log(this.newAssignment)
    const month = this.newAssignment.date.substring(5, 7);
    const day = this.newAssignment.date.substring(8, 10);
    const userId = this.route.snapshot.paramMap.get('id');
    console.log("wijden addAssignment() project id " + this.newAssignment.projectId );
    console.log("wijden addAssignment() month " + month );
    console.log("wijden addAssignment() day " + day );
    this.planningService.makeNewAssignment(userId, this.newAssignment.projectId, month, day).subscribe(
      response => {
        location.reload();
      }
    )
  }

  deleteAssignment() {
    var confirmDelete = confirm("Are you sure you want to delete this assignment ?");
    if (confirmDelete) {
      this.planningService.deleteAssignment(this.targetAssignment).pipe(catchError(error => {

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
        result => {
          location.reload();
        }
      )

    } else {
      alert("ok cancel.")
    }
    this.closeAssignmentModal();


  }

  updateAssignment() {
    this.planningService.updateAssignment(this.targetAssignment, this.newAssignment.projectId).pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
      if  (error.status === 401 )
          {
            console.log("Please login");
            this.router.navigate(["/login"]);
            return of()
          }
      else
       {
        console.log("System error occuried !");
        return of();
      }
       
 
    })).subscribe(
      result => {
        location.reload();
      }
    )
  }

  downloadFile() {
    const userId = this.route.snapshot.paramMap.get('id');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + this.tokenService.gettoken().toString());
    var requestOptions = {
      headers: myHeaders
    };
    this.TempUpdatePerson = this.persons?.find(x => x.id == userId);
    fetch("http://localhost:8085/planning/" + userId + "/download-planning", requestOptions)
      .then((res) => { return res.blob(); })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        var filename ="planning_"+this.TempUpdatePerson.firstName+this.TempUpdatePerson.lastName+".csv";
        a.download = filename;
        a.click();
      });
  }

  public showallUsers() {
    this.userservice.showalluser().pipe(catchError(error => {

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





}
