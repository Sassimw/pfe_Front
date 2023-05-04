import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanningComponent } from './userplanning.component';

describe('UserplanningComponent', () => {
  let component: UserplanningComponent;
  let fixture: ComponentFixture<UserplanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserplanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
