import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToLoginLayoutComponent } from './to-login-layout.component';

describe('ToLoginLayoutComponent', () => {
  let component: ToLoginLayoutComponent;
  let fixture: ComponentFixture<ToLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToLoginLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
