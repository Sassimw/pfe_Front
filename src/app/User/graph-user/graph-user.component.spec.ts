import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphUserComponent } from './graph-user.component';

describe('GraphUserComponent', () => {
  let component: GraphUserComponent;
  let fixture: ComponentFixture<GraphUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
