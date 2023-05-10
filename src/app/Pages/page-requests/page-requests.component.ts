import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/request.service';
import { Router } from '@angular/router';

import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-page-requests',
  templateUrl: './page-requests.component.html',
  styleUrls: ['./page-requests.component.css']
})
export class PageRequestsComponent implements OnInit {
 
  requests?: any[] = [];
  constructor(private requestService: RequestService, private router: Router) { }
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
            "req_firstname":  response[i].requester.firstname,
            "req_lastname":   response[i].requester.lastname,
            "req_matcle":     response[i].requester.matcle,
            "res_firstname":  response[i].resource.firstname,
            "res_lastname":   response[i].resource.lastname,
            "res_matcle":     response[i].resource.matcle,
            "project_name":   response[i].targetProject.name,
            "accepted":       response[i].accepted,
            "request_date":   response[i].requestedDate
          }
          console.log("wijden request ");
          console.log(request);
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

  
}

