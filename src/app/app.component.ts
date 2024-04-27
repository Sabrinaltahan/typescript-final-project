import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,  MatTabsModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'typescript-final-project';

  constructor(private router: Router) {}

  navLinks = [
    { label: 'Home', path: '' },
    { label: 'Course Search', path: '/course-search' },
    { label: 'Framework Schedule', path: '/framework-schedule' }
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
