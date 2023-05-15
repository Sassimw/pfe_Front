import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { ProjectsService } from 'src/app/service/projects/projects.service';
import { catchError, last } from 'rxjs/operators';
import { PlanningService } from 'src/app/service/planning/planning.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { TokenService } from 'src/app/service/token/token.service';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
 
 
  displayEventModal: boolean = false;
  tempAssignmentDate: any = "";
  newAssignment = {
    userId: "",
    projectId: "",
    date: ""
  }
  targetProject: any = "";
  projects: any[] = [];
  users: any[] = [];
  userPlanning: any[] = [];
  targetAssignment: any = "";
  targetUser: any="";

  constructor(private planningService: PlanningService,private projectsService: ProjectsService,private usersService: UserService,private router: Router , private tokenService: TokenService) { }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  ngOnInit(): void {
    this.loadProjects();
    this.loadPlanning();
    this.loadUsers();
  }

  loadPlanning() {
    this.planningService.getPlanningForOneAllUser().pipe(catchError(error => {


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
        console.log("planning :")
        console.log(planning);
        for (var j = 0; j < planning.length; j++) { 
            for (var i = 0; i < planning[j].assignments.length; i++) {
              var p = planning[j].assignments[i];
              if (p.day < 10) {
                p.day = "0" + p.day
              }
              if (p.month < 10) {
                p.month = "0" + p.month
              }
              var entry = {
                title: "User : "+ planning[j].user.firstname + " " + planning[j].user.lastname + " ||  Project : " + p.project.name,
                date: '2023-' + p.month + '-' + p.day,
                id: JSON.stringify({ assignment: p.id, project: p.project.id }),
                user:planning[j].user
              }
              this.userPlanning.push(entry);
            } 
      }
        // this.userPlanning = planning;
        console.log("wijden this.userPlanning " );
        console.log(this.userPlanning);
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          //events: [{ title: 'event 1', date: '2023-05-01' },{ title: 'wijden', date: '2023-05-24' }],
          events: this.userPlanning,
           eventClick: (info) => {
            console.log("wijden info ");
            console.log(info.event);
            console.log("----------------");
            this.targetAssignment = JSON.parse(info.event.id).assignment;
            this.targetProject = JSON.parse(info.event.id).project;
            this.tempAssignmentDate = info.event.startStr;
            this.targetUser = info.event.extendedProps['user'];
            this.displayEventModal = true;
            console.log("wijden info ");
            console.log(this.targetUser);
            console.log("----------------");
            console.log(JSON.parse(info.event.id));

          }
        };

      }
    )
  }

  handleChange(e: any) {
    console.log("wijden handlechange " + e.target.value )
    this.newAssignment.projectId = e.target.value;
    console.log("wijden this.newAssignment.projectId " + this.newAssignment.projectId ) ; 
  }
  handleChangeUser(e: any) {
    this.newAssignment.userId = e.target.value;
  }
  closeAssignmentModal() {
    this.displayEventModal = false;
  }
  handleProjectChange(e: any) {
    this.newAssignment.projectId = e.target.value;
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
  loadUsers() {
    this.usersService.showalluser().pipe(catchError(error => {

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
          const user = {
            id: element.id,
            name: element.firstname + " " + element.lastname
          }
          this.users.push(user);
        }
      }
    );
  }

  addAssignment() {
    console.log(this.newAssignment)
    const month = this.newAssignment.date.substring(5, 7);
    const day = this.newAssignment.date.substring(8, 10);
    const userId = this.newAssignment.userId;
    console.log("wijden addAssignment() project id " + this.newAssignment.projectId );
    console.log("wijden addAssignment() month " + month );
    console.log("wijden addAssignment() day " + day );
    this.planningService.makeNewAssignment(userId, this.newAssignment.projectId, month, day).subscribe(
      response => {
        location.reload();
      }
    )
  }

  downloadFile() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + this.tokenService.gettoken().toString());
    var requestOptions = {
      headers: myHeaders
    };
    fetch("http://localhost:8085/planning/download-planning", requestOptions)
      .then((res) => { return res.blob(); })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        var filename ="planning.csv";
        a.download = filename;
        a.click();
      });
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

}

