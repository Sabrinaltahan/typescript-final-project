import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  recentCourses: any[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.fetchRecentCourses();
  }

  fetchRecentCourses() {
    this.courseService.getCourses().subscribe(
      (courses: any[]) => {
        this.recentCourses = courses.slice(0, 5); 
      },
      (error) => {
        console.error('Error fetching recent courses:', error);
      }
    );
  }

}
