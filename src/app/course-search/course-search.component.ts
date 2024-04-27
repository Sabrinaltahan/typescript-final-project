import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
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
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
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
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';
  selectedSubject: string = '';
  subjects: string[] = [];
  selectedCourses: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  numberOfFiltered: number = 0;
  currentSort: string = '';
  isAscending: boolean = true;
  
  constructor(private courseService: CourseService, private frameworkService: FrameworkService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  // Method to fetch courses from the service
  getCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.subjects = Array.from(new Set(this.courses.map(course => course.subject)));
      this.filterCourses();
    });
  }
  

  // Method to filter courses based on search input and selected subject
  filterCourses(): void {
    
    this.filteredCourses = this.courses.filter(course => {
      const courseCodeMatch = course.courseCode.toUpperCase().includes(this.searchQuery.toUpperCase());
      const courseNameMatch = course.courseName.toLowerCase().includes(this.searchQuery.toLowerCase());
      const subjectMatch = this.selectedSubject === '' || course.subject === this.selectedSubject;
      return (courseCodeMatch || courseNameMatch) && subjectMatch;
    });

    
    this.numberOfFiltered = this.filteredCourses.length;
    this.totalPages = Math.ceil(this.numberOfFiltered / this.pageSize);

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.numberOfFiltered);
    this.filteredCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  

  // go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterCourses();
    }
  }

  // go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterCourses();
    }
  }

  sort(column: string): void {
    // note: If the same column is clicked again, reverse the sorting direction
    if (this.currentSort === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSort = column;
      this.isAscending = true;
    }
    
    // Sort the courses based on the selected column and direction
    this.filteredCourses.sort((a, b) => {
      const valueA = typeof (a as any)[column] === 'string' ? (a as any)[column].toUpperCase() : (a as any)[column];
      const valueB = typeof (b as any)[column] === 'string' ? (b as any)[column].toUpperCase() : (b as any)[column];
    
      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      }
      return 0;
    });
  }

  // add a course to the timetable
  addToTimetable(course: any): void {
    let frameworkData = this.frameworkService.getFramework();
    
    // Check if the course is already in the framework data array
    const courseExists = frameworkData.some((c: any) => c.courseCode === course.courseCode);
    if (!courseExists) {
      frameworkData.push(course); // Add the course 
      this.frameworkService.saveFramework(frameworkData); // Save
      course.addedToTimetable = true;
    }
  }

  // add all filtered courses to the timetable
  addAllToTimetable(): void {
    this.filteredCourses.forEach(course => {
      this.addToTimetable(course);
    });
  }

  // check if a course has been added to the timetable
  courseAddedToTimetable(course: any): boolean {
    return course.addedToTimetable || false;
  }
}
