import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

import { catchError, last } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {


  user:any;
  password = "";
  passwordConfirmation = "";
  constructor(private userservice: UserService, private router: Router) { }

  ngOnInit(): void {

    this.getConnectedUSer() ;
  }


  public getConnectedUSer() {
    this.userservice.getConnectedUser().pipe(catchError(error => {

      console.log("wijden error");
      console.log(error.status);
            this.router.navigate(["/login"]);
            return of();     
 
    })).subscribe( (data : any) =>{
     
     console.log("edit profile "  ) ; 
     console.log(data  ) ; 
     this.user = data ; 
    }
    );
  }
  x: any;
  message: any;
  public showmessagesnackbar(message: any) {
    this.x = document.getElementById("snackbar");
    this.message = message;
    this.x.className = "show";
    setTimeout(() => { this.x.className = this.x.className.replace("show", ""); }, 3000);
  }

  confirmUpdate() {
    console.log("changed name " + this.user.firstname) ;
    console.log("changed name " + this.user.lastname) ;
    console.log("changed name " + this.user.email) ;
 
    if (this.password!=="" ){
      if(this.password !== this.passwordConfirmation){
        this.showmessagesnackbar("Passwords do not match")
      }
      else{
        this.userservice.updateUserAndPassword(this.user.id,this.user.firstname,this.user.lastname,this.user.email,this.password).pipe(catchError(error => {
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
              response => {
                this.showmessagesnackbar("User updated successfully");
                setTimeout(() => { location.reload(); }, 2000);
              })
      }
    }
    else{
    this.userservice.updateUser(this.user.id,this.user.firstname,this.user.lastname,this.user.email).pipe(catchError(error => {
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
           response => {
             this.showmessagesnackbar("User updated successfully");
             setTimeout(() => { location.reload(); }, 2000);
           })
   }
  }
}
