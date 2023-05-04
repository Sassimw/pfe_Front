import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collabRole: string = "";

  constructor(private tokenservice: TokenService, private router: Router) { }

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
  }

  logout() {
    this.tokenservice.deletetoken();
    this.router.navigate(["/login"]);
  }

  setCollabRole(role: string) {
    this.collabRole = role;
  }
}
