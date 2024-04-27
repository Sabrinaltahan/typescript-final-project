import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkScheduleComponent } from './framework-schedule.component';

describe('FrameworkScheduleComponent', () => {
  let component: FrameworkScheduleComponent;
  let fixture: ComponentFixture<FrameworkScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameworkScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameworkScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
