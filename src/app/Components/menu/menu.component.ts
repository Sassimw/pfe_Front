import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  public menuProp: Array<Menu> = [{
    id: '1',
    titre: 'Home',
    icon: 'fa-solid fa-table-columns',
    url: 'graphs'
  },
  {
    id: '2',
    titre: 'Planning management',
    icon: 'fa-solid fa-gears',
    url: ''
  },
  {
    id: '3',
    titre: 'Users management',
    icon: 'fa-solid fa-users',
    url: 'persons'

  },
  {
    id: '4',
    titre: 'Projects management',
    icon: 'fa-solid fa-house-laptop',
    url: 'departements'

  },
  {
    id: '5',
    titre: 'Teams management',
    icon: 'fa-solid fa-people-group',
    url: 'teams'

  },
  {
    id: '6',
    titre: 'Requests management',
    icon: 'fa-solid  fa-table-cells',
    url: 'requests'

  }
  ]


  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
  }
  navigate(url: any): void {
    this.router.navigate(url);
  }
}
