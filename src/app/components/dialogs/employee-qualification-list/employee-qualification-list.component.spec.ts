import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeQualificationListComponent } from './employee-qualification-list.component';

describe('EmployeeQualificationListComponent', () => {
  let component: EmployeeQualificationListComponent;
  let fixture: ComponentFixture<EmployeeQualificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeQualificationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeQualificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
