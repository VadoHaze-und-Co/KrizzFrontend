import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInitialsComponent } from './employee-initials.component';

describe('EmployeeInitialsComponent', () => {
  let component: EmployeeInitialsComponent;
  let fixture: ComponentFixture<EmployeeInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInitialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
