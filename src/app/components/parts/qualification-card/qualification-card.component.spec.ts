import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationCardComponent } from './qualification-card.component';

describe('QualificationListComponent', () => {
  let component: QualificationCardComponent;
  let fixture: ComponentFixture<QualificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
