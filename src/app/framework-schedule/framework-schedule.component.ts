import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../framework.service';
import { Course } from '../course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-framework-schedule',
  templateUrl: './framework-schedule.component.html',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  styleUrls: ['./framework-schedule.component.css']
})
export class FrameworkScheduleComponent implements OnInit {
  selectedCourses: any[] = [];


  constructor(private frameworkService: FrameworkService) { }

  ngOnInit(): void {
    this.selectedCourses = this.frameworkService.getFramework();
  }

  removeFromTimetable(course: Course): void {
    this.frameworkService.removeFromFramework(course);
    this.selectedCourses = this.frameworkService.getFramework(); // Update
  }

  getTotalCredits(): number {
    return this.selectedCourses.reduce((total, course) => total + course.points, 0);
  }

  removeAllFromTimetable(): void {
    // Clear
    this.selectedCourses = [];
    // Update the local storage
    this.frameworkService.saveFramework(this.selectedCourses);
  }
}
