import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininistrationComponent } from './admininistration.component';

describe('AdmininistrationComponent', () => {
  let component: AdmininistrationComponent;
  let fixture: ComponentFixture<AdmininistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmininistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmininistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
