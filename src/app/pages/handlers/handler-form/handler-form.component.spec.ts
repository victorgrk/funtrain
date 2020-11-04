import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerFormComponent } from './handler-form.component';

describe('HandlerFormComponent', () => {
  let component: HandlerFormComponent;
  let fixture: ComponentFixture<HandlerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
