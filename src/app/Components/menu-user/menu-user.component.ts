import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})

export class MenuUserComponent implements OnInit {

  public menuPropusr :Array<Menu>=[{
    id:'1', 
    titre:'Tableau de bord',
    icon:'fa-solid fa-table-columns',
    url: 'graphs'
  },
  {
    id:'2', 
    titre:'Mes Demandes',
    icon:'fa-solid  fa-table-cells',
    url: 'requests'
}
]


constructor(
  private router : Router
){}
ngOnInit():void{
}
navigate(url:any):void{
  this.router.navigate(url);
}
}
