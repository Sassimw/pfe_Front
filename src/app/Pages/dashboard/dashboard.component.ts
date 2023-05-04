import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenservice:TokenService,private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenservice.gettoken())
    {
      this.router.navigate(["/login"]);
    }
  }

}
