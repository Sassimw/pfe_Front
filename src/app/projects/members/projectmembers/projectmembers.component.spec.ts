import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmembersComponent } from './projectmembers.component';

describe('ProjectmembersComponent', () => {
  let component: ProjectmembersComponent;
  let fixture: ComponentFixture<ProjectmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectmembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
