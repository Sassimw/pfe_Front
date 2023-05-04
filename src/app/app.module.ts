import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageLoginComponent } from './Pages/page-login/page-login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { MenuComponent } from './Components/menu/menu.component';
import { PersonsListComponent } from './Components/persons-list/persons-list.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/header/header.component';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { PageRequestsComponent } from './Pages/page-requests/page-requests.component';
import { DepartementListComponent } from './ADMIN/departement-list/departement-list.component';
import { TeamListComponent } from './ADMIN/team-list/team-list.component';
import { GraphsComponent } from './ADMIN/graphs/graphs.component';
import { NgChartsModule } from 'ng2-charts';
import { MenuUserComponent } from './Components/menu-user/menu-user.component';
import { DashboardUserComponent } from './Pages/dashboard-user/dashboard-user.component';
import { GraphUserComponent } from './User/graph-user/graph-user.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SignUpComponent } from './Auth/SignUp/sign-up/sign-up.component';
import { SnackbarComponent } from './Components/snackbar/snackbar/snackbar.component';
import { TeammembersComponent } from './team/teammembers/teammembers.component';
import { UserdetailsComponent } from './User/userdetails/userdetails/userdetails.component';
import { UserplanningComponent } from './User/planning/userplanning/userplanning.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProjectmembersComponent } from './projects/members/projectmembers/projectmembers.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    DashboardComponent,
    MenuComponent,
    PersonsListComponent,
    HeaderComponent,
    PageRequestsComponent,
    DepartementListComponent,
    TeamListComponent,
    GraphsComponent,
    MenuUserComponent,
    DashboardUserComponent,
    GraphUserComponent,
    SignUpComponent,
    SnackbarComponent,
    TeammembersComponent,
    UserdetailsComponent,
    UserplanningComponent,
    ProjectmembersComponent,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    NgxFontAwesomeModule,
    FontAwesomeModule,
    FormsModule,
    Ng2SearchPipeModule,
    FullCalendarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
