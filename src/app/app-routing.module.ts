import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementListComponent } from './ADMIN/departement-list/departement-list.component';
import { GraphsComponent } from './ADMIN/graphs/graphs.component';
import { TeamListComponent } from './ADMIN/team-list/team-list.component';
import { SignUpComponent } from './Auth/SignUp/sign-up/sign-up.component';
import { PersonsListComponent } from './Components/persons-list/persons-list.component';
import { DashboardUserComponent } from './Pages/dashboard-user/dashboard-user.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { PageLoginComponent } from './Pages/page-login/page-login.component';
import { PageRequestsComponent } from './Pages/page-requests/page-requests.component';
import { ProjectmembersComponent } from './projects/members/projectmembers/projectmembers.component';
import { TeammembersComponent } from './team/teammembers/teammembers.component';
import { UserplanningComponent } from './User/planning/userplanning/userplanning.component';
import { UserdetailsComponent } from './User/userdetails/userdetails/userdetails.component';
import { PlanningComponent } from './planning/planning.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },

  {
    path: '',
    component: DashboardComponent,
    children:
      [
        {
          path: 'persons',
          component: PersonsListComponent
        },
        {
          path: 'graphs',
          component: GraphsComponent
        },
        {
          path: 'departements',
          component: DepartementListComponent
        },
        {
          path: 'teams',
          component: TeamListComponent
        },
        {
          path: 'requests',
          component: PageRequestsComponent
        },
        {
          path: 'team-members/:id',
          component: TeammembersComponent
        },
        {
          path: 'user-profile/:id',
          component: UserdetailsComponent
        },
        {
          path: 'user-planning/:id',
          component: UserplanningComponent
        },
        {
          path: 'project-members/:id',
          component: ProjectmembersComponent
        },
        {
          path: 'planning',
          component: PlanningComponent
        },
        {
          path: 'editprofile',
          component: EditprofileComponent
        }

      ]
  },



  {
    path: 'user',
    component: DashboardUserComponent,
    children:
      [
        {
          path: 'graphs',
          component: GraphsComponent
        }

      ]
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
