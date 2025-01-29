import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsFormComponent } from './student-details-form.component';

describe('StudentDetailsFormComponent', () => {
  let component: StudentDetailsFormComponent;
  let fixture: ComponentFixture<StudentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
