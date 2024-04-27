import { Routes } from '@angular/router';
import { CourseSearchComponent } from './course-search/course-search.component';
import { FrameworkScheduleComponent } from './framework-schedule/framework-schedule.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'course-search', component: CourseSearchComponent },
    { path: 'framework-schedule', component: FrameworkScheduleComponent }
];
