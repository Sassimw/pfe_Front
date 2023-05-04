import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenService } from 'src/app/service/token/token.service';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  public username = "";
  public password = "";
  public message ="";

  constructor(private loginService: LoginService,
    private router: Router,private tokenservice:TokenService) { }

  ngOnInit(): void {
  }

  public login() {

    if (this.username === "" || this.password === "") {
      this.showmessagesnackbar("Please fill all fields");
    }
   
    else {

      var json = {
        "login": this.username,
        "pwd": this.password

      }
      this. loginService.login(json).pipe
      (catchError(error => {
        console.log(error);
        this.showmessagesnackbar("Wrong Credentiels");
        return of();
    }))
      .subscribe(
        response => {
          this.tokenservice.savetoken(response.token);

          this.tokenservice.setCollabRole( response.rolename );
          if(response.rolename === "COLLABORATEUR"){
            this.router.navigate(["/graphs"]);
          }
          else if(response.rolename === "MANAGER" || response.rolename === "CHEFPROJET" ){
            this.router.navigate(["/persons"]);
          }
          else{this.router.navigate(["/departements"]);}
          
        }
      );
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