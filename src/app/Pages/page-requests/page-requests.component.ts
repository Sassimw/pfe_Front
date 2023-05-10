import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/request.service';
import { Router } from '@angular/router';

import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlanningService } from 'src/app/service/planning/planning.service';

@Component({
  selector: 'app-page-requests',
  templateUrl: './page-requests.component.html',
  styleUrls: ['./page-requests.component.css']
})
export class PageRequestsComponent implements OnInit {
 
  requests?: any[] = [];
  newAssignment = {
    request_id    :"",
    req_firstname :"" , 
    req_lastname  :"" , 
    req_matcle    :"" , 
    res_firstname :"" , 
    res_lastname  :"" , 
    res_matcle    :"" , 
    project_name  :"" , 
    accepted      :"" , 
    request_date  :"" , 
    user_id       :"" , 
    project_id    : "" 
  };

  constructor(private requestService: RequestService, private planningService: PlanningService ,private router: Router) { }
  ngOnInit(): void {
    console.log("before call ");
    console.log(this.requests) ;
     this.showallUsers();
     console.log("after call ");
     console.log(this.requests) ;
  }
  
  public showallUsers() {
    this.requestService.getAllRequests().pipe(catchError(error => {

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
        console.log("wijden response length " + response.length ) ;
        for (var i = 0; i < response.length; i++) {
          console.log (i);
          var request = {
            "request_id" :   response[i].id,
            "req_firstname":  response[i].requester.firstname,
            "req_lastname":   response[i].requester.lastname,
            "req_matcle":     response[i].requester.matcle,
            "res_firstname":  response[i].resource.firstname,
            "res_lastname":   response[i].resource.lastname,
            "res_matcle":     response[i].resource.matcle,
            "project_name":   response[i].targetProject.name,
            "accepted":       response[i].accepted,
            "request_date":   response[i].requestedDate,
            "user_id":        response[i].resource.id,
            "project_id":     response[i].targetProject.id
          }
          console.log("wijden response[i].id " + response[i].id);
          console.log(response[i].id);
          this.requests?.push(request);

        }
        console.log("in call ");
        console.log(this.requests) ;
      }
    )
  }
  x: any;
  message: any;
  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }

  handleSelectedAssigment(Value: any) {

    this.newAssignment = Value;
    console.log("wijden this.newAssignment " ) ; 
    console.log(this.newAssignment) ; 
  }
  
  addAssignment() {
    const month = this.newAssignment.request_date.substring(5, 7);
    const day = this.newAssignment.request_date.substring(8, 10);
    console.log(" month " + month ) ; 
    console.log(" day " + day) ; 
    console.log(" project id " + this.newAssignment.project_id) ; 
    console.log(" user id  " + this.newAssignment.user_id) ; 
    console.log(" this.newAssignment.request_id  " + this.newAssignment.request_id) ; 

    this.planningService.makeNewAssignmentAndUpdateRequest(this.newAssignment.user_id, this.newAssignment.project_id, month, day,this.newAssignment.request_id).subscribe(
      response => {
        location.reload();
      }
    )
  }
}

