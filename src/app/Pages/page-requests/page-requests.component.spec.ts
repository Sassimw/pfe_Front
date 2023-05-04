import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRequestsComponent } from './page-requests.component';

describe('PageRequestsComponent', () => {
  let component: PageRequestsComponent;
  let fixture: ComponentFixture<PageRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
