/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HandlerComponent } from './handler.component';

describe('HandlerComponent', () => {
  let component: HandlerComponent;
  let fixture: ComponentFixture<HandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
