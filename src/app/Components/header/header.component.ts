import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token/token.service';
import { UserService } from 'src/app/service/user/user.service';
import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collabRole: string = "";
  user: any;

  constructor(private tokenservice: TokenService, private router: Router,private userservice: UserService) { }

  ngOnInit(): void {
    if (this.tokenservice.getCollabRole() !== "")
      if (this.tokenservice.getCollabRole() === "COLLABORATEUR")
        this.setCollabRole(("Employee space").toUpperCase());
      else if(this.tokenservice.getCollabRole() === "MANAGER" || this.tokenservice.getCollabRole() === "CHEFPROJET"){
        this.setCollabRole(("Responsible space").toUpperCase());
      }
      else if(this.tokenservice.getCollabRole() === "SUPERADMIN"){
        this.setCollabRole(("Admin space").toUpperCase());
      }else {
        this.setCollabRole(("RH space").toUpperCase());
      }

      this.getConnectedUSer() ;
  }

  logout() {
    this.tokenservice.deletetoken();
    this.router.navigate(["/login"]);
  }

  setCollabRole(role: string) {
    this.collabRole = role;
  }

  
  public getConnectedUSer() {
    this.userservice.getConnectedUser().pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
            this.router.navigate(["/login"]);
            return of();     
 
    })).subscribe( (data : any) =>{
     this.user = data;
     console.log("Wijden user connected "  ) ; 
     console.log(this.user  ) ; 
     
    }
    );
  }
}
