import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/Components/snackbar/snackbar/snackbar.component';
import { SignupService } from 'src/app/service/signup/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public email = "";
  public password = "";
  public passwordConfirmation = "";
  public firstname = "";
  public lastname = "";
  public message = "";


  constructor(private signupservice: SignupService, private router: Router) { }

  ngOnInit(): void {
  }
  public signup() {

    if (this.email === "" || this.firstname === "" || this.lastname === "" || this.password === "") {
      this.showmessagesnackbar("Please fill all fields");
    }
    else if (this.password.length < 8) {
      this.showmessagesnackbar("Password must be at least 8 characters")
    }
    else if(this.password !== this.passwordConfirmation){
      this.showmessagesnackbar("Passwords do not match")
    }
    else {

      var json = {
        "email": this.email,
        "firstname": this.firstname,
        "lastname": this.lastname,
        "password": this.password,
        "isenabled": true

      }
      this.signupservice.signup(json).subscribe(
        response => {
          this.showmessagesnackbar(response.message);
          setTimeout(() => { this.router.navigate(["/login"]) }, 3000);
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
